export const useGeoStore = defineStore('geoStore', {
    state: () => ({
        departements: [],
        regions: []
    }),
    actions : {
        async fetch() {
            this.departements = await $fetch('/api/geo/departement')
            this.regions = await $fetch('/api/geo/region')
        }
    },
    getters : {
        getDepartements : (state) => () => state.departements,
        getRegions : (state) => () => state.regions
    }
})