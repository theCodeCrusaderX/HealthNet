import { Client, Account, Databases, ID } from "appwrite";

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66fa739500373135e1bf'); 

const account = new Account(client);
const databases = new Databases(client);
const DATABASE_ID = '6712857300019ae9100d'; 
const DOCTOR_COLLECTION_ID = '67133be0003d2fc2569f'; 

//auth
// Function to create a new doctor
export async function createDoctor(doctorData) {
  const { fName, lName, email, experience,  specialist, instituteName, phoneNo, address, avatar,password } = doctorData;

  //give a valid log
  console.log(email);
  

  try {
    const doctor = await account.create(ID.unique(), email,password,fName)

    console.log("doc created in backend",doctor);
    

    const doctorDocument = await databases.createDocument(
      DATABASE_ID,
      DOCTOR_COLLECTION_ID,
      ID.unique(), 
      {
        doctorId : doctor.$id,
        fName,
        lName,
        email,
        experience,
        specialist,
        instituteName,
        phoneNo,
        address,
        avatar,
        password
      }
    );

    //not consoling the document
    console.log("doc document",doctorDocument);
    

    return {
      success: true,
      message: "Doctor created successfully.",
      doctor: doctorDocument,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to create doctor.",
    };
  }
}

// Function to log in as a doctor
export async function loginDoctor(email, password) {
  try {
    const session = await account.createSession(email, password);
    return {
      success: true,
      message: "Doctor logged in successfully.",
      session,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to log in.",
    };
  }
}

// Function to log out the doctor
export async function logoutDoctor() {
  try {
    await account.deleteSession('current'); // Log out the current session
    return {
      success: true,
      message: "Doctor logged out successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to log out.",
    };
  }
}

// Function to update doctor profile
export async function updateDoctorProfile(userId, updatedData) {
  const { fName, lName, email, experience, specialist, institute_name, phoneno, address, avatar } = updatedData;

  try {
    // Update the document in the doctors collection
    const doctorDocument = await databases.updateDocument(
      DATABASE_ID,
      DOCTOR_COLLECTION_ID,
      userId, // Assuming userId is the document ID in the doctors collection
      {
        fName,
        lName,
        email,
        experience,
        specialist,
        institute_name,
        phoneno,
        address,
        avatar,
      }
    );

    return {
      success: true,
      message: "Doctor profile updated successfully.",
      doctor: doctorDocument,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to update profile.",
    };
  }
}

// Function to reset password for a doctor
export async function resetDoctorPassword(email) {
  try {
    // Send a password recovery email
    const response = await account.createRecovery(email, 'https://your-app-url/reset-password'); // Set your recovery link here
    return {
      success: true,
      message: "Password recovery email sent successfully.",
      response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to send recovery email.",
    };
  }
}
