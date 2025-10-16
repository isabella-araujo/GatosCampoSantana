import { createContext, useState } from "react";
import { resetPasswordUser, signInUser, signOutUser, signUpUser } from '../services/authServices'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    async function signIn(userData) {
        setLoading(true)

        const response = await signInUser(userData)

        if(response.user) {
            setUser(response.user)
        } else {
            setError(response.error)
        }

        setLoading(false)
    }

    async function signOut() {
        setLoading(true)

        const response = signOutUser()

        if(response.error) {
            setError(response.error)
        } else {
            setUser(null)
        }

        setLoading(false)
    }

    async function signUp(userData) {
        setLoading(true)

        const response = await signUpUser(userData)

        if(response.user) {
            setUser(response.user)
        } else {
            setError(response.error)
        }

        setLoading(false)
    }

    async function resetPassword(userData) {
        setLoading(true)

        const response = resetPasswordUser(userData)

        if(response.error) {
            setError(response.error)
        }

        setLoading(false)
    }

    const value = {
        signed: !!user,
        user,
        error,
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