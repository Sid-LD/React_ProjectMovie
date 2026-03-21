import { Client, Account, ID } from "appwrite"

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)

export const signUp = async (name, email, password) => {
    try {
        await account.create(ID.unique(), email, password, name)
        await signIn(email, password)
    } catch (error) {
        throw error
    }
}

export const signIn = async (email, password) => {
    try {
        return await account.createEmailPasswordSession(email, password)
    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    try {
        await account.deleteSession("current")
    } catch (error) {
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        return null
    }
}
