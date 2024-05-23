import { Client, Account, Avatars, Databases } from 'appwrite'
import { type Models } from 'appwrite'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('664b423a001510f4637e')

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
