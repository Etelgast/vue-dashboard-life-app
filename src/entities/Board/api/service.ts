import { databases } from '@/shared/lib/appwrite/appwrite'
import type { IBoardTask } from '../interfaces'
import { useBoardStore } from '../model/stores'
import { useSessionStore } from '@/entities/Session/model/stores'
import { ID, Permission, Role } from 'appwrite'

export const api = {
  getListTasks,
  updateTask,
  deleteTask,
  addNewTask
}

const DATABASE_ID = '664e065d000234f179ee'
const COLLECTION_ID = '664e066c002e13322bd5'

async function getListTasks(): Promise<void> {
  const boardStore = useBoardStore()
  try {
    const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
    boardStore.tasks = documents as IBoardTask[]
  } catch (error) {
    console.log(error)
  }
}

async function updateTask(documentId: string, updatedDocument: Partial<IBoardTask>): Promise<void> {
  const boardStore = useBoardStore()
  try {
    const document = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
      updatedDocument
    )
    if (boardStore.tasks) {
      boardStore.tasks = [
        document as IBoardTask,
        ...boardStore.tasks.filter((task) => task.$id !== documentId)
      ]
    } else {
      boardStore.tasks = [document as IBoardTask]
    }
  } catch (error) {
    console.log(error)
  }
}

async function deleteTask(documentId: string) {
  const boardStore = useBoardStore()
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId)
    if (boardStore.tasks) {
      boardStore.tasks = boardStore.tasks.filter((task) => task.$id !== documentId)
    } else {
      boardStore.tasks = []
    }
  } catch (error) {
    console.log(error)
  }
}

async function addNewTask(task: Partial<IBoardTask>): Promise<void> {
  const boardStore = useBoardStore()
  try {
    const document = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), task)
    if (boardStore.tasks) {
      boardStore.tasks = [document as IBoardTask, ...boardStore.tasks]
    } else {
      boardStore.tasks = [document as IBoardTask]
    }
  } catch (error) {
    console.log(error)
  }
}
