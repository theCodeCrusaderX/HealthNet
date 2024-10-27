import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66fa739500373135e1bf');

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = '6712857300019ae9100d';
const COLLECTION_ID = '67133be9002575640566';

//auth
export async function RegisterUser(userName, email, password) {
  try {
    const user = await account.create(ID.unique(), email, password, userName);
    const userDocument = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        userName: userName,
        email: email,
        password: password,
      }
    );

    return {
      success: true,
      message: "User registered and additional data stored successfully.",
      user: user,
      userDocument: userDocument,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to register user.",
    };
  }
}

export async function loginUser(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return {
      success: true,
      message: "User logged in successfully.",
      session: session,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to log in user.",
    };
  }
}

export async function logoutUser() {
  try {
    await account.deleteSession('current');
    return {
      success: true,
      message: "User logged out successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to log out user.",
    };
  }
}

export async function updateUserData(userId, updatedData) {
  try {
    const userDocument = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      userId,
      updatedData
    );

    return {
      success: true,
      message: "User data updated successfully.",
      userDocument: userDocument,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to update user data.",
    };
  }
}
