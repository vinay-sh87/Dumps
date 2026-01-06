import { Account, Client, Databases, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID };

export const appwriteConfig = {
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    portfoliosCollectionId: import.meta.env.VITE_APPWRITE_PORTFOLIOS_COLLECTION_ID,
    projectsCollectionId: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID,
    storageBucketId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID
}
