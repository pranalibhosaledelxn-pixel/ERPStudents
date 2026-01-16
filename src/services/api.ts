import axios from 'axios';
import { LoginResponse, User } from '../types';

// Create axios instance
const api = axios.create({
    baseURL: 'https://api.example.com/v1', // Placeholder
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock Data for Demo
const MOCK_USER: User = {
    id: 'STU12345',
    name: 'Aarav Patel',
    role: 'student',
    class: 'Sr. KG',
    division: 'A',
    rollNumber: '12',
    photoUrl: 'https://cdn-icons-png.flaticon.com/512/201/201634.png', // Kid cartoon avatar
    parentName: 'Rajesh Patel',
    mobile: '9876543210',
};

// Mock API calls
export const authService = {
    login: async (mobile: string, otp: string): Promise<LoginResponse> => {
        // Simulate API delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (otp === '1234') { // Mock OTP
                    resolve({
                        user: MOCK_USER,
                        token: 'mock-jwt-token-xyz-123',
                    });
                } else {
                    reject(new Error('Invalid OTP'));
                }
            }, 1000);
        });
    },

    logout: async (): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, 500));
    }
};

export default api;
