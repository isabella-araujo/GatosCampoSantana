import { db } from '../services/firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  Timestamp,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { storage } from '../services/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

///Função para fazer upload da imagem da logo para o Firebase Storage
export async function uploadParceiroLogo(logoFile) {
  if (!logoFile) {
    throw new Error('Nenhum arquivo fornecido para upload.');
  }
  const storageRef = ref(storage, `parceiros/${uuidv4()}_${logoFile.name}`);
  try {
    await uploadBytes(storageRef, logoFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}
/// Função para criar um novo parceiro no Firestore
export async function createParceiro(parceiroData) {
  const camposObrigatorios = ['nome', 'logoFile'];
  for (const campo of camposObrigatorios) {
    if (!parceiroData[campo]) {
      throw new Error(`Campo obrigatório faltando: ${campo}`);
    }
  }
  const logoURL = await uploadParceiroLogo(parceiroData.logoFile);
  const parceiro = {
    ...parceiroData,
    logo: logoURL,
  };
  delete parceiro.logoFile;

  try {
    const parceirosCollection = collection(db, 'parceiros');
    const docRef = await addDoc(parceirosCollection, parceiro);
    return { id: docRef.id, ...parceiro };
  } catch (error) {
    console.error('Erro ao criar parceiro:', error);
    throw error;
  }
}

/// Função para buscar todos os parceiros no Firestore
export async function getParceiros() {
  try {
    const snapshot = await getDocs(collection(db, 'parceiros'));
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        descricao: data.descricao || 'sem descrição',
        site: data.site || 'nenhum site informado',
        ...data,
      };
    });
  } catch (error) {
    console.error('Error fetching parceiros:', error);
    throw error;
  }
}

/// Função para buscar um parceiro pelo ID
export async function getParceiroById(id) {
  try {
    const docRef = doc(db, 'parceiros', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar parceiro por ID:', error);
    throw error;
  }
}
/// Função para atualizar um parceiro existente
export async function updateParceiro(id, parceiroData) {
  if (!id) {
    throw new Error('ID do parceiro invalido.');
  }
  if (!parceiroData || Object.keys(parceiroData).length === 0) {
    throw new Error('Nenhum dado fornecido para atualização.');
  }
  try {
    const docRef = doc(db, 'parceiros', id);
    if (parceiroData.logoFile) {
      const logoSnapshot = await getDoc(docRef);
      const oldData = logoSnapshot.data();
      const oldLogoURL = oldData ? oldData.logoURL : null;

      const newLogoURL = await uploadParceiroLogo(parceiroData.logoFile);
      parceiroData.logoURL = newLogoURL;
      delete parceiroData.logoFile;

      if (oldLogoURL && oldLogoURL !== newLogoURL) {
        try {
          const oldLogoRef = ref(storage, oldLogoURL);
          await deleteDoc(oldLogoRef);
        } catch (warning) {
          console.warn('Erro ao deletar a logo antiga:', warning);
        }
      }
    } else {
      delete parceiroData.logoURL;
      delete parceiroData.logoFile;
    }
    await updateDoc(docRef, parceiroData);
    console.log('Parceiro atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar parceiro:', error);
    throw error;
  }
}

/// Função para deletar um parceiro existente
export async function deleteParceiro(id) {
  try {
    if (!id) {
      throw new Error('ID do parceiro invalido.');
    }
    const docRef = doc(db, 'parceiros', id);
    await deleteDoc(docRef);
    console.log('Parceiro deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar parceiro:', error);
    throw error;
  }
}
