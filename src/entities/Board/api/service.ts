import { databases } from '@/shared/lib/appwrite/appwrite'
import type { Models } from 'appwrite'

export const api = {
  getListTasks
}

const DATABASE_ID = '664e065d000234f179ee'
const COLLECTION_ID = '664e066c002e13322bd5'

export interface IBoardTask extends Models.Document {
  title: string
  subtitle: string
  description: string
  subtasks: String[]
  status: string
  endDate: string
}

async function getListTasks(): Promise<IBoardTask[] | null> {
  try {
    const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
    return documents.documents.map((document) => ({
      ...document,
      title: document.title,
      subtitle: document.subtitle,
      description: document.description,
      subtasks: document.subtasks,
      status: document.status,
      endDate: document.endDate
    }))
  } catch (error) {
    console.log(error)
    return null
  }
}
