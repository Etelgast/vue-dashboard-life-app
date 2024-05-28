<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IBoardTask, IBoardSubTask } from '@/entities/Board/interfaces'

import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { api } from '@/entities/Board/api/service'

import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit.vue'

const props = defineProps<{
  selectedColumn: string
}>()

const emit = defineEmits(['toggle-modal'])

const schema = yup.object().shape({
  title: yup.string().max(30).required(),
  subtitle: yup.string().max(35),
  description: yup.string().max(350),
  subtask: yup.string().max(35),
  date: yup.string().required()
})

const task: Partial<IBoardTask> = reactive({
  title: '',
  subtitle: '',
  description: '',
  subtasks: [],
  status: props.selectedColumn,
  endDate: ''
})

const currentFillingSubtask = ref<string>('')

const addNewSubtask = () => {
  if (task.subtasks) {
    const newSubtask: Partial<IBoardSubTask> = {
      description: currentFillingSubtask.value
    }
    task.subtasks.push(newSubtask as IBoardSubTask)
    currentFillingSubtask.value = ''
  }
}

const removeAddedSubtask = (index: number) => {
  if (task.subtasks) {
    task.subtasks.splice(index, 1)
  }
}

const createNewTask = async () => {
  await api.addNewTask(task)
  emit('toggle-modal')
}
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal">
      <header>
        <h1>Add new task</h1>
        <span @click="$emit('toggle-modal')"></span>
      </header>
      <Form name="add-new-task" :validation-schema="schema" @submit="createNewTask">
        <div>
          <label for="title">Title</label>
          <Field
            type="text"
            name="title"
            id="title"
            placeholder="Do something great"
            v-model="task.title"
          />
          <ErrorMessage name="title" />
        </div>
        <div>
          <label for="subtitle">Subtitle</label>
          <Field
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
            placeholder="Add a description to clarify your task"
            v-model="task.description"
          ></textarea>
        </div>
        <div class="subtask-wrapper">
          <label for="subtask">Add subtask</label>
          <Field
            type="text"
            name="subtask"
            id="subtask"
            placeholder="Add subtasks to decompose your task"
            v-model="currentFillingSubtask"
          />
          <i class="pi pi-plus-circle" style="font-size: 1.2rem" @click="addNewSubtask"></i>
        </div>
        <div class="subtask-wrapper__added">
          <div v-for="(subtask, index) in task.subtasks" :key="index">
            <input type="text" value="subtask.description" v-model="subtask.description" />
            <i class="pi pi-trash" style="font-size: 1.2rem" @click="removeAddedSubtask(index)"></i>
          </div>
        </div>
        <div>
          <label for="date">Choose end date for your task</label>
          <Field type="date" name="date" id="date" v-model="task.endDate" />
          <ErrorMessage name="date" />
        </div>
        <ButtonSubmit>Add a new task</ButtonSubmit>
      </Form>
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
  width: 40vw;
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

    textarea {
      height: 200px;
      resize: none;
    }

    & > div span {
      display: block;
      margin-top: 3px;
      font-size: 14px;
      color: red;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    .subtask-wrapper {
      position: relative;

      i {
        position: absolute;
        top: 55%;
        right: 10px;
        cursor: pointer;
      }
    }

    .subtask-wrapper__added div {
      position: relative;

      i {
        position: absolute;
        top: 40%;
        right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
