import { ID, Query,  } from 'appwrite';

import { INewUser } from "../../types/index";
import { account, appwriteConfig, avatars, databases, storage} from './config';
import { toast } from 'sonner';



// ================================================================= AUTHENTICATION =================================================================
  // ============================== SIGN UP
  export async function createUserAccount(user: INewUser) {
      try {
        const newAccount = await account.create(
          ID.unique(),
          user.email,
          user.password,
          user.name
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatars.getInitials(user.name);
    
        const newUser = await saveUserToDB({
          accountId: newAccount.$id,
          name: newAccount.name,
          email: newAccount.email,
          username: user.username,
          imageUrl: avatarUrl,
        });
    
        return newUser;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    
  // ============================== SAVE USER TO DB
  export async function saveUserToDB(user: {
      accountId: string;
      email: string;
      name: string;
      imageUrl: URL;
      username?: string;
    }) {
      try {
        const newUser = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          ID.unique(),
          user
        );
    
        return newUser;
      } catch (error) {
        console.log(error);
      }
    }
    
    // ============================== SIGN IN
    export async function signInAccount(user: { email: string; password: string }) {
      try {
        const session = await account.createEmailSession(user.email, user.password);
    
        return session;
      } catch (error) {
        console.log(error);
      }
    }
    
    // ============================== GET ACCOUNT
    export async function getAccount() {
      try {
        const currentAccount = await account.get();
    
        return currentAccount;
      } catch (error) {
        console.log(error);
      }
    }
    
    // ============================== GET USER
    export async function getCurrentUser() {
      try {
        
        const currentAccount = await getAccount();
    
        if (!currentAccount) throw Error;
    
        const currentUser = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          [Query.equal("accountId", currentAccount.$id)]
        );
    
        if (!currentUser) throw Error;
    
        return currentUser.documents[0];
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    
    // ============================== SIGN OUT
    export async function signOutAccount() {
      try {
        const session = await account.deleteSession("current");
        window.location.reload();
        return session;
      } catch (error) {
        console.log(error);
      }
    }
  

// ================================================================= KANBAN =================================================================
// ============================== GET TASKS

  export async function getTasks() {
    try {
      const currentTasks = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.taskCollectionId,
        [Query.select([ '$id', 'Task-ID', 'Title', 'Status', 'Priority', 'DueDate', 'Description', 'Assigned'])]
      );
  
      return currentTasks.documents;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return null;
    }
  }


  interface TaskData {
    'Title': string;
    'Status': string;
    'Priority': string;
    'Description': string;
    'DueDate': string;
    "Assigned": string;
}

export async function addTask(taskData: TaskData) {
    try {
        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.taskCollectionId,
            ID.unique(),
            taskData // Provide the task data to be added
        );

        console.log('Task added successfully:', response);
        return response;
    } catch (error) {
        console.error('Error adding task:', error);
        return null;
    }
}

export async function deleteTask(taskId: string) {
  try {
      // Delete the document using its ID
      const deleteResponse = await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.taskCollectionId,
          taskId // Provide the document ID of the task to be deleted
      );

      console.log('Task deleted successfully:', deleteResponse);
      return deleteResponse;
  } catch (error) {
      console.error('Error deleting task:', error);
      return null;
  }
}

export async function updateTask(taskId: string, updatedTaskData: Partial<TaskData>) {
  try {
    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.taskCollectionId,
      taskId,
      updatedTaskData // Provide the updated task data
    );

    console.log('Task updated successfully:', response);
    return response;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
}

export async function updateTaskStatus(taskId: string, updatedStatus: { 'Status': string }) {
  try {
      const response = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.taskCollectionId,
          taskId,
          updatedStatus
      );

      console.log('Task status updated successfully:', response);
      return response;
  } catch (error) {
      console.error('Error updating task status:', error);
      return null;
  }
}

  export async function getStages() {
    try {
      // Fetch task stages from Appwrite database
      const currentStages = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.stagesCollectionId,
        [
          Query.select(['id','title', '$createdAt'])
        
        ]
      );
      return currentStages.documents;
    } catch (error) {
      console.error('Error fetching task stages:', error);
      return null;
    }
  }

// ================================================================= EMPLOYEES DIRECTORY =================================================================

export async function getEmpData() {
  try {
    const currentEmps = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.employeesCollectionId,
      [Query.select([ '$id', 'EmpID', 'EmpName', 'JoinDate', 'Status', 'EmpPNumber', 'EmpEmail'])]
    );

    return currentEmps.documents;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return null;
  }
}

export async function getEmpNamesData() {
  try {
    const currentEmps = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.employeesCollectionId,
      [Query.select([ 'EmpName'])]
    );

    console.log(currentEmps.documents);
    return currentEmps.documents;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return null;
  }
}

export async function getEmpDetailedData(empID: string) {
  try {
    const empDetails = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.employeesCollectionId,
      [
        Query.select([
          '$id',
          'EmpID',
          'EmpName',
          'JoinDate',
          'Status',
          'EmpPNumber',
          'EmpEmail',
          'DOB',
          'CurrentPosition',
          'Education',
          'Address',
          'EmergencyContact',
          'PAN',
          'Aadhar',
          'Photo',
          'Resume'
        ]),
        Query.equal('EmpID', empID) // Use the empID parameter here
      ]
    );

    // Assuming there's only one employee with a given EmpID
    const empData = empDetails.documents[0];

    // You can handle cases where no employee is found with the given ID
    if (!empData) {
      throw new Error('Employee not found');
    }
    // console.log(empData);
    return empData;
  } catch (error) {
    console.error('Error fetching employee details:', error);
    toast("Employee ID not recognized.");
    return null;
  }
}


// interface EmpData {
//   'EmpID': string;
//   'EmpName': string;
//   'JoinDate': Date;
//   'Status': string;
//   'EmpPNumber': number;
//   'EmpEmail': string;
// }

// export async function addEmp(empData: EmpData) {
//   try {
//       const response = await databases.createDocument(
//           appwriteConfig.databaseId,
//           appwriteConfig.employeesCollectionId,
//           ID.unique(),
//           empData // Provide the task data to be added
//       );

//       console.log('Employee added successfully:', response);
//       return response;
//   } catch (error) {
//       console.error('Error adding employee:', error);
//       return null;
//   }
// }

interface EmpData {
  'EmpID': string;
  'EmpName': string;
  'JoinDate': Date;
  'Status': string;
  'EmpPNumber': string;
  'EmpEmail': string;
  'DOB': Date;
  'CurrentPosition': string;
  'Education': string;
  'Address': string;
  'EmergencyContact': string;
  'PAN'?: string; // Make these properties optional (?)
  'Aadhar'?: string;
  'Photo'?: string;
  'Resume'?: string;
}


export interface FileData {
  PAN: File | null;
  Aadhar: File | null;
  Photo: File | null;
  Resume: File | null;
}



// export async function addEmployee(empData: EmpData, fileData: FileData): Promise<any> {
//   try {
//     // Upload files and get their IDs
//     const panResponse = fileData.PAN ? await uploadEmpFile(fileData.PAN) : null;
//     const aadharResponse = fileData.Aadhar ? await uploadEmpFile(fileData.Aadhar) : null;
//     const photoResponse = fileData.Photo ? await uploadEmpFile(fileData.Photo) : null;
//     const resumeResponse = fileData.Resume ? await uploadEmpFile(fileData.Resume) : null;

//     // Extract IDs from responses
//     const panId = panResponse?.$id || '';
//     const aadharId = aadharResponse?.$id || '';
//     const photoId = photoResponse?.$id || '';
//     const resumeId = resumeResponse?.$id || '';

//     console.log('Pan ID:', panId);
//     console.log('Aadhar ID:', aadharId);
//     console.log('Photo ID:', photoId);
//     console.log('Resume ID:', resumeId);


//     // Assign file IDs to empData
//     empData.PAN = panId;
//     empData.Aadhar = aadharId;
//     empData.Photo = photoId;
//     empData.Resume = resumeId;


//     // Create employee document in the database
//     const response = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.employeesCollectionId,
//       ID.unique(),
//       empData // Use empData that now includes file IDs
//     );

//     console.log('Employee added successfully:', response);
//     return response;
//   } catch (error) {
//     console.error('Error adding employee:', error);
//     return null;
//   }
// }

export async function addEmployee(empData: EmpData, fileData: FileData): Promise<any> {
  try {
    // Upload files and get their IDs
    const panId = fileData.PAN ? await uploadEmpFile(fileData.PAN) : undefined;
    const aadharId = fileData.Aadhar ? await uploadEmpFile(fileData.Aadhar) : undefined;
    const photoId = fileData.Photo ? await uploadEmpFile(fileData.Photo) : undefined;
    const resumeId = fileData.Resume ? await uploadEmpFile(fileData.Resume) : undefined;

    console.log('Pan ID:', panId);
    console.log('Aadhar ID:', aadharId);
    console.log('Photo ID:', photoId);
    console.log('Resume ID:', resumeId);

    // Assign file IDs to empData
    empData.PAN = panId !== null ? panId : undefined;
    empData.Aadhar = aadharId !== null ? aadharId : undefined;
    empData.Photo = photoId !== null ? photoId : undefined;
    empData.Resume = resumeId !== null ? resumeId : undefined;

    // Create employee document in the database
    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.employeesCollectionId,
      ID.unique(),
      empData // Use empData that now includes file IDs
    );

    console.log('Employee added successfully:', response);
    return response;
  } catch (error) {
    console.error('Error adding employee:', error);
    return null;
  }
}



export async function deleteEmp(empId: string) {
  try {
      // Delete the document using its ID
      const deleteResponse = await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.employeesCollectionId,
          empId // Provide the document ID of the task to be deleted
      );

      console.log('Employee deleted successfully:', deleteResponse);
      return deleteResponse;
  } catch (error) {
      console.error('Error deleting employee:', error);
      return null;
  }
}

export async function uploadEmpFile(file: File): Promise<string | null> {
  try {
    const response = await storage.createFile(
      appwriteConfig.storageId, 
      ID.unique(), 
      file,
    );
    const fileId = response?.$id || null; // Extract only the $id property
    console.log('File uploaded successfully. ID:', fileId);
    return fileId;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}


export const downloadEmpFile = async (fileId: string) => {
  try {
    const response = storage.getFileView(appwriteConfig.storageId, fileId);
    if (response) {
      return response; // Return the URL instead of opening it in a new tab
    } else {
      console.error('Failed to get download URL');
      return null;
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};