export const useOfferStore = defineStore('offerStore', {
    state: () => ({
        familleDeMetiers: [],
        localisation: [],
        typeContrat: [],
        offers: [],

        //non data state
        loading: false,
        loaded: false
    }),
    actions : {
        async fetch() {
            if(this.loaded == false) {
                this.loading = true
                try {
                    await $fetch('/api/job/contrat/type').then((data) => this.typeContrat = data)
                    await $fetch('/api/job/famille-de-metier').then((data) => this.familleDeMetiers = data)
                    await $fetch('/api/job/offres').then((data) => this.offers = data)
                } finally {
                    this.loaded = false
                    this.loading = false
                }
            }
        }
    },
    getters : {
        getJobOfferCount : (state) => () => {
            return state.offers.length
        },
        isLoading : (state) => () => state.loading,
        getJobByReference : (state) => (reference) => {
            return state.offers.find((offer) => offer.reference === reference)
        },
        getJobOffers : (state) => () => state.offers,
        getTypesContract : (state) => () => state.typeContrat,
        getFamilleDeMetiers : (state) => () => state.familleDeMetiers
    }
})