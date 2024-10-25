import { Client, Databases, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66fa739500373135e1bf');

const databases = new Databases(client);
const DATABASE_ID = '6712857300019ae9100d';
const COLLECTION_ID = '67134080000d5ccbb9c5';


export async function CreatePost(owner, image, content) {
  try {
    const postDocument = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        owner: owner,
        image: image,
        content: content,
      }
    );

    return {
      success: true,
      message: "Post created successfully.",
      document: postDocument,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to create post.",
    };
  }
}


export async function getPostById(postId) {
  try {
    const post = await databases.getDocument(DATABASE_ID, COLLECTION_ID, postId);
    return {
      success: true,
      post: post,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to fetch post by ID.",
    };
  }
}

// Update a post by ID
export async function updatePost(postId, updatedData) {
  try {
    const updatedPost = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      postId,
      updatedData 
    );

    return {
      success: true,
      message: "Post updated successfully.",
      document: updatedPost,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to update post.",
    };
  }
}

// Delete a post by ID
export async function deletePost(postId) {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, postId);
    return {
      success: true,
      message: "Post deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to delete post.",
    };
  }
}
