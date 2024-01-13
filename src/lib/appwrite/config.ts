import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: 'workforcesync',
    databaseId: '6575f964db73b0afb32a',
    storageId: '6575f926b7b200ae00eb',
    usersCollectionId: '6575fa865c309f9887d4',
    employeesCollectionId: '6575fa094e8538298b8b'
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
