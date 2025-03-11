import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);

  const router = useRouter();
  // use firebase auto check user login or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        setUser({ uid: user.uid, email: user.email, name: user.displayName });
        updateUserData(user.uid);
        router.replace("/(tabs)");
      } else {
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });

    // if user is login then update the user data clear the state instant of waiting for the next render
    return () => unsubscribe();
  }, []);

  // function for login
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err: any) {
      let msg = err.message;
      console.log("error", err);
      // (auth/invalid-email)
      if (err.code === "auth/invalid-email") {
        msg = "Invalid email address";
      }
      // (auth/user-not-found)
      if (err.code === "auth/user-not-found") {
        msg = "User not found";
      }
      // (auth/wrong-password)
      if (err.code === "auth/wrong-password") {
        msg = "Invalid password";
      } else {
        msg = "Something went wrong, please try again";
      }

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
      if (err.code === "auth/email-already-in-use") {
        return { success: false, msg: "Email already in use" };
      } else if (err.code === "auth/weak-password") {
        return {
          success: false,
          msg: "Password should be at least 6 characters",
        };
      } else if (err.code === "auth/invalid-email") {
        return {
          success: false,
          msg: "Invalid email address",
        };
      } else return { success: false, msg };
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
    } catch (err: any) {
      console.log("error", err);
    }
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
