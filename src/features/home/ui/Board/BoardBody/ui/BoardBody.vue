<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api } from '@/entities/Board/api/service'
import BoardColumn from './../BoardColumn/BoardColumn.vue'

import { useBoardStore } from '@/entities/Board/model/stores'

defineEmits(['toggle-modal'])

const tabs = ['To Do', 'In Progress', 'Done']

const boardStore = useBoardStore()

const tasks = computed(() => boardStore.tasks)

onMounted(async () => {
  await api.getListTasks()
})
</script>

<template>
  <section :class="$style.board">
    <BoardColumn
      v-for="tab in tabs"
      :key="tab"
      :title="tab"
      :tasks="tasks"
      :tab="tab"
      @toggle-modal="$emit('toggle-modal', tab)"
    />
  </section>
</template>

<style lang="scss" module>
.board {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 45px;
}
</style>
