import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT as string);

export const account = new Account(client);
export const databases = new Databases(client);

export const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE as string;
export const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION as string;
