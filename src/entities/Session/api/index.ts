import router from '@/app/router'
import { account, avatars } from '@/shared/lib/appwrite/appwrite'
import { useSessionStore } from '../model/stores'
import type { IUserAuth } from '../interfaces'
import { ID } from 'appwrite'

export const api = {
  getUserSession,
  createSession,
  registerUser,
  deleteUserSession,
  getUserAvatar
}

async function getUserSession(): Promise<void> {
  const sessionStore = useSessionStore()
  try {
    const { $id, email, name }: IUserAuth = await account.get()
    sessionStore.user = { $id, email, name }
  } catch (error) {
    sessionStore.user = null
  }
}

async function createSession(email: string, password: string): Promise<void> {
  try {
    await account.createEmailPasswordSession(email, password)
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}

async function registerUser(name: string, email: string, password: string) {
  try {
    await account.create(ID.unique(), email, password, name)
    await createSession(email, password)
  } catch (error) {
    console.log(error)
  }
}

async function deleteUserSession(): Promise<void> {
  const sessionStore = useSessionStore()
  try {
    await account.deleteSession('current')
    sessionStore.user = null
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}

function getUserAvatar(): URL {
  const sessionStore = useSessionStore()
  return avatars.getInitials(sessionStore.user?.name, 36, 36)
}
