<script setup lang="ts">
import { computed } from 'vue'
import type { IBoardTask } from '@/entities/Board/interfaces'

import { api } from '@/entities/Board/api/service'
import { formatDate } from '@/shared/lib/utils/date/date'

import HamburgerDropdown from '@/shared/ui/dropdowns/HamburgerDropdown.vue'

const props = defineProps<{
  task: IBoardTask
}>()

const emit = defineEmits<{
  (e: 'start-drag', id: string, currentStatus: string): void
}>()

const moveTaskToAnotherColumn = async (tab: string) => {
  const updatedTask = { status: tab }
  await api.updateTask(props.task.$id, updatedTask)
}

const taskProgress = computed(() => {
  const doneSubtasks = props.task.subtasks.filter((subtask) => subtask.is_done).length
  const totalSubtasks = props.task.subtasks.length
  return {
    counter: `${doneSubtasks}/${totalSubtasks}`,
    progress: Math.ceil((doneSubtasks / totalSubtasks) * 100)
  }
})

const endTaskDate = computed(() => {
  const { day, monthName, year } = formatDate(new Date(props.task.endDate))
  return day + ' ' + monthName + ' ' + year
})

const startDrag = (event: DragEvent, item: string, currentStatus: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('cardId', item)
    emit('start-drag', item, currentStatus)
  }
}
</script>

<template>
  <article :class="$style.card" @dragstart="startDrag($event, task.$id, task.status)">
    <header>
      <div>
        <h2>{{ task.title }}</h2>
        <h3>{{ task.subtitle ? task.subtitle : '' }}</h3>
      </div>
      <HamburgerDropdown
        :status="task.status"
        :id="task.$id"
        @move-task-to-another-column="moveTaskToAnotherColumn"
      />
    </header>
    <div :class="$style.progress">
      <span>Progress</span>
      <span>{{ taskProgress.counter }}</span>
    </div>
    <div
      :class="$style.bar"
      :style="{
        '--progress-width': `${taskProgress.progress}%`
      }"
    ></div>
    <footer>
      <button>{{ endTaskDate }}</button>
      <div>
        <div>
          <span>7</span>
        </div>
        <div>
          <span>2</span>
        </div>
      </div>
    </footer>
  </article>
</template>

<style lang="scss" module>
@import url('./styles.module.scss');
</style>
