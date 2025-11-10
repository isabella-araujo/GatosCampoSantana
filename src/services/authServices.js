import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

export async function signInUser({ email, password }) {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return {
      user: {
        id: credentials.user.uid,
        email: credentials.user.email,
      },
    };
  } catch (error) {
    return {
      error: error.code || error.message,
    };
  }
}

export async function signOutUser() {
  let response = new Object();
  try {
    await signOut(auth);
  } catch (error) {
    toast.error(`${error.code} = ${error.message}`);
    response.error = error.message;
  }
  return response;
}

export async function resetPasswordUser({ email }) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
