<script setup lang="ts">
import type {TableColumn} from "@nuxt/ui";
import {useOfferStore} from "~/stores/offer.store";


const {} = defineProps({});
const offerStore = useOfferStore()
const offers = computed(() => offerStore.getJobOffers()
    .filter(offer => offer.departement === null || Object.keys(offer.departement).length === 0)
    .filter(offer => offer.localisation !== null && offer.localisation.length > 0)
)
const nbOffers = computed(() => offers.value.length)
const download = () => {
  const blob = new Blob([JSON.stringify(offers.value.map((elem) => {
    return {
      localisation: elem.localisation,
      region: elem.region
    }
  }), null, 2)], {type: 'application/json'});
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob)
  link.setAttribute('download', `offes-sans-departement.json`);
  link.hidden = true
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const columns = [
  {
    accessorKey: 'localisation',
    header: 'Localisation'
  },
  {
    accessorKey: 'region',
    header: 'Region'
  },
  {
    accessorKey: 'departement',
    header: 'Departement'
  }
] satisfies TableColumn[]

</script>

<template>
  <h3>Number of errors: {{ nbOffers }}</h3>
  <UButton @click.stop="download">Download</UButton>
  <UTable :columns="columns" :data="offers"/>
</template>

<style scoped>

</style>