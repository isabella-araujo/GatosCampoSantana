import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  writeBatch,
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
    toast.error(`Error: ${error}`);
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

export async function updateObjetivos(objetivos) {
  try {
    console.log('Objetivos recebidos para update:', objetivos);

    const batch = writeBatch(db);

    objetivos.forEach((objetivo) => {
      console.log('Atualizando objetivo:', objetivo);

      const docRef = doc(db, 'objetivos', objetivo.id);
      batch.update(docRef, {
        titulo: objetivo.titulo,
        descricao: objetivo.descricao,
      });
    });

    const result = await batch.commit();
    console.log('Batch commit result:', result);
  } catch (error) {
    console.error('Erro ao atualizar:', error);
    toast.error(`Erro ao atualizar objetivos: ${error}`);
    throw error;
  }
}
