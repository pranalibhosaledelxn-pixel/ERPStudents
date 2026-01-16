export interface User {
    id: string;
    name: string;
    role: 'student' | 'parent'; // Single role app but good to have type
    class: string;
    division: string;
    rollNumber: string;
    photoUrl?: string; // URL for student photo
    parentName: string;
    mobile: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface LoginResponse {
    user: User;
    token: string;
}
