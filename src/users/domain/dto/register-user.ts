export interface UserDto {
    name: string;
    email: string;
    password: string; 
    password_hash: string;
    createdAt: Date;
}