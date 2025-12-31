import {appwrite} from '../config/config';
import { Client, Databases,Storeage,ID, Query } from "appwrite";

class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(appwrite.url).setProject(appwrite.projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storeage(this.client);
    }    

    async createPost(slug,title,body,authorId,status,images){
        try {
            return await this.databases.createDocument(
                appwrite.databaseId,
                appwrite.collectionId,
                slug,
                {
                    title,
                    body,
                    authorId,
                    publicationDate: new Date(),
                    status,
                    views:0,
                    images,
                }
            )
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }
    async updatePost(slug,{title,body,status,images}){
        try{
            return await this.databases.updateDocument(
                appwrite.databaseId,
                appwrite.collectionId,
                slug,
                {
                   title,
                   body,
                   status,
                   images,
                }
            )
        }catch(error){
            console.error("Error updating post:", error);
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                appwrite.databaseId,
                appwrite.collectionId,
                slug
            )
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }
    async getPosts(queries = [Query.equal("status","published")]){
        try{
            return await this.databases.listDocuments(
                appwrite.databaseId,
                appwrite.collectionId,
                queries,
            )
        }catch(error){
            console.error("Error fetching posts:", error);
            return false;
        }
    }

    // --- File Upload Services (Storage) ---

    // 6. Upload File
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    // 7. Delete File
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    // 8. Get File Preview (Fast, returns URL string, not a promise)
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const DatabaseService = new Service();
export default DatabaseService;