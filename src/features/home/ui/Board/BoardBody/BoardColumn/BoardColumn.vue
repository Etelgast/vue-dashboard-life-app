<script setup lang="ts">
import { computed, ref } from 'vue'
import BoardCard from './../BoardCard/BoardCard.vue'
import type { IBoardTask } from '@/entities/Board/interfaces'

const props = defineProps<{
  title: string
  tasks: IBoardTask[] | null
  draggingOverZone: string
}>()

const draggedTask = defineModel()

defineEmits(['toggle-modal'])

const filteredTasks = computed(() => {
  return props.tasks?.filter((task) => task.status === props.title)
})

const taskCounter = computed(() => {
  return props.tasks?.filter((task) => task.status === props.title).length
})

const handleStartDragCard = (id: string, currentStatus: string) => {
  draggedTask.value = currentStatus
}
</script>

<template>
  <div :class="$style.column">
    <div>
      <span>{{ title }} ({{ taskCounter }})</span>
      <button type="button" @click="$emit('toggle-modal')">Add new task</button>
    </div>
    <BoardCard
      v-for="task in filteredTasks"
      :key="task.$id"
      :task="task"
      draggable="true"
      @start-drag="handleStartDragCard"
    />
    <div
      v-if="draggedTask !== null && draggedTask !== title"
      :class="$style.drag"
      :style="
        draggingOverZone === title ? { boxShadow: '6px 20px 36px 0 rgba(28, 29, 34, 0.1)' } : {}
      "
    >
      Drag your task here...
    </div>
  </div>
</template>

<style lang="scss" module>
.column {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  padding: 24px 16px;
  border: 2px dashed rgba(28, 29, 34, 0.08);
  border-radius: 12px;

  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;

    span {
      color: var(--gray-color);
    }

    button {
      position: relative;
      font-weight: inherit;

      &::before {
        content: url('/src/shared/ui/assets/add-icon.svg');
        position: absolute;
        top: 2px;
        left: -26px;
      }
    }
  }
}

.drag {
  min-height: 191px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  border: 2px dashed rgba(28, 29, 34, 0.06);
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-color);
  transition: all 0.5s ease;
}
</style>
