<script setup lang="ts">
import { computed } from 'vue'
import BoardCard from './../BoardCard/BoardCard.vue'
import type { IBoardTask } from '@/entities/Board/interfaces.ts'

const props = defineProps<{
  title: string
  tasks: IBoardTask[] | null
  tab: string
}>()

defineEmits(['toggle-modal'])

const filteredTasks = computed(() => {
  return props.tasks?.filter((task) => task.status === props.tab)
})

const taskCounter = computed(() => {
  return props.tasks?.filter((task) => task.status === props.tab).length
})
</script>

<template>
  <div :class="$style.column">
    <div>
      <span>{{ title }} ({{ taskCounter }})</span>
      <button type="button" @click="$emit('toggle-modal')">Add new task</button>
    </div>
    <BoardCard v-for="task in filteredTasks" :key="task.$id" :task="task" />
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
</style>
