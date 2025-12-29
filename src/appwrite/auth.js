import {Client,Account,ID} from appwrite;
import config from '../config/config';

class AuthService {
    client =new Client();
    account;

    constructor() {
        this.client.setEndpoint(config.appwrite.url).setProject(config.appwrite.projectId);
        this.account = new Account(this.client);
    }
        //signup method
        async signUp (email, password, name){
            try {
                const UserAccount = await this.account.create(ID.unique(),email,password,name);
                if(UserAccount){
                    return this.login(email,password);
                }
                else{
                return UserAccount;
                }
            } catch (error) {
                console.error("Error during signup:", error);
                throw error;
            }
        }
        //login method
        async login(email,password){
            try {
                const UserAccount = await this.account.createEmailSession(email,password);
                return UserAccount;
            }catch (error) {
                console.error("Error during login:", error);
                throw error;
            }
        }
        async getCurrentUser(){
            try {
                const UserAccount = await this.account.get();
                return UserAccount;
            } catch (error) {
                console.error("Error fetching current user:", error);
                throw error;
            }
        }
        async logout(){
            try {
                await this.account.deleteSession('current');
            }
            catch (error) {
                console.error("Error during logout:", error);
                throw error;
            }
        }    
}
const AuthService = new AuthService();
export default AuthService;