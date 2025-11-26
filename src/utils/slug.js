import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export function slugBase(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function slugify(nome) {
  const base = slugBase(nome);

  const gatoRef = collection(db, 'gatos');
  const q = query(gatoRef, where('slugBase', '==', base));
  const snapshot = await getDocs(q);

  const count = snapshot.size;

  if (count === 0) {
    return { slug: base, slugBase: base };
  }

  return { slug: `${base}-${count + 1}`, slugBase: base };
}
