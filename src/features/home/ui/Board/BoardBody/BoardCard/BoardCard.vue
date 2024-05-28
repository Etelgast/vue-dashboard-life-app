<script setup lang="ts">
import { computed } from 'vue'
import type { IBoardTask } from '@/entities/Board/interfaces'

import { api } from '@/entities/Board/api/service'
import { formatDate } from '@/shared/lib/utils/date/date'

import HamburgerDropdown from '@/shared/ui/dropdowns/HamburgerDropdown.vue'

const props = defineProps<{
  task: IBoardTask
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
</script>

<template>
  <article :class="$style.card">
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
.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 2px solid rgba(28, 29, 34, 0.06);
  border-radius: 12px;
  cursor: pointer;

  header {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;

      h2 {
        font-weight: 600;
      }

      h3 {
        color: var(--gray-color);
      }
    }
  }

  & > div,
  footer {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }

  .progress {
    span:first-child {
      color: var(--gray-color);

      &::before {
        margin-right: 5px;
        content: url('/src/shared/ui/assets/menu-icon.svg');
        top: 0px;
        left: 0px;
      }
    }
  }

  .bar {
    position: relative;
    display: inline-block;
    background: #eee;
    height: 10px;
    border-radius: 6px;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: var(--progress-width);
      background: turquoise;
    }
  }

  footer {
    color: var(--gray-color);

    button {
      font-weight: 700;
      border-radius: 17px;
      padding: 8px 16px;
      background: rgba(136, 141, 167, 0.1);
    }

    div {
      display: flex;
      align-items: center;
      gap: 10px;

      div span::before {
        content: '';
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        background-size: cover;
        vertical-align: middle;
      }

      div:first-child span::before {
        background-image: url('/src/shared/ui/assets/comment-icon.svg');
      }

      div:last-child span::before {
        background-image: url('/src/shared/ui/assets/file-icon.svg');
      }
    }
  }
}
</style>
