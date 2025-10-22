import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export async function createEndereco(endereco) {
  let response = new Object();
  try {
    const docRef = await addDoc(collection(db, 'enderecos'), {
      ...endereco,
      createAt: serverTimestamp(),
    });
    response.enderecoId = docRef.id;
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}

export async function getEnderecos() {
  let response = new Object();
  try {
    const querySnapshot = await getDocs(collection(db, 'enderecos'));
    const listaEnderecos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    response.enderecos = listaEnderecos;
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}

export async function getEnderecoById(id) {
  let response = new Object();
  try {
    const docSnap = await getDoc(doc(db, 'enderecos', id));
    if (docSnap.exists()) {
      response.endereco = { ...docSnap.data(), id: docSnap.id };
    }
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}

export async function updateEndereco(id, endereco) {
  let response = new Object();
  try {
    await setDoc(doc(db, 'enderecos', id), endereco);
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}

export async function deleteEndereco(id) {
  let response = new Object();
  try {
    await deleteDoc(doc(db, 'enderecos', id));
  } catch (error) {
    console.log(`${error.code} = ${error.message}`);
    response.error = error.message;
  }

  return response;
}
