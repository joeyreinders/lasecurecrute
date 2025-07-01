<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: "Accueil",
    to: '/',
    icon: 'i-lucide-house'
  },
  {
    label: "Gestion des erreurs",
    to: '/error',
    icon: 'i-lucide-server-crash'
  }
])

const dataStore = useOfferStore()
const fetchJobs = async () => dataStore.fetch()
const jobTotal = computed(() => dataStore.getJobOfferCount())

</script>

<template>
  <div class="container mx-auto">
    <UCard>
      <template #header>
        <div class="flex">
          <UButton loading-auto @click="fetchJobs" :disabled="jobTotal> 0">
            <template v-if="jobTotal > 0">{{ jobTotal }} offres trouvés</template>
            <template v-else>Charger les offres d'emploi</template>
          </UButton>
          <span>&nbsp;</span>
          <UNavigationMenu :items="items"/>
        </div>
      </template>
      <slot></slot>
    </UCard>
  </div>
</template>

<style scoped>

</style>