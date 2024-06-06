import { ID, Query } from 'appwrite';

import { INewUser } from "../../types/index";
import { account, appwriteConfig, avatars, databases, storage} from './config';
import { toast } from 'sonner';



// ================================================================= AUTHENTICATION =================================================================
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
            taskData
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
      console.log(taskId);
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

    // console.log(currentEmps.documents);
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

// ================================================================= ASSETS DIRECTORY =================================================================
export async function getAssetsData() {
  try {
    const currentAssets = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.assetsCollectionId,
      [Query.select([ '$id', 'AssetsID', 'AssetsName', 'AssetsStatus', 'AssetsType', 'AssetsRemarks', 'AssetsValue', 'AllocatedTo'])]
    );

    console.log(currentAssets.documents);
    return currentAssets.documents;
  } catch (error) {
    console.error('Error fetching assets:', error);
    return null;
  }
}

interface AssetData {
  'AssetsID': string; 
  'AssetsName': string;
  'AssetsStatus': string;
  'AssetsType': string;
  'AssetsValue': string;
  'AllocatedTo': string;
}

export async function addAsset(assetData: AssetData) {
  try {
      const response = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.assetsCollectionId,
          ID.unique(),
          assetData
      );

      console.log('Asset added successfully:', response);
      return response;
  } catch (error) {
      console.error('Error adding asset:', error);
      return null;
  }
}

export async function deleteAsset(assetId: string) {
  try {
      // Delete the document using its ID
      const deleteResponse = await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.assetsCollectionId,
          assetId // Provide the document ID of the task to be deleted
      );

      console.log('Asset deleted successfully:', deleteResponse);
      return deleteResponse;
  } catch (error) {
      console.error('Error deleting asset:', error);
      return null;
  }
}
// Define the type for updated data
interface UpdatedAssetData {
  AssetsStatus: string;
  AssetsRemarks?: string;
  AssetsValue?: string;
}

// Update the function with proper type annotations
export async function updateAssetData(assetId: string, updatedData: UpdatedAssetData) {
  console.log('Updating asset with ID:', assetId); // Add this line
  console.log('Updated data:', updatedData); // Add this line
  try {
    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.assetsCollectionId,
      assetId, // Dynamic asset ID
      updatedData
    );

    console.log('Asset data updated successfully:', response);
    return response;
  } catch (error) {
    console.error('Error updating asset data:', error);
    return null;
  }
}

// ================================================================= FILE STORAGE =================================================================

// export interface CloudStorageData {
//   // Define properties for files in your cloud storage system
//   // For example:
//   File1: File | null;
//   File2: File | null;
//   // Add more properties as needed
// }



export async function uploadToCloudStorageDB(file: File, fileName: string): Promise<string | null> {
  try {
    // Upload the file to your cloud storage system
    const response = await storage.createFile(
      appwriteConfig.fileStorageId, 
      ID.unique(), 
      file,
    );

    const fileId = response?.$id || null; // Extract only the $id property

    // Update the file name in the cloud storage system
    if (fileId !== null) {
      await storage.updateFile(
        appwriteConfig.fileStorageId, 
        fileId, 
        fileName
      );
    }

    console.log('File uploaded and name updated successfully:', fileId);
    return fileId;
  } catch (error) {
    console.error('Error uploading file and updating name:', error);
    return null;
  }
}

export async function listFilesInCloud(): Promise<Array<{ $id: string; name: string }> | null> {
  try {
    const response = await storage.listFiles(appwriteConfig.fileStorageId);
    const files = response.files.map(({ $id, name }) => ({ $id, name }));
    console.log('Files in the bucket:', files);
    return files;
  } catch (error) {
    console.error('Error listing files in the bucket:', error);
    return null;
  }
}

  export async function handleCloudDelete(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.fileStorageId, fileId);
      console.log('File deleted successfully.');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  export async function downloadFileFromCloud(fileId: string) {
    try {
      // Fetch the file data
      const response = await fetch(`https://cloud.appwrite.io/v1/storage/files/${fileId}/view?project=workforcesync&mode=admin`);
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
  
      // Extract the file name from the response headers
      const disposition = response.headers.get('Content-Disposition');
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = fileNameRegex.exec(disposition || '');
      const fileName = (matches && matches[1]) || 'download';
  
      // Convert the response to a blob
      const blob = await response.blob();
  
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
  
      // Programmatically trigger the download
      document.body.appendChild(a);
      a.click();
  
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
  
      console.log('File downloaded successfully.');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  
  export async function renameFileInCloud(fileId: string, newName: string): Promise<void> {
    try {
      // Update the file name in the cloud storage system
      await storage.updateFile(
        appwriteConfig.fileStorageId, 
        fileId, 
        newName
      );
      console.log('File name updated successfully:', fileId);
    } catch (error) {
      console.error('Error updating file name:', error);
      throw new Error('Error updating file name');
    }
  }

  export async function getPreviewInCloud() {
    try {
      // Update the file name in the cloud storage system
      // await storage.getFilePreview(
      //   appwriteConfig.fileStorageId, 
      //   fileId, 
      // );

      const result = storage.getFilePreview(
        appwriteConfig.fileStorageId, // bucketId
        '66593c41a16e8ac4413a', // fileId

    );
    
    console.log(result);
    } catch (error) {
      console.error('Error updating file name:', error);
      throw new Error('Error updating file name');
    }
  }

