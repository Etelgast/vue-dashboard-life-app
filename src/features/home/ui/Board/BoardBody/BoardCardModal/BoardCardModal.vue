<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IBoardTask } from '@/entities/Board/interfaces'

const props = defineProps<{
  selectedColumn: string
}>()

defineEmits(['toggle-modal'])

const task: Partial<IBoardTask> = reactive({
  title: '',
  subtitle: '',
  description: '',
  subtasks: [],
  status: props.selectedColumn,
  endDate: ''
})
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal">
      <header>
        <h1>Add new task</h1>
        <span @click="$emit('toggle-modal')"></span>
      </header>
      <form action="">
        <div>
          <label for="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Do something great"
            v-model="task.title"
          />
        </div>
        <div>
          <label for="subtitle">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            placeholder="And little thing"
            v-model="task.subtitle"
          />
        </div>
        <div>
          <label for="description">Add description</label>
          <textarea
            name="description"
            id="description"
            placeholder="..."
            v-model="task.description"
          ></textarea>
        </div>
        <div>
          <label for="subtask">Add subtask</label>
          <input type="text" name="substask" id="subtask" placeholder="..." />
        </div>
        <div>
          <label for="date">Choose end date for your task</label>
          <input type="date" name="date" id="date" v-model="task.endDate" />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--gray-color);
  z-index: 99;
}

.modal {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
  width: 550px;
  padding: 15px 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 12px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 20px;
      font-weight: 600;
    }

    span {
      position: relative;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: var(--gray-color);
      opacity: 0.3;
      cursor: pointer;

      &::after {
        content: 'x';
        position: absolute;
        top: -1px;
        left: 8px;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input,
    textarea {
      margin-top: 5px;
      width: 100%;
      padding: 10px;
      border: 1px solid #ded2d9;
      border-radius: 5px;
    }
  }
}
</style>
