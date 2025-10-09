import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  Timestamp,
  orderBy,
  limit,
  startAfter,
  query,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { storage } from '../services/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

///Função para fazer upload da imagem do gato para o Firebase Storage
export async function uploadGatoImage(fotoFile) {
  if (!fotoFile) {
    throw new Error('Nenhum arquivo fornecido para upload.');
  }
  const storageRef = ref(storage, `gatos/${uuidv4()}_${fotoFile.name}`);
  try {
    await uploadBytes(storageRef, fotoFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}
/// Função para criar um novo gato no Firestore
export async function createGato(gatoData) {
  const camposObrigatorios = ['nome', 'nascimento', 'descricao', 'fotoFile'];
  for (const campo of camposObrigatorios) {
    if (!gatoData[campo]) {
      throw new Error(`Campo obrigatório faltando: ${campo}`);
    }
  }

  const nascimentoDate =
    gatoData.nascimento instanceof Date
      ? gatoData.nascimento
      : new Date(gatoData.nascimento);

  const fotoURL = await uploadGatoImage(gatoData.fotoFile);

  const gato = {
    castrado: false,
    disponivelAdocao: true,
    disponivelLarTemporario: false,
    possuiFievFelv: false,
    ...gatoData,
    nascimento: Timestamp.fromDate(nascimentoDate),
    foto: fotoURL,
  };

  delete gato.fotoFile;

  try {
    const gatosCollection = collection(db, 'gatos');
    const docRef = await addDoc(gatosCollection, gato);
    return { id: docRef.id, ...gato };
  } catch (error) {
    console.error('Erro ao criar gato:', error);
    throw error;
  }
}

/// Função para buscar um gato pelo ID
export async function getGatoById(id) {
  try {
    const docRef = doc(db, 'gatos', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar gato por ID:', error);
    throw error;
  }
}

/// Função para buscar gatos com paginação
export async function getGatosFirstPage() {
  try {
    const gatosCollection = collection(db, 'gatos');
    const q = query(gatosCollection, orderBy('nascimento', 'desc'), limit(10));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return { gatos: [], lastDoc: null };
    }
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const gatos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { gatos, lastDoc };
  } catch (error) {
    console.error('Erro ao buscar gatos:', error);
    throw error;
  }
}

export async function getGatosNextPage(lastDoc) {
  try {
    if (!lastDoc) {
      return { gatos: [], lastDoc: null };
    }

    const gatosCollection = collection(db, 'gatos');
    const q = query(
      gatosCollection,
      orderBy('nascimento', 'desc'),
      startAfter(lastDoc),
      limit(10),
    );

    const snapshot = await getDocs(q);
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    const gatos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { gatos, lastDoc: newLastDoc };
  } catch (error) {
    console.error('Erro ao buscar gatos:', error);
    throw error;
  }
}

/// Função para buscar todos os gatos (sem paginação)
export async function getAllGatos() {
  try {
    const gatosCollection = collection(db, 'gatos');
    //const q = query(gatosCollection, orderBy("nascimento", "desc"));
    const snapshot = await getDocs(gatosCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erro ao buscar todos os gatos:', error);
    throw error;
  }
}

/// Função para deletar um gato pelo ID
export async function deleteGato(id) {
  try {
    if (!id) {
      throw new Error('ID do gato invalido.');
    }
    const docRef = doc(db, 'gatos', id);
    await deleteDoc(docRef);
    return { message: 'Gato deletado com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar gato:', error);
    throw error;
  }
}

/// Função para atualizar os dados de um gato pelo ID
export async function updateGato(id, gatoData) {
  if (!id) {
    throw new Error('ID do gato inválido.');
  }
  if (!gatoData || Object.keys(gatoData).length === 0) {
    throw new Error('Nenhum dado fornecido para atualização.');
  }

  try {
    const docRef = doc(db, 'gatos', id);
    if (!docRef) {
      throw new Error('Referência do documento inválida.');
    }
    if (gatoData.fotoFile) {
      const gatoSnapshot = await getDoc(docRef);
      const oldData = gatoSnapshot.data();
      const oldFotoURL = oldData ? oldData.fotoURL : null;

      const newFotoURL = await uploadGatoImage(gatoData.fotoFile);
      gatoData.fotoURL = newFotoURL;
      delete gatoData.fotoFile;

      if (oldFotoURL && oldFotoURL !== newFotoURL) {
        try {
          const oldFotoRef = ref(storage, oldFotoURL);
          await oldFotoRef.delete();
        } catch (warning) {
          console.warn('Erro ao deletar a imagem antiga:', warning);
        }
      }
    } else {
      delete gatoData.fotoURL;
      delete gatoData.fotoFile;
    }
    if (gatoData.nascimento) {
      gatoData.nascimento =
        gatoData.nascimento instanceof Date
          ? Timestamp.fromDate(gatoData.nascimento)
          : gatoData.nascimento;
    }
    await updateDoc(docRef, gatoData);
    const updatedSnapshot = await getDoc(docRef);
    return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
  } catch (error) {
    console.error('Erro ao atualizar gato:', error);
    throw error;
  }
}
