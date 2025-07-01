<script setup lang="ts">
  import type {AccordionItem} from "@nuxt/ui";

  const items = [
      {
        label: 'Offres sans département',
        slot: 'no-departement'
      }
  ] satisfies AccordionItem[]
</script>

<template>
  <MainComponent>
    <h1>Gestion des erreurs</h1>
    <UAccordion :items="items">
        <template #no-departement>
          <ErrorNoDepartementComponent/>
        </template>
    </UAccordion>
  </MainComponent>
</template>

<style scoped>

</style>