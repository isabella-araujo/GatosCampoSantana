import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export async function createVoluntario(voluntario) {
  let response = {};
  try {
    const docRef = await addDoc(collection(db, 'voluntarios'), {
      ...voluntario,
      role: 'volunteer',
      disabled: false,
      createdAt: serverTimestamp(),
    });
    response.voluntarioId = docRef.id;
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }
  return response;
}

export async function getVoluntarios() {
  let response = new Object();
  try {
    const querySnapshot = await getDocs(collection(db, 'voluntarios'));
    const listaVoluntarios = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    response.voluntarios = listaVoluntarios;
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}

export async function getVoluntarioById(id) {
  let response = new Object();
  try {
    const docSnap = await getDoc(doc(db, 'voluntarios', id));
    if (docSnap.exists()) {
      response.voluntario = { ...docSnap.data(), id: docSnap.id };
    }
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}
/*
export async function deleteVoluntario(id) {
  let response = new Object();
  try {
    await deleteDoc(doc(db, 'voluntarios', id));
  } catch (error) {
    response.error = error.message;
  }

  return response;
}*/

export async function disableVoluntario(id, disabled) {
  let response = {};
  try {
    const voluntarioRef = doc(db, 'voluntarios', id);
    await updateDoc(voluntarioRef, { disabled });
  } catch (error) {
    response.error = error.message;
  }
  return response;
}
