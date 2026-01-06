import { Client, Account, TablesDB } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("69520682001c60fd1e08");

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
