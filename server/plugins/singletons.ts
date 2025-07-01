import {LaSecuRecruteService} from "~/service/lasecurecrute.service";

export default defineNitroPlugin(() => {
    const lasecurecruteService = new LaSecuRecruteService()
    lasecurecruteService.init()
    global.lasecurecruteService = lasecurecruteService
})