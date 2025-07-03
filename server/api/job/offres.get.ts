import {LaSecuRecruteService} from '~/service/lasecurecrute.service'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    try {
        return LaSecuRecruteService.getInstance().getOffres()
    } catch (error) {
        return {
            success: false,
            error: `Erreur lors de la récupération des offres d'emploi : ${error.message}`
        }
    }
})