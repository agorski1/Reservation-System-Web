import {createContext, useState, useContext} from "react";
import type {ReactNode} from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(null);

    const setToken = (token: string | null) => {
        setTokenState(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        setTokenState(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{token, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error(
        "useAuth must be used within the AuthProvider");
    return context;
}