import type { Models } from 'appwrite'

export interface IBoardTask extends Models.Document {
  title: string
  subtitle: string
  description: string
  subtasks: String[]
  status: string
  endDate: string
}
