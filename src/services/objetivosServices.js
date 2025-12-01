import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

export async function getObjetivos() {
  try {
    const objetivosCol = collection(db, 'objetivos');
    const snapshot = await getDocs(objetivosCol);
    const objetivos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { objetivos, error: null };
  } catch (error) {
    console.error(`Error: ${error}`);
    return { objetivos: [], error };
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
    toast.error(`Erro ao buscar objetivo: ${error}`);
    throw error;
  }
}

export async function updateObjetivo(objetivo) {
  try {
    const docRef = doc(db, 'objetivos', objetivo.id);

    await updateDoc(docRef, {
      titulo: objetivo.titulo,
      descricao: objetivo.descricao,
    });
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    toast.error(`Erro ao atualizar objetivo: ${error}`);
    throw error;
  }
}
