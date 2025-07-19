import { createContext, useContext, useState } from "react";



export type User = {
    id: string;
    email: string;
};

type AuthContextType = {
    user: User| null;
    token: string| null;
    login: (token: string, user: User)=> void;
    logout: ()=>void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [user, setUser]= useState<User| null>(null);
    const [token, setToken] = useState<string| null>(null);

    const login = (token: string, user: User)=>{
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    const logout = ()=>{
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>

    )
}
export const useAuth=()=>{
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside AuthProvider")
        return ctx
}