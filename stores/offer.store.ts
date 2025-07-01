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
            try {
                this.loading = true
                const data = await $fetch('/api/jobs')

                this.familleDeMetiers = data.familleDeMetiers
                this.localisation = data.localisation
                this.typeContrat = data.typeContrat
                this.offers = data.offers
            } finally {
                this.loading = false
                this.loaded = true
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
        getJobOffers : (state) => () => state.offers
    }
})