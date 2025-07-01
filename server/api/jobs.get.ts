import {LaSecuRecruteService} from '~/service/lasecurecrute.service'

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig()
    try {
        const service = LaSecuRecruteService.getInstance()
        const result = await service.fetchJobs()
        return result
    } catch (error) {
        return {
            success: false,
            error: `Erreur lors de la récupération des offres d'emploi : ${error.message}`
        }
    }
})