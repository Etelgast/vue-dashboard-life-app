<script setup lang="ts">
import { computed } from 'vue'
import { useSessionStore } from '@/entities/Session/model/stores'

import AppNavigation from '@/widgets/navigation/AppNavigation.vue'
import AppHeader from '@/widgets/header/AppHeader.vue'

const sessionStore = useSessionStore()

const isNavigationAndHeaderVisible = computed((): boolean => !!sessionStore.user)
</script>

<template>
  <AppNavigation v-if="isNavigationAndHeaderVisible" />
  <main>
    <AppHeader v-if="isNavigationAndHeaderVisible" />
    <RouterView></RouterView>
  </main>
</template>

<style lang="scss">
main {
  width: 100%;
  height: 100vh;
  padding: 30px 25px;
}
</style>
