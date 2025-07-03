import {GeoService} from "~/service/geo.service";


export default defineEventHandler(async (event) => {
    const geoService = new GeoService()
    return geoService.getDepartements()
        .map((elem) => {
            return {
                numDep: elem.numDep,
                name: elem.name,
                description : `${elem.numDep} - ${elem.name}`
            }
        })
})