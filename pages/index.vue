<script setup lang="ts">
import {useOfferStore} from "~/stores/offer.store";
import {useGeoStore} from "~/stores/geo.store";
import type {AccordionItem, TableColumn} from "@nuxt/ui";
import FilterComponent from "~/components/FilterComponent.vue";

const geoStore = useGeoStore()
const dataStore = useOfferStore()
const offers = computed(() => dataStore.getJobOffers())

const colums = [
  {
    accessorKey: 'url',
    header: 'URL'
  },
  {
    accessorKey: 'title',
    header: 'Titre'
  },
  {
    accessorKey: 'shortOrganisation',
    header: 'Organisation'
  },
  {
    accessorKey: 'contractType',
    header: 'Contrat'
  },
  {
    accessorKey: 'departement',
    header: 'Departement'
  }
] satisfies TableColumn[]

const filterAccordion = [
  {
    label: 'Affiner votre recherche',
    slot: 'filter-recherche'
  }
] satisfies AccordionItem[]

const openUrl = (url: string) => window.open(url, '_blank')

onMounted(async () => {
  await geoStore.fetch()
})

const departements = computed(() => geoStore.getDepartements())

</script>

<template>
  <MainComponent>
    <UAccordion :items="filterAccordion">
      <template #filter-recherche>
        <FilterComponent/>
      </template>
    </UAccordion>
    <UTable :data="offers" :columns="colums">
      <template #title-cell="{ row }">
        <UTooltip :text="row.original.title" v-if="row.original.title.length > 45">
          {{ row.original.title.substring(0, 50) }} ...
        </UTooltip>
        <template v-else>
          {{ row.original.title }}
        </template>
      </template>

      <!-- url column -->
      <template #url-cell="{ row }">
        <UIcon name="i-lucide-link" class="cursor-pointer" @click="openUrl(row.original.url)"/>
      </template>

      <!-- departement column -->
      <template #departement-cell="{ row }">
        {{ row.original.localisation }} ({{ row.original.departement.name }})
      </template>
    </UTable>
  </MainComponent>
</template>

<style scoped>

</style>