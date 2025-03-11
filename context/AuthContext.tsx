import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);

  // function for login
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err: any) {
      let msg = err.message;
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "user", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid,
      });
      return { success: true };
    } catch (err: any) {
      let msg = err.message;
      return { success: false, msg };
    }
  };

  //update
  const updateUserData = async (uid: string) => {
    try {
      let docRef = doc(firestore, "user", uid);
      let docSnap = await getDoc(docRef); // docSnap.data() will return the user data

      // create user object
      let user = {
        uid: docSnap?.data()?.uid,
        name: docSnap?.data()?.name || null,
        email: docSnap?.data()?.email || null,
        iamge: docSnap?.data()?.image || null,
      };

      setUser({ ...user });
    } catch (err: any) {}
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// below function is used to get the context value in the component file
// below function is hook thats means we don't need to wrap the component with AuthProvider just use this hook
// to get the context value
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
