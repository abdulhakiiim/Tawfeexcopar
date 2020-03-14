export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    nomComplet: string;
    isActive: boolean;
    role: string;
    roles: string;
    token: string;
}