import { createContext, useState, useEffect, useMemo } from 'react';
import {
  resetPasswordUser,
  signInUser,
  signOutUser,
} from '../services/authServices';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const tokenResult = await firebaseUser.getIdTokenResult(true);
          const adminClaim = tokenResult.claims.admin === true;

          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
          });
          setIsAdmin(adminClaim);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        toast.error(`Erro ao obter claims do usuário: ${error.message}`);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function signIn(userData) {
    try {
      const response = await signInUser(userData);
      if (!response?.user) return { error: 'invalid-credential' };
      setUser(response.user);
      return response;
    } catch (error) {
      toast.error(`Erro ao fazer login: ${error.message}`);
      return { error: error.message };
    }
  }

  async function signOut() {
    setLoading(true);
    const response = await signOutUser();
    if (!response?.error) {
      setUser(null);
      setIsAdmin(false);
    }
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
      isAdmin,
      loading,
      signIn,
      signOut,
      resetPassword,
    }),
    [user, isAdmin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
