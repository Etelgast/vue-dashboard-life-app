<script setup lang="ts">
import { ref } from 'vue'
import BoardNavigation from '@/features/home/ui/Board/BoardNavigation/ui/BoardNavigation.vue'
import BoardBody from '@/features/home/ui/Board/BoardBody/ui/BoardBody.vue'
import BoardCardModal from '@/features/home/ui/Board/BoardBody/BoardCardModal/BoardCardModal.vue'

const isBoardCardModalOpen = ref<boolean>(false)
const selectedColumn = ref<string>('')

const toggleBoardCardModal = (tab: string) => {
  selectedColumn.value = tab
  isBoardCardModalOpen.value = !isBoardCardModalOpen.value
}
</script>

<template>
  <BoardNavigation @toggle-modal="toggleBoardCardModal" />
  <BoardBody @toggle-modal="toggleBoardCardModal" />
  <Teleport to="#app">
    <BoardCardModal
      v-if="isBoardCardModalOpen"
      @toggle-modal="toggleBoardCardModal"
      :selected-column="selectedColumn"
    />
  </Teleport>
</template>
