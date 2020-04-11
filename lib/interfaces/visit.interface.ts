import { UserCreation } from "./user.interface";

export interface VisitCreation {
    url: string;
    date: Date;
    idUser: string;
}

export interface VisitUserCreation {
    url: string;
    ip: string;
    userAgent: string;
}