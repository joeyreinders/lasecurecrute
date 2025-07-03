import {LaSecuRecruteService} from '~/service/lasecurecrute.service'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    try {
        return LaSecuRecruteService.getInstance().getTypesContract()
    } catch (error) {
        return {
            success: false,
            error: `Erreur lors de la récupération des types de contrat : ${error.message}`
        }
    }
})