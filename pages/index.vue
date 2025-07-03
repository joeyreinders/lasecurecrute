<script setup lang="ts">

import {useGeoStore} from "~/stores/geo.store";
import type {AccordionItem} from "@nuxt/ui";
import FilterComponent from "~/components/FilterComponent.vue";
import FilteredResultComponent from "~/components/FilteredResultComponent.vue";

const geoStore = useGeoStore()

const filterAccordion = [
  {
    label: 'Affiner votre recherche',
    slot: 'filter-recherche'
  }
] satisfies AccordionItem[]



onMounted(async () => {
  await geoStore.fetch()
})

</script>

<template>
  <MainComponent>
    <UAccordion :items="filterAccordion">
      <template #filter-recherche>
        <FilterComponent/>
      </template>
    </UAccordion>
    <br>
    <FilteredResultComponent />
  </MainComponent>
</template>

<style scoped>

</style>