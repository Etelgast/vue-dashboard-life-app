<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BoardColumn from './../BoardColumn/BoardColumn.vue'
import { api } from '@/entities/Board/api/service'

import { useBoardStore } from '@/entities/Board/model/stores'

const tabs = ['To Do', 'In Progress', 'Done']

const boardStore = useBoardStore()

onMounted(async () => {
  await api.getListTasks()
})

const tasks = computed(() => boardStore.tasks)
</script>

<template>
  <section :class="$style.board">
    <BoardColumn v-for="tab in tabs" :key="tab" :title="tab" :tasks="tasks" :tab="tab" />
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
