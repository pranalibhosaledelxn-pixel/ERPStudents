import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { authService } from '../services/api';

interface AuthContextType extends AuthState {
    login: (mobile: string, otp: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: false, // Set to true if checking async storage on load
        isAuthenticated: false,
    });

    const login = async (mobile: string, otp: string) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await authService.login(mobile, otp);
            setState({
                user: response.user,
                token: response.token,
                isLoading: false,
                isAuthenticated: true,
            });
            // TODO: Save token to SecureStore here
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw error;
        }
    };

    const logout = async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            await authService.logout();
            setState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
            });
            // TODO: Clear token from SecureStore here
        } catch (error) {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
