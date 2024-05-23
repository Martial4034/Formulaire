<template>
    <button @click="goBack" class="btn btn-secondary mb-3 top-0 start-0">← Retour</button>
    <button @click="printContract" class="btn btn-info mb-3 top-0 start-0 me-2">Imprimer</button>
    <div id="to-print">
        <div id="contract-details" class="container" v-if="contract">
            <h1>CONTRAT DE PARTENARIAT COMMERCIAL</h1>
            <p>
                Ce contrat est fait ce jour {{ formatDate(contract.contract_date) }}, en
                {{ contract.contract_copies }} copies originales, entre
            </p>
            <ol>
                <li class="partner" v-for="(partner, index) in partners" :key="index">{{ partner.name }}</li>
            </ol>
            <h2>1. NOM DU PARTENARIAT ET ACTIVITÉ</h2>

            <p><strong>1.1 Nature des activités</strong>: Les Partenaires cités ci-dessus donnent leur accord d'être
                considérés comme des partenaires commerciaux pour les fins suivantes :</p>

            <p>{{ contract.contract1_1 }}</p>

            <p><strong>1.2 Nom</strong>: Les Partenaires cités ci-dessus donnent leur accord, pour que le partenariat
                commercial soit exercé sous le nom:</p>
            <p>{{ contract.contract1_2 }}</p>

            <p><strong>1.3 Adresse officielle</strong>: Les Partenaires cités ci-dessus donnent leur accord pour que le
                siège du
                partenariat commercial soit:</p>
            <p>{{ contract.contract1_3 }}</p>

            <h2>2. TERMES</h2>
            <p>2.1 Le partenariat commence le {{ contract.contract2_1 }} et continue jusqu'à la fin de cet accord.</p>

            <h2>3. CONTRIBUTION AU PARTENARIAT</h2>
            <p>3.1 La contribution de chaque partenaire au capital listée ci-dessous se compose des éléments suivants :</p>

            <ol>
                <p>{{ contract.contract3_1_1 }}</p>
            </ol>
            <ol>
                <p>{{ contract.contract3_1_2 }}</p>
            </ol>
            <ol>
                <p>{{ contract.contract3_1_3 }}</p>
            </ol>


            <h2>4. RÉPARTITION DES BÉNÉFICES ET DES PERTES</h2>
            <p>4.1 Les Partenaires se partageront les profits et les pertes du partenariat commercial de la manière suivante
                :
            </p>
            <p>{{ contract.contract4_1_1 }}</p>

            <h2>5. PARTENAIRES ADDITIONNELS</h2>
            <p>5.1 Aucune personne ne peut être ajoutée en tant que partenaire et aucune autre autre activité
                ne peut être menée par le partenariat sans le consentement écrit de tous les partenaires.
            </p>

            <h2>6. MODALITÉS BANCAIRES ET TERMES FINANCIERS</h2>
            <p>6.1 Les Partenaires doivent avoir un compte bancaire au nom du partenariat sur lequel les chèques doivent
                être
                signés par au moins {{ contract.contract6_1 }} des Partenaires.</p>

            <p>6.2 Les Partenaires doivent tenir une comptabilité complète du partenariat et la rendre
                disponible à tous les Partenaires à tout moment.</p>

            <h2>7. GESTION DES ACTIVITÉS DE PARTENARIAT</h2>
            <p>7.1 Chaque partenaire peut prendre part dans la gestion du partenariat.</p>

            <p>7.2 Tout désaccord qui intervient dans l'exploitation du partenariat, sera réglé par les
                partenaires détenant la majorité des parts du partenariat.</p>

            <h2>8. DÉPART D'UN PARTENAIRE COMMERCIAL</h2>
            <p>8.1 Si un partenaire se retire du partenariat commercial pour une raison quelconque, y
                compris le décès, les autres partenaires peuvent continuer à exploiter le partenariat sous le
                même nom.</p>

            <p>8.2 Le partenaire qui se retire est tenu de donner un préavis écrit d'au moins soixante (60)
                jours de son intention de se retirer et est tenu de vendre ses parts du partenariat commercial.</p>

            <p>8.3 Aucun partenaire ne doit céder ses actions dans le partenariat commercial à une autre
                partie sans le consentement écrit des autres partenaires.</p>
            <p>8.4 Le ou les partenaires restants paieront au partenaire qui se retire, ou au représentant légal
                du partenaire décédé ou handicapé, la valeur de ses parts dans le partenariat, ou (a) la somme
                de son capital, (b) des emprunts impayés qui lui sont dus, (c) sa quote-part des bénéfices nets
                cumulés non distribués dans son compte, et (d) son intérêt dans toute plus-value
                préalablement convenue de la valeur du partenariat par rapport à sa valeur comptable.
                Aucune valeur de bonne volonté ne doit être incluse dans la détermination de la valeur des
                parts du partenaire.</p>


            <h2>9. CLAUSE DE NON CONCURRENCE</h2>
            <p>9.1 Un partenaire qui se retire du partenariat ne doit pas s'engager directement ou indirectement dans une
                entreprise qui est ou serait en concurrence avec la nature des activités actuelles ou futures du partenariat
                pendant {{ contract.contract9_1 }}.</p>

            <h2>10. MODIFICATION DE L’ACCORD DE PARTENARIAT</h2>
            <p>10. 1 Ce contrat de partenariat commercial ne peut être modifié sans le consentement écrit de
                tous les partenaires.</p>

            <h2>11. DIVERS</h2>
            <p>11.1 Si une disposition ou une partie d'une disposition de la présente convention de
                partenariat commercial est non applicable pour une quelconque raison, elle sera dissociée
                sans affecter la validité du reste de la convention.</p>
            <p>11.2 Cet accord de partenariat commercial lie les partenaires commerciaux et pourra servir à
                leurs héritiers, exécuteurs testamentaires, administrateurs, représentants personnels,
                successeurs et ayants droit respectifs.</p>

            <h2>12. JURIDICTION</h2>
            <p>12.1 Le présent contrat de partenariat commercial est régi par les lois de l’État de {{
                contract.contract_12_1
            }}.</p>
            <footer>
                <!-- Pied de page avec des interpolations pour les signatures et autres informations -->
                <div class="affirmed-date grid-container">
                    <p>Solennellement affirmé à {{ contract.some_location }}</p>
                    <p>Daté de ce jour {{ formatDate(contract.contract_date2) }}</p>
                </div>

                <div class="signature grid-container">
                    <p class="signature-title">Signé, validé et livré en présence de:</p>
                    <p>(1) {{ contract.contract_sign }}</p>
                </div>

                <div class="attorney-sign grid-container">
                    <p>Par moi:</p>
                    <p>{{ contract.contract_sign_me }}</p>
                </div>
            </footer>
        </div>
        <div v-else>
            Chargement des détails du contrat...
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
    props: {
        id: Number
    },
    data() {
        return {
            contract: null,
            partners: [],
            partnerNames: [],
            isLoading: true,
        };
    },
    async mounted() {
        try {
            const response = await axios.get(`http://localhost:3000/contracts/${this.id}`);
            this.contract = response.data.contract;
            this.partners = response.data.partners;
            this.partnerNames = response.data.partnerNames;
            this.isLoading = false;
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du contrat:', error);
            this.isLoading = false;
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        async printContract() {
            const content = document.getElementById("to-print");
            const canvas = await html2canvas(content);
            const imgData = canvas.toDataURL('image/png');

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width, canvas.height]
            });

            doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            doc.save("document.pdf");
        },
        // Formatage de la date
        formatDate(dateString) {
            if (!dateString) return '';

            const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
            const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

            const date = new Date(dateString);
            const dayName = days[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');

            return `${dayName} ${day} ${month}, ${year} à ${hours}h${minutes}`;
        },
    },
};
</script>
<style scoped>
.container {
    font-family: inherit;
    width: 100%;
    max-width: 800px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    padding: 20px 80px;
}
h1 {
    color: rgb(0, 0, 0);
    padding: 10px 0;
    margin-bottom: 25px;
    font-size: 24px;
    text-align: center;
}
h2 {
    color: #000000;
    text-align: left;
    font-size: 20px;
    padding-bottom: 5px;
    margin-top: 50px;
    margin-bottom: 20px;
}
ol {
    list-style-type: decimal;
    margin-left: -25px;
}
p {
    text-align: left;
    margin-bottom: 26px;
    /* Ajustez cette valeur pour augmenter ou diminuer l'espacement */
    line-height: 1.5;
    /* 1.5 fois la taille de la police par défaut */
}
.partner {
    margin-top: -10px;
    text-align: left;
}
li {
    margin-bottom: 10px;
}
.grid-container {
    display: grid;
    grid-template-columns: 0.8fr auto;
    gap: -30px;
}
/* Réduire la marge inférieure de la première ligne */
.affirmed-date p:first-of-type {
    margin-bottom: -30px;
    /* Ajustez cette valeur selon vos préférences */
}
.signature-title {
    margin-bottom: 1em;
}
.affirmed-date p,
.signature p,
.attorney-sign p {
    margin-bottom: 0.5em;
}
footer {
    padding-top: 100%;
    margin-bottom: 100px;
}
</style>