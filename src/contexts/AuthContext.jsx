import { createContext, useState, useEffect, useMemo } from 'react';
import {
  resetPasswordUser,
  signInUser,
  signOutUser,
  signUpUser,
} from '../services/authServices';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        const baseUser = { id: firebaseUser.uid, email: firebaseUser.email };
        setUser(baseUser);

        try {
          const voluntariosRef = collection(db, 'voluntarios');
          const q = query(
            voluntariosRef,
            where('userId', '==', firebaseUser.uid),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const data = userDoc.data();
            const roleFromDB = data?.role?.toLowerCase() || 'volunteer';
            setRole(roleFromDB);
          } else {
            setRole('volunteer');
          }
        } catch (error) {
          console.error(error);
          setRole('volunteer');
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signIn(userData) {
    setLoading(true);
    try {
      const response = await signInUser(userData);
      if (response?.user) setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    const response = await signOutUser();
    if (!response?.error) {
      setUser(null);
      setRole(null);
    }
    setLoading(false);
    return response;
  }

  async function signUp(userData) {
    setLoading(true);
    const response = await signUpUser(userData);
    if (response?.user) setUser(response.user);
    setLoading(false);
    return response;
  }

  async function resetPassword(userData) {
    setLoading(true);
    const response = await resetPasswordUser(userData);
    setLoading(false);
    return response;
  }

  const value = useMemo(
    () => ({
      signed: !!user,
      user,
      role,
      loading,
      signIn,
      signOut,
      signUp,
      resetPassword,
    }),
    [user, role, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
