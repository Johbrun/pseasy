export interface UserCreation {
    id: string;
    ip: string;
    userAgent: string;
}

export interface User {
    id: string;
    ip: string;
    userAgent: string;
    name: string;
}

export interface UsernameUpdate {
    name: string;
}

export interface UserScore {
    name: string;
    score: number;
}
