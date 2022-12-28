import {
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // 1. Create User
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Update name

  const updateName = (name) => {
    setLoading(true)
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // 3. Verify Email
  const verifyEmail = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser);
  };

  // 4. SignInWithGoogle
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  // 5. logout
  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  };

  // 6. Login With Password
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 7. Forget Password
  const resetPassword = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email);
  };

  const authInfo = {
    createUser,
    updateName,
    verifyEmail,
    signInWithGoogle,
    logOut,
    signIn,
    resetPassword,
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
