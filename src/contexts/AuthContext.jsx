import { createContext, useState } from "react";
import { resetPasswordUser, signInUser, signOutUser, signUpUser } from '../services/authServices'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    async function signIn(userData) {
        setLoading(true)
        const response = await signInUser(userData)

        if (response?.user) {
            setUser(response.user)
        } 

        setLoading(false)
        return response
    }

    async function signOut() {
        setLoading(true);
        const response = await signOutUser()

        if (!response?.error) {
            setUser(null)
        }
        
        setLoading(false)
        return response;
    }

    async function signUp(userData) {
        setLoading(true)
        const response = await signUpUser(userData)

        if (response?.user) {
            setUser(response.user)
        } 

        setLoading(false)
        return response
    }

    async function resetPassword(userData) {
        setLoading(true)
        const response = await resetPasswordUser(userData) 
        
        setLoading(false)
        return response
    }

    const value = {
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        signUp,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}