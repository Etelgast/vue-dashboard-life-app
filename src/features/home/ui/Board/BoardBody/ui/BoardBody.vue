<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api } from '@/entities/Board/api/service'
import BoardColumn from './../BoardColumn/BoardColumn.vue'
import BoardCardModal from './../BoardCardModal/BoardCardModal.vue'

import { useBoardStore } from '@/entities/Board/model/stores'

const tabs = ['To Do', 'In Progress', 'Done']
const isBoardCardModalOpen = ref<boolean>(false)

const toggleBoardCardModal = () => {
  isBoardCardModalOpen.value = !isBoardCardModalOpen.value
}

const boardStore = useBoardStore()

onMounted(async () => {
  await api.getListTasks()
})

const tasks = computed(() => boardStore.tasks)
</script>

<template>
  <section :class="$style.board">
    <BoardColumn
      v-for="tab in tabs"
      :key="tab"
      :title="tab"
      :tasks="tasks"
      :tab="tab"
      @toggle-modal="toggleBoardCardModal"
    />
  </section>
  <Teleport to="#app">
    <BoardCardModal v-if="isBoardCardModalOpen" @toggle-modal="toggleBoardCardModal" />
  </Teleport>
</template>

<style lang="scss" module>
.board {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 45px;
}
</style>
