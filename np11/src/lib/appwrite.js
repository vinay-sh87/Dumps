import { Client, Account, Databases } from "appwrite";

const client = new Client();
client.setEndpoint('https://nyc.cloud.appwrite.io/v1').setProject('6952132b000c70d903fa');

export const account = new Account(client);
export const database = new Databases(client);