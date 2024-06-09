import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: 'workforcesync',
    databaseId: '6575f964db73b0afb32a',
    storageId: '663ff4980007cec51b30',
    fileStorageId:'6658db9e0036b652391f',
    usersCollectionId: '6575fa865c309f9887d4',
    employeesCollectionId: '6575fa094e8538298b8b',
    tasksCollectionId: '661dafa7462c9d56a6c9',
    stagesCollectionId: '661e019baa96dfb7e1bc',
    taskCollectionId: '663bc14600275874e494',
    assetsCollectionId: '664fbe140015188c61c2',
    attendanceCollectionId: '666525ac0013f8fe360a',
    filesCollectionId: '6658db070035c6480b36',
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
