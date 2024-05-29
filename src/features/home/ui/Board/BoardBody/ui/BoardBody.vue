<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { api } from '@/entities/Board/api/service'
import BoardColumn from './../BoardColumn/BoardColumn.vue'

import { useBoardStore } from '@/entities/Board/model/stores'

defineEmits(['toggle-modal'])

const tabs = ['To Do', 'In Progress', 'Done']
const draggedTaskStatus = ref<string | null>(null)
const draggingOverZone = ref<string>('')

const boardStore = useBoardStore()

const tasks = computed(() => boardStore.tasks)

const onDropCard = async (event: DragEvent, tab: string) => {
  if (event.dataTransfer) {
    const cardId = event.dataTransfer.getData('cardId')
    const updatedCard = { status: tab }
    await api.updateTask(cardId, updatedCard)
    draggedTaskStatus.value = null
  }
}

const handleDragOver = (tab: string) => {
  draggingOverZone.value = tab
}

const handleDragEnd = () => {
  draggingOverZone.value = ''
  draggedTaskStatus.value = null
}

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
      :dragging-over-zone="draggingOverZone"
      v-model="draggedTaskStatus"
      @toggle-modal="$emit('toggle-modal', tab)"
      @dragover.prevent="handleDragOver(tab)"
      @dragend.prevent="handleDragEnd"
      @drop="onDropCard($event, tab)"
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
