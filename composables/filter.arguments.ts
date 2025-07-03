import type { Ref } from 'vue'

export const useSelectedDepartements = () => {
    return useState<string[]>('selectedDepartements', () => [])
}

export const useSelectedTypesContract = () => {
    return useState<string[]>('selectedTypesContract', () => [])
}

export const useSelectedFamillesDeMetiers = () => {
    return useState<string[]>('selectedFamillesDeMetiers', () => [])
}

export const offerPredicate = (anOffer: any) : boolean => {
    const selectedDepartements : string[] = useSelectedDepartements().value
    const selectedTypesContract : string[] = useSelectedTypesContract().value
    const selectedFamillesDeMetiers: string[] = useSelectedFamillesDeMetiers().value

    let result = false

    // Check departement
    if(selectedDepartements.length > 0) {
        result = anOffer.departement?.numDep == undefined ? false : selectedDepartements.includes(anOffer.departement.numDep)
    } else {
        result = true
    }

    //Check contrat
    if(selectedTypesContract.length > 0) {
        result = result && selectedTypesContract.includes(anOffer.contractType)
    } else {
        result = result && true
    }

    //Check Famille de Metiers
    if(selectedFamillesDeMetiers.length > 0) {
        result = result && selectedFamillesDeMetiers.includes(anOffer.familleDeMetiers)
    } else {
        result = result && true
    }

    return result
}