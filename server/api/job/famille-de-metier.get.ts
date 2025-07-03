import {LaSecuRecruteService} from '~/service/lasecurecrute.service'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    try {
        return await LaSecuRecruteService.getInstance().getFamilleDeMetiers()
    } catch (error) {
        return {
            success: false,
            error: `Erreur lors de la récupération des familles des metiers : ${error.message}`
        }
    }
})