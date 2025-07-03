<script setup lang="ts">
  const geoStore = useGeoStore()
  const departements = computed(() => geoStore.getDepartements())

  const offerStore = useOfferStore()
  const typesContrat = computed(() => offerStore.getTypesContract())
  const familleDeMetiers = computed(() => offerStore.getFamilleDeMetiers())

  const selectedDepartements = useSelectedDepartements()
  const selectedTypesContract = useSelectedTypesContract()
  const selectedFamillesDeMetiers = useSelectedFamillesDeMetiers()

  const clearFilters = () => {
    selectedDepartements.value = []
    selectedTypesContract.value = []
    selectedFamillesDeMetiers.value = []
  }
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-4 gap-4">
      <UFormField label="Departement">
        <USelect multiple :items="departements" label-key="description" value-key="numDep" class="w-full" v-model="selectedDepartements"/>
      </UFormField>
      <UFormField label="Contrat">
        <USelect multiple :items="typesContrat" v-model="selectedTypesContract" class="w-full"/>
      </UFormField>
      <!--<UFormField label="Famille de Metiers">
        <USelect multiple :items="familleDeMetiers" v-model="selectedFamillesDeMetiers" class="w-full"/>
      </UFormField>-->
      <UFormField label="&nbsp;">
        <UButton class="w-30" @click.stop="clearFilters">Vider filtres</UButton>
      </UFormField>
    </div>
  </div>
</template>

<style scoped>

</style>