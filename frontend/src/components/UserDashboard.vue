<template>
  <div class="container mt-4">
    <h1 class="mb-4">Dashboard Utilisateur</h1>
    <!-- Bouton pour afficher le formulaire -->
    <router-link to="create-contract" class="btn btn-primary mb-4">Créer un contrat</router-link>

    <!-- Section pour les brouillons -->
    <div v-if="draftContract">
      <h2>Brouillon de Contrat</h2>
      <p>Vous avez un brouillon enregistré. Voulez-vous continuer à le rédiger ?</p>
      <router-link :to="{ name: 'create-contract', query: { draft: 'true' } }" class="btn btn-warning mb-4">Continuer le
        Brouillon</router-link>
    </div>

    <!-- Affichage conditionnel du router-view -->
    <router-view v-if="showCreateContractForm"></router-view>


    <!-- Liste des contrats -->
    <div class="list-group">
      <h2 class="mb-4">Mes contrats</h2>
      <div v-for="contract in contracts" :key="contract.id"
        class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-1">Contrat: {{ contract.id }}</h5>
          <p>Date du contrat: {{ formatDate(contract.contract_date) }}</p>
        </div>
        <div>
          <button class="btn btn-secondary me-2" @click="showContractDetails(contract)">Visualiser</button>
          <button class="btn btn-info me-2" @click="editContract(contract)">Modifier</button>
          <button class="btn btn-danger" @click="deleteContract(contract.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';


export default {
  data() {
    return {
      contracts: [], // Pour stocker les contrats
      showCreateContractForm: false, // Pour afficher ou masquer le formulaire
      draftContracts: [], // Pour stocker les contrats en brouillon
      draftContract: null, // Pour stocker l'état initial du contrat
    };
  },
  async created() {
    const response = await axios.get('http://localhost:3000/contracts');
    this.contracts = response.data;
  },
  mounted() {
    // Chargez les contrats en brouillon
    this.loadDraftContracts();
  },
  methods: {
    // Logique pour enregistrer le contrat en brouillon
    loadDraftContracts() {
      const draftData = localStorage.getItem('contractDraft');

      if (draftData) {
        this.draftContract = JSON.parse(draftData);
        console.log('Brouillon chargé:', this.draftContract);
      }
    },
    // Logique pour verifier si le contrat en brouillon à des informations non sauvegardées
    hasUnsavedChanges() {
      return JSON.stringify(this.contractData) !== this.initialContractData;
    },
    // Logique pour montrer le contrat
    showContractDetails(contract) {
      const contractIdAsNumber = Number(contract.id);
      console.log('Type de contractIdAsNumber:', typeof contractIdAsNumber, 'Valeur:', contractIdAsNumber);

      this.$router.push({
        name: 'ContractView',
        params: { id: contractIdAsNumber }
      });
    },
    // Logique pour notifié l'utilisateur avant de quitter la page
    handleBeforeUnload(event) {
      if (this.hasUnsavedChanges()) {
        event.preventDefault();
        event.returnValue = 'Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter ?';
      }
    },
    // Logique pour edité le contrat déja terminer
    editContract(contract) {
      this.$router.push({ name: 'edit-contract', params: { contractId: contract.id } });
      console.log('Contrat à modifier:', contract, contract.id);
    },

    // Logique pour supprimer un contrat 
    async deleteContract(contractId) {
      try {
        await axios.delete(`http://localhost:3000/contracts/${contractId}`);
        this.contracts = this.contracts.filter(contract => contract.id !== contractId);
        console.log('Contrat supprimé:', contractId);
      } catch (error) {
        console.error('Erreur lors de la suppression du contrat:', error);
      }
    },
    // Formatage de la date pour l'affichage JOUR + MOIS + ANNEE + HEURES
    formatDate(dateString) {
      if (!dateString) return '';

      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

      const date = new Date(dateString);
      const dayName = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${dayName} ${day} ${month}, ${year}`;
    },
  }
};
</script>
<style scoped>
.btn-close {
  /* Style pour votre bouton de fermeture */
  font-size: 1.5rem;
  /* Exemple de taille */
  margin-left: auto;
  /* Pour aligner à droite si nécessaire */
  /* Autres styles selon vos besoins */
}

.list-group {
  margin-top: 10%;
  cursor: pointer;
  padding-bottom: 50px;
}
</style>