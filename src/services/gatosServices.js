import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  Timestamp,
  query,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { storage } from '../config/firebase.js';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { slugify } from '../utils/slug.js';

export async function uploadGatoImage(fotoFile) {
  if (!fotoFile) throw new Error('Nenhum arquivo fornecido para upload.');

  const fotoPath = `gatos/${uuidv4()}_${fotoFile.name}`;
  const storageRef = ref(storage, fotoPath);

  try {
    await uploadBytes(storageRef, fotoFile);
    const downloadURL = await getDownloadURL(storageRef);
    return { fotoURL: downloadURL, fotoPath };
  } catch (error) {
    toast.error(`Erro ao fazer upload da imagem: ${error}`);
    throw error;
  }
}

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

  const { fotoURL, fotoPath } = await uploadGatoImage(gatoData.fotoFile);
  const { slug, slugBase } = await slugify(gatoData.nome);

  const gatosCollection = collection(db, 'gatos');
  const docRef = await addDoc(gatosCollection, {});
  const id = docRef.id;

  const gato = {
    id,
    castrado: false,
    disponivelAdocao: true,
    disponivelLarTemporario: false,
    possuiFievFelv: false,
    genero: 'não informado',
    ...gatoData,
    nascimento: Timestamp.fromDate(nascimentoDate),
    slug,
    slugBase,
    fotoURL,
    fotoPath,
    createdAt: serverTimestamp(),
  };

  delete gato.fotoFile;
  await updateDoc(docRef, gato);

  return gato;
}

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
    toast.error(`Erro ao buscar gato por ID: ${error}`);
    throw error;
  }
}

export async function getGatoBySlug(slug) {
  try {
    const gatosCollection = collection(db, 'gatos');
    const q = query(gatosCollection, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar gato por slug: ${error}`);
    throw error;
  }
}

export async function getAllGatos() {
  try {
    const gatosCollection = collection(db, 'gatos');
    const snapshot = await getDocs(gatosCollection);

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        nascimento: data.nascimento?.toDate
          ? data.nascimento.toDate()
          : data.nascimento,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : data.createdAt,
      };
    });
  } catch (error) {
    console.error(`Erro ao buscar todos os gatos: ${error}`);
    throw error;
  }
}

export async function deleteGato(id) {
  try {
    if (!id) {
      throw new Error('ID do gato inválido.');
    }
    const docRef = doc(db, 'gatos', id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Gato não encontrado.');
    }
    const data = snapshot.data();

    if (data.fotoPath) {
      try {
        const storageRef = ref(storage, data.fotoPath);
        await deleteObject(storageRef);
      } catch (warning) {
        toast.warn(`Falha ao deletar imagem: ${warning}`);
      }
    }
    await deleteDoc(docRef);

    return { message: 'Gato deletado com sucesso' };
  } catch (error) {
    toast.error(`Erro ao deletar gato: ${error}`);
    throw error;
  }
}

export async function updateGato(id, gatoData) {
  if (!id) throw new Error('ID do gato inválido.');
  if (!gatoData || Object.keys(gatoData).length === 0)
    throw new Error('Nenhum dado fornecido para atualização.');

  const docRef = doc(db, 'gatos', id);
  const gatoSnapshot = await getDoc(docRef);
  if (!gatoSnapshot.exists()) throw new Error('Gato não encontrado.');

  const oldData = gatoSnapshot.data();

  try {
    if (gatoData.fotoFile) {
      const newFotoFile = gatoData.fotoFile;
      const { fotoURL, fotoPath } = await uploadGatoImage(newFotoFile);
      gatoData.fotoURL = fotoURL;
      gatoData.fotoPath = fotoPath;

      if (oldData.fotoPath && oldData.fotoPath !== fotoPath) {
        try {
          await deleteObject(ref(storage, oldData.fotoPath));
        } catch (warning) {
          toast.warn(`Erro ao deletar imagem antiga: ${warning}`);
        }
      }
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
    toast.error(`Erro ao atualizar gato: ${error}`);
    throw error;
  }
}
