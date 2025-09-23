import auth from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export async function signIn(email, password) {
    let response = new Object()
    await signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
        response.id = credentials.user.uid;
        response.email = email;
    }) 
    .catch((error) => {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    })
    return response
}