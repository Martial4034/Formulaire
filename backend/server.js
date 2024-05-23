require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Essayer de se connecter à la base de données
const testDbConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connecté à la base de données MySQL avec succès !");
    await connection.end();
  } catch (error) {
    console.error(
      "Impossible de se connecter à la base de données MySQL:",
      error.message
    );
  }
};

testDbConnection();

// Route pour l'inscription
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!(email && password && username)) {
    console.log("All input is required");
    return res.status(400).send("All input is required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Demande d'inscription reçue");
    const [rows] = await connection.execute(
      "INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    await connection.end();
    console.log("Utilisateur inscrit avec succès", rows);

    res.status(201).send("User registered successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Route pour la connexion
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All input is required");
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT * FROM `users` WHERE `email` = ?",
      [email]
    );

    if (rows.length > 0 && (await bcrypt.compare(password, rows[0].password))) {
      // Créer token ou gérer la session ici
      res.status(200).send("Logged in successfully");
    } else {
      res.status(400).send("Invalid Credentials");
    }

    await connection.end();
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
// Route pour recuperer les datas a modifier d'un contrat deja existant => utilisation de contractId, pour séparer :id
app.get("/contractsUp/:contractId", async (req, res) => {
  console.log("Demande de récupération de contrat reçue", req.params);
  try {
    const { contractId } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    // Obtenir les détails du contrat
    const [contractRows] = await connection.execute(
      "SELECT * FROM contracts WHERE id = ?",
      [contractId]
    );

    // Obtenir les partenaires associés au contrat
    const [partnersRows] = await connection.execute(
      "SELECT name FROM contract_partners WHERE contract_id = ?",
      [contractId]
    );

    // Obtenir les noms des partenaires pour signature associés au contrat
    const [partnerNamesRows] = await connection.execute(
      "SELECT name FROM contract_partner_names WHERE contract_id = ?",
      [contractId]
    );

    if (contractRows.length > 0) {
      const contractData = {
        ...contractRows[0],
        contract_partners: partnersRows.map((row) => ({ name: row.name })),
        contract_partner_names: partnerNamesRows.map((row) => ({
          name: row.name,
        })),
      };

      res.json(contractData);
    } else {
      res.status(404).send("Contract not found");
    }

    await connection.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Route pour récupérer un contrat
app.get("/contracts/:id", async (req, res) => {
  console.log("Demande de récupération de contrat reçue", req.params);
  try {
    const { id } = req.params;

    const connection = await mysql.createConnection(dbConfig);
    console.log("Demande de récupération de contrat reçue");
    const [contractRows] = await connection.execute(
      "SELECT * FROM contracts WHERE id = ?",
      [id]
    );
    const [partnerRows] = await connection.execute(
      "SELECT * FROM contract_partners WHERE contract_id = ?",
      [id]
    );
    const [partnerNameRows] = await connection.execute(
      "SELECT * FROM contract_partner_names WHERE contract_id = ?",
      [id]
    );

    await connection.end();
    console.log({
      contract: contractRows[0],
      partners: partnerRows,
      partnerNames: partnerNameRows,
    });
    res
      .status(200)
      .send({
        contract: contractRows[0],
        partners: partnerRows,
        partnerNames: partnerNameRows,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour créer un contrat
app.post("/contracts", async (req, res) => {
  try {
    const { contractData } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    await connection.beginTransaction(); // Commence une transaction
    console.log("Demande de création de contrat reçue");
    // Insère les données principales du contrat
    const [contractResult] = await connection.execute(
      "INSERT INTO contracts (contract_date, contract_copies, contract1_1, contract1_2, contract1_3, contract2_1, contract3_1_1, contract3_1_2, contract3_1_3, contract4_1_1, contract6_1, contract9_1, contract_12_1, some_location, contract_date2, contract_sign, contract_sign_me) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        contractData.contract_date,
        contractData.contract_copies,
        contractData.contract1_1,
        contractData.contract1_2,
        contractData.contract1_3,
        contractData.contract2_1,
        contractData.contract3_1_1,
        contractData.contract3_1_2,
        contractData.contract3_1_3,
        contractData.contract4_1_1,
        contractData.contract6_1,
        contractData.contract9_1,
        contractData.contract_12_1,
        contractData.some_location,
        contractData.contract_date2,
        contractData.contract_sign,
        contractData.contract_sign_me,
      ]
    );
    console.log("Contrat inséré avec succès", contractResult);
    // Insère les partenaires du contrat
    for (const partner of contractData.contract_partners) {
      await connection.execute(
        "INSERT INTO contract_partners (contract_id, name) VALUES (?, ?)",
        [contractResult.insertId, partner.name]
      );
    }
    console.log("Partenaires insérés avec succès");
    // Insère les noms des partenaires pour signature
    for (const partnerName of contractData.contract_partner_names) {
      await connection.execute(
        "INSERT INTO contract_partner_names (contract_id, name) VALUES (?, ?)",
        [contractResult.insertId, partnerName.name]
      );
    }

    await connection.commit(); // Valide la transaction
    console.log("Transaction validée");
    await connection.end();
    res.status(201).send({ id: contractResult.insertId });
  } catch (error) {
    if (connection) {
      await connection.rollback(); // Annule la transaction en cas d'erreur
    }
    res.status(500).send(error.message);
  }
});

// Route pour mettre à jour un contrat existant
app.put("/contractsUp/:contractId", async (req, res) => {
  try {
    const { contractId } = req.params;
    const { contractData } = req.body;
    const connection = await mysql.createConnection(dbConfig);

    await connection.beginTransaction(); // Commence une transaction

    // Mettre à jour les données principales du contrat
    await connection.execute(
      `UPDATE contracts SET
      contract_date = ?, contract_copies = ?, contract1_1 = ?, contract1_2 = ?, 
      contract1_3 = ?, contract2_1 = ?, contract3_1_1 = ?, contract3_1_2 = ?, 
      contract3_1_3 = ?, contract4_1_1 = ?, contract6_1 = ?, contract9_1 = ?, 
      contract_12_1 = ?, some_location = ?, contract_date2 = ?, 
      contract_sign = ?, contract_sign_me = ?
      WHERE id = ?`,
      [
        contractData.contract_date,
        contractData.contract_copies,
        contractData.contract1_1,
        contractData.contract1_2,
        contractData.contract1_3,
        contractData.contract2_1,
        contractData.contract3_1_1,
        contractData.contract3_1_2,
        contractData.contract3_1_3,
        contractData.contract4_1_1,
        contractData.contract6_1,
        contractData.contract9_1,
        contractData.contract_12_1,
        contractData.some_location,
        contractData.contract_date2,
        contractData.contract_sign,
        contractData.contract_sign_me,
        contractId,
      ]
    );

    // Pour les partenaires et les noms des partenaires, vous pourriez avoir besoin de les effacer et de les réinsérer
    // ou de les mettre à jour individuellement. Cela dépend de votre logique métier.

    // Commit la transaction
    await connection.commit();
    await connection.end();

    res.status(200).send({ message: "Contract updated successfully" });
  } catch (error) {
    // Rollback en cas d'erreur
    if (connection) await connection.rollback();
    console.error("Erreur lors de la mise à jour du contrat:", error);
    res.status(500).send(error.message);
  }
});

// Route pour récupérer les contrats
app.get("/contracts", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM contracts");
    await connection.end();
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour supprimer un contrat
app.delete("/contracts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      "DELETE FROM contract_partners WHERE contract_id = ?",
      [id]
    );
    await connection.execute(
      "DELETE FROM contract_partner_names WHERE contract_id = ?",
      [id]
    );
    await connection.execute("DELETE FROM contracts WHERE id = ?", [id]);
    await connection.end();
    res.status(200).send({ message: "Contrat supprimé avec succès" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
