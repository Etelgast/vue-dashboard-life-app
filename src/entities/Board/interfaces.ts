import type { Models } from 'appwrite'

export interface IBoardTask extends Models.Document {
  title: string
  subtitle: string
  description: string
  subtasks: IBoardSubTask[]
  status: string
  endDate: string
}

export interface IBoardSubTask extends Models.Document {
  description: string
  is_done: boolean
}
