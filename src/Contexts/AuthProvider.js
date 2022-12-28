import {
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  // 1. Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Update name

  const updateName = (name) => {
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // 3. Verify Email
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // 4. SignInWithGoogle
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // 5. logout
  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    createUser,
    updateName,
    verifyEmail,
    signInWithGoogle,
    logOut,
    user,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
