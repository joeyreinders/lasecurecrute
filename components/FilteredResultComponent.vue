<script setup lang="ts">
import type {TableColumn} from "@nuxt/ui";
import {useOfferStore} from "~/stores/offer.store";
import {offerPredicate} from "~/composables/filter.arguments";

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
    header: 'Localisation'
  },
  {
    accessorKey: 'deadline',
    header: 'Date limite'
  }
] satisfies TableColumn[]

const offerStore = useOfferStore()
const offers = computed(() => offerStore.getJobOffers())

const openUrl = (url: string) => window.open(url, '_blank')

/** Filters **/
const selectedDepartements = useSelectedDepartements()
const selectedTypesContract = useSelectedTypesContract()
const selectedFamillesDeMetiers = useSelectedFamillesDeMetiers()

const filtersDefined = computed(() => selectedDepartements.value.length > 0 || selectedTypesContract.value.length > 0 || selectedFamillesDeMetiers.value.length > 0)
const filteredOffers = computed(() => offers.value.filter((elem) => filtersDefined.value ? offerPredicate(elem) : true))

</script>

<template>
  <div v-show="filtersDefined">
    <h3 v-if="filteredOffers.length > 0">Nombre d'offres correspondant à votre recherche: {{ filteredOffers.length }}</h3>
    <h3 v-else>Aucun offre correspond à votre recherche</h3>
  </div>
  <UTable :data="filteredOffers" :columns="colums" class="flex-1">
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

    <!-- Contrat column -->
    <template #contractType-cell="{ row }">
      <template v-if="row.original.contractType.includes('alternance')">Alternance</template>
      <template v-else>{{ row.original.contractType }}</template>
    </template>

    <!-- departement column -->
    <template #departement-cell="{ row }">
      <div class="flex gap-1">
        <UBadge color="primary" v-if="row.original.localisation != ''">{{ row.original.localisation }}</UBadge>
        <UBadge color="secondary" v-if="(selectedDepartements.length > 1 || selectedDepartements.length == 0)
                                          && row.original.departement?.name != undefined">{{ row.original.departement.name }}</UBadge>
        <!--<UBadge color="warning" v-if="row.original.departement?.numDep != undefined">{{ row.original.departement.region }}</UBadge>-->
      </div>
    </template>
  </UTable>
</template>

<style scoped>

</style>