import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../services/firebase"

export async function signInUser(userData) {
    let response = new Object()
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((credentials) => {
        response.user = {
            id: credentials.user.uid,
            email: userData.email
        }
    })
    .catch((error) => {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    })
    return response
}

export async function signOutUser() {
    let response = new Object()
    try {
        await signOut(auth)
    } catch (error) {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    }
    return response
}

export async function signUpUser(userData) {
    let response = new Object()
    await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    .then((credentials) => {
        response.user = {
            id: credentials.user.id,
            email: credentials.user.email
        }
    })
    .catch((error) => {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    })
    return response
}

export async function resetPasswordUser(userData) {
    let response = new Object()
    try {
        await sendPasswordResetEmail(auth, userData.email)
    } catch (error) {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    }
    return response
}