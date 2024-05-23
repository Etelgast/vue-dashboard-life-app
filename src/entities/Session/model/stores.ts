import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUserAuth } from '../interfaces'

export const useSessionStore = defineStore('session', () => {
  const user = ref<IUserAuth | null>(null)
  return { user }
})
