<script setup lang="ts">
  const geoStore = useGeoStore()
  const departements = computed(() => geoStore.getDepartements())
</script>

<template>
  <div class="w-full">
    <div class="grid">
      <UFormField label="Departement">
        <USelect multiple :items="departements" label-key="name" value-key="numDep" class="w-48"/>
      </UFormField>
    </div>
  </div>
</template>

<style scoped>

</style>