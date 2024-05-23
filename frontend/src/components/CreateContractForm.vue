<template>
  <!-- Bouton de retour en haut à gauche -->
  <button @click="goBack" class="btn btn-secondary mb-3 spcial-martial">
    ← Retour
  </button>
  <div class="container mt-3">
    <h2 class="mb-4">Créer un Contrat</h2>
    <form @submit.prevent="createContract">
      <div class="mb-3">
        <label for="contract_date" class="form-label">Date du contrat</label>
        <input type="date" id="contract_date" class="form-control" v-model="contractData.contract_date" required>
      </div>

      <div class="mb-3">
        <label for="contract_copies" class="form-label">Nombre de copies</label>
        <input type="number" id="contract_copies" class="form-control" v-model="contractData.contract_copies" required>
      </div>

      <!-- Partenaires dynamiques -->
      <div v-for="(partner, index) in contractData.contract_partners" :key="index" class="mb-3">
        <label :for="'partner_' + index" class="form-label">Nom du partenaire {{ index + 1 }}</label>
        <input :id="'partner_' + index" type="text" class="form-control" v-model="partner.name">
        <button type="button" class="btn btn-danger btn-sm mt-2" @click="removePartner(index)">Supprimer</button>
      </div>
      <button type="button" class="btn btn-primary btn-sm mb-3" @click="addPartner">Ajouter un partenaire</button>

      <!-- NOM DU PARTENARIAT ET ACTIVITÉ -->
      <div class="mb-3">
        <label for="contract1_1" class="form-label">1.1 Nature des activités</label>
        <textarea id="contract1_1" class="form-control" v-model="contractData.contract1_1"></textarea>
      </div>
      <div class="mb-3">
        <label for="contract1_2" class="form-label">1.2 Nom</label>
        <textarea id="contract1_2" class="form-control" v-model="contractData.contract1_2"></textarea>
      </div>

      <div class="mb-3">
        <label for="contract1_3" class="form-label">1.3 Adresse officielle</label>
        <textarea id="contract1_3" class="form-control" v-model="contractData.contract1_3"></textarea>
      </div>

      <!-- TERMES -->
      <div class="mb-3">
        <label for="contract2_1" class="form-label">2.1 Termes</label>
        <textarea id="contract2_1" class="form-control" v-model="contractData.contract2_1"></textarea>
      </div>

      <!-- CONTRIBUTION AU PARTENARIAT -->
      <div class="mb-3">
        <label for="contract3_1_1" class="form-label">3.1 La contribution de chaque partenaire au capital</label>
        <textarea id="contract3_1_1" class="form-control" v-model="contractData.contract3_1_1"></textarea>
      </div>

      <!-- RÉPARTITION DES BÉNÉFICES ET DES PERTES -->
      <div class="mb-3">
        <label for="contract4_1_1" class="form-label">4.1 Répartition des bénéfices et des pertes</label>
        <textarea id="contract4_1_1" class="form-control" v-model="contractData.contract4_1_1"></textarea>
      </div>

      <!-- MODALITÉS BANCAIRES ET TERMES FINANCIERS -->
      <div class="mb-3">
        <label for="contract6_1" class="form-label">6.1 Modalités bancaires et termes financiers</label>
        <textarea id="contract6_1" class="form-control" v-model="contractData.contract6_1"></textarea>
      </div>

      <!-- CLAUSE DE NON CONCURRENCE -->
      <div class="mb-3">
        <label for="contract9_1" class="form-label">9.1 Clause de non concurrence</label>
        <textarea id="contract9_1" class="form-control" v-model="contractData.contract9_1"></textarea>
      </div>

      <!-- JURIDICTION -->
      <div class="mb-3">
        <label for="contract_12_1" class="form-label">12.1 Juridiction</label>
        <textarea id="contract_12_1" class="form-control" v-model="contractData.contract_12_1"></textarea>
      </div>

      <div class="mb-3">
        <label for="some_location" class="form-label">Lieu du contrat</label>
        <input type="text" id="some_location" class="form-control" v-model="contractData.some_location">
      </div>

      <div class="mb-3">
        <label for="contract_date2" class="form-label">Date de fin du contrat</label>
        <input type="date" id="contract_date2" class="form-control" v-model="contractData.contract_date2" required>
      </div>

      <div class="mb-3">
        <label for="contract_sign" class="form-label">Signature</label>
        <input type="text" id="contract_sign" class="form-control" v-model="contractData.contract_sign" required>
      </div>

      <!-- Noms des partenaires dynamiques -->
      <div v-for="(partnerName, index) in contractData.contract_partner_names" :key="'partnerName' + index" class="mb-3">
        <label :for="'partnerName_' + index" class="form-label">Nom du partenaire pour signature {{ index + 1 }}</label>
        <input :id="'partnerName_' + index" type="text" class="form-control" v-model="partnerName.name">
        <button type="button" class="btn btn-danger btn-sm mt-2" @click="removePartnerName(index)">Supprimer</button>
      </div>
      <button type="button" class="btn btn-primary btn-sm mb-3" @click="addPartnerName">Ajouter un nom de
        partenaire</button>

      <div class="mb-3">
        <label for="contract_sign_me" class="form-label">Ma signature</label>
        <input type="text" id="contract_sign_me" class="form-control" v-model="contractData.contract_sign_me" required>
      </div>

      <button type="button" class="btn btn-success" @click="saveContract">Soumettre le contrat</button>
      <button type="button" class="btn btn-secondary padding-left" @click="saveDraft">Enregistrer au brouillon</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      contractData: {
        contract_date: '',
        contract_copies: 0,
        contract_partners: [{ name: '' }],
        contract1_1: '',
        contract1_2: '',
        contract1_3: '',
        contract2_1: '',
        contract3_1_1: '',
        contract3_1_2: '',
        contract3_1_3: '',
        contract4_1_1: '',
        contract6_1: '',
        contract9_1: '',
        contract_12_1: '',
        some_location: '',
        contract_date2: '',
        contract_sign: '',
        contract_partner_names: [{ name: '' }],
        contract_sign_me: ''
      },
      initialContractData: null,
    };
  },
  props: {
    contractId: {
      type: Number,
      default: 0
    }
  },
  created() {
    if (this.contractId && this.contractId !== 0) {
      this.loadContractData(this.contractId);
    }
  },
  mounted() {
    this.initialContractData = JSON.stringify(this.contractData); // Sauvegardez l'état initial ici
    this.checkForDraft();
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    // Logique pour charger les données du contrat déja existant
    async loadContractData(contractId) {
      console.log('Chargement des données du contrat:', contractId);
      try {
        const response = await axios.get(`http://localhost:3000/contractsUp/${contractId}`);
        let data = response.data;

        // On formatte les dates
        if (data.contract_date) {
          data.contract_date = this.formatDate(data.contract_date);
        }
        if (data.contract_date2) {
          data.contract_date2 = this.formatDate(data.contract_date2);
        }

        this.contractData = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des données du contrat:', error);
      }
    },
    // Le formatage des dates car timestamp obligue c'est pourquoi firebase >> 
    formatDate(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    async saveContract() {
      // On Vérifie si on en train de mettre à jour ou de créer un nouveau contrat
      if (this.contractId) {

        try {
          const response = await axios.put(`http://localhost:3000/contractsUp/${this.contractId}`, { contractData: this.contractData });
          console.log('Contrat mis à jour avec succès', response.data);
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Erreur lors de la mise à jour du contrat:', error);

        }
      } else {

        try {
          const response = await axios.post('http://localhost:3000/contracts', { contractData: this.contractData });
          console.log('Contrat créé avec succès', response.data);
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Erreur lors de la création du contrat:', error);
        }
      }
    },
    // Logique pour vérifier si le contrat en brouillon existe
    hasUnsavedChanges() {
      return JSON.stringify(this.contractData) !== this.initialContractData;
    },
    // Logique pour vérifier si le contrat en brouillon existe
    handleBeforeUnload(event) {
      if (this.hasUnsavedChanges()) {
        event.preventDefault();
        event.returnValue = 'Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?';
      }
    },
    // Logique pour ajouter ou supprimer des partenaires
    addPartner() {
      this.contractData.contract_partners.push({ name: '' });
    },
    // Logique pour ajouter ou supprimer des partenaires
    removePartner(index) {
      this.contractData.contract_partners.splice(index, 1);
    },
    // Logique pour ajouter ou supprimer des partenaires
    addPartnerName() {
      this.contractData.contract_partner_names.push({ name: '' });
    },
    // Logique pour ajouter ou supprimer des partenaires
    removePartnerName(index) {
      this.contractData.contract_partner_names.splice(index, 1);
    },
    // Logique pour vérifier si le contrat en brouillon existe
    checkForDraft() {
      if (this.$route.query.draft && localStorage.getItem('contractDraft')) {
        this.contractData = JSON.parse(localStorage.getItem('contractDraft'));
      }
    },
    // Logique pour sauvegarder les données en tant que brouillon
    saveDraft() {
      localStorage.setItem('contractDraft', JSON.stringify(this.contractData));
      alert('Brouillon enregistré');
    },
    // Revenir à la page précédente
    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>
<style scoped>
.padding-left {
  margin-left: 20px;
}

.spcial-martial {
  margin-right: 65%;
}
</style>