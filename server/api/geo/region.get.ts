import {GeoService} from "~/service/geo.service";


export default defineEventHandler(async (event) => {
    const geoService = new GeoService()
    return geoService.getRegions()
})