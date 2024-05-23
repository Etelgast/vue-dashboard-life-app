import { databases } from '@/shared/lib/appwrite/appwrite'
import type { IBoardTask } from '../interfaces'
import { useBoardStore } from '../model/stores'
import { useSessionStore } from '@/entities/Session/model/stores'

export const api = {
  getListTasks,
  updateTask
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

async function updateTask(documentId: string, updatedDocument: IBoardTask): Promise<void> {
  const sessionStore = useSessionStore()
  const boardStore = useBoardStore()
  try {
    const document = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId,
      updatedDocument,
      [`read('${sessionStore.user?.$id}')`]
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
