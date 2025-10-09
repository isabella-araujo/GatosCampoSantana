import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

export async function getObjetivos() {
  try {
    const objetivos = [];
    const snapshot = await getDocs(collection(db, 'objetivos'));
    snapshot.forEach((doc) => {
      objetivos.push({ id: doc.id, ...doc.data() });
    });
    return objetivos;
  } catch (error) {
    console.error('Error fetching objetivos:', error);
    throw error;
  }
}

export async function getObjetivoById(id) {
  try {
    const docRef = doc(db, 'objetivos', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error('Objetivo not found');
    }
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error('Erro ao buscar objetivo:', error);
    throw error;
  }
}

export async function updateObjetivo(id, objetivoData) {
  try {
    const docRef = doc(db, 'objetivos', id);
    await updateDoc(docRef, objetivoData);
    console.log('Objetivo atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar objetivo:', error);
    throw error;
  }
}
