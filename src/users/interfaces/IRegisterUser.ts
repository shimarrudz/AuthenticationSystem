export interface IRegisterUser {
    id: string;
    name: string;
    email: string;
    password: string; 
    password_hash: string;
    createdAt: Date;
}