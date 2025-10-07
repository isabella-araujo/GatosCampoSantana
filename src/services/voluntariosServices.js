import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function createVoluntario(voluntario) {
    let response = new Object() 
    try {
        const docRef = await addDoc(collection(db, 'voluntarios'), voluntario)

        response.voluntarioId = docRef.id
    } catch(error) {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    }

    return response
}

export async function getVoluntarios() {
    let response = new Object() 
    try {
        const querySnapshot = await getDocs(collection(db, 'voluntarios'))
        const listaVoluntarios = querySnapshot.docs.map((doc) =>  ({ ...doc.data(), id: doc.id }))
        response.voluntarios = listaVoluntarios
    } catch(error) {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    }

    return response
}

export async function getVoluntarioById(id) {
    let response = new Object()
    try {
        const docSnap = await getDoc(doc(db, 'voluntarios', id))
        if(docSnap.exists()) {
            response.voluntario = { ...docSnap.data(), id: docSnap.id }
        }
    } catch(error) {
        console.log(`${error.code} = ${error.message}`)
        response.error = error.message
    }

    return response
}

export async function deleteVoluntario(id) {
    let response = new Object()
    try {
        await deleteDoc(doc(db, 'voluntarios', id))
    } catch(error) {
        response.error = error.message
    }
    
    return response
}