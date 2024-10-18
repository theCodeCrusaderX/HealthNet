import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66fa739500373135e1bf");

export const account = new Account(client);
export { ID } from "appwrite";
