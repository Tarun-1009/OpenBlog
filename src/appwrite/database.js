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
}
const DatabaseService = new Service();
export default DatabaseService;