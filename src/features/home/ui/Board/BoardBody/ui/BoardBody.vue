<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BoardColumn from './../BoardColumn/BoardColumn.vue'
import { api } from '@/entities/Board/api/service'
import type { IBoardTask } from '@/entities/Board/api/service'

const tabs = ['To Do', 'In Progress', 'Done']

const tasks = ref<IBoardTask[] | null>(null)

onMounted(async () => {
  tasks.value = await api.getListTasks()
})
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
