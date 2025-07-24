import { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, getCurrentUser, register } from './authApi';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const signIn = async (credentials) => {
        const userData = await login(credentials);
        setUser(userData);
    };

    const signUp = async (userData) => {
        await register(userData);
        const loggedInUser = await login({
            username: userData.username,
            password: userData.password
        });
        setUser(loggedInUser);
    };

    const signOut = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);