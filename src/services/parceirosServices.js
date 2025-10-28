import { db } from '../config/firebase.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { storage } from '../config/firebase.js';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

///Função para fazer upload da imagem da logo para o Firebase Storage
export async function uploadParceiroLogo(logoFile) {
  if (!logoFile) {
    throw new Error('Nenhum arquivo fornecido para upload.');
  }
  const logoPath = `parceiros/${uuidv4()}_${logoFile.name}`;
  const storageRef = ref(storage, logoPath);

  try {
    await uploadBytes(storageRef, logoFile);
    const downloadURL = await getDownloadURL(storageRef);
    return {
      logoURL: downloadURL,
      logoPath,
    };
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

  try {
    const { logoURL, logoPath } = await uploadParceiroLogo(
      parceiroData.logoFile,
    );
    const parceiro = {
      ...parceiroData,
      logoURL,
      logoPath,
      ativo: true,
      createdAt: serverTimestamp(),
    };
    delete parceiro.logoFile;
    delete parceiro.logo;

    const parceirosCollection = collection(db, 'parceiros');
    const docRef = await addDoc(parceirosCollection, parceiro);

    return {
      id: docRef.id,
      ...parceiro,
    };
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
        ...data,
        descricao: data.descricao || 'sem descrição',
        site: data.site || 'nenhum site informado',
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
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
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
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
  if (!id) throw new Error('ID do parceiro inválido');
  if (!parceiroData || Object.keys(parceiroData).length === 0)
    throw new Error('Nenhum dado fornecido');

  const docRef = doc(db, 'parceiros', id);
  const docSnap = await getDoc(docRef);
  const oldData = docSnap.exists() ? docSnap.data() : {};

  delete parceiroData.logo;
  const newLogoFile = parceiroData.logoFile;
  delete parceiroData.logoFile;

  if (newLogoFile) {
    const { logoURL, logoPath } = await uploadParceiroLogo(newLogoFile);

    parceiroData.logoURL = logoURL;
    parceiroData.logoPath = logoPath;

    if (oldData.logoPath && oldData.logoPath !== logoPath) {
      const oldLogoRef = ref(storage, oldData.logoPath);
      try {
        await deleteObject(oldLogoRef);
        console.log('Logo antiga deletada com sucesso');
      } catch (error) {
        console.warn('Erro ao deletar logo antiga:', error);
      }
    }
  }
  await updateDoc(docRef, parceiroData);

  return { id, ...oldData, ...parceiroData };
}

//Função para atualizar o status ativo/inativo de um parceiro
export async function toggleParceiroStatus(id, currentStatus) {
  if (!id) {
    throw new Error('ID do parceiro inválido.');
  }
  try {
    const docRef = doc(db, 'parceiros', id);
    const novoStatus = !currentStatus;
    await updateDoc(docRef, { ativo: novoStatus });
    return novoStatus;
  } catch (error) {
    console.error('Erro ao atualizar status do parceiro:', error);
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
