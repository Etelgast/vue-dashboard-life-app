import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBoardTask } from '../interfaces'

export const useBoardStore = defineStore('board', () => {
  const tasks = ref<IBoardTask[] | null>(null)
  return { tasks }
})
