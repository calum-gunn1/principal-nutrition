import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { auth, firestore } from "@/services/firebase";

interface SessionContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    inviteCode: string
  ) => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const register = async (
    email: string,
    password: string,
    inviteCode: string
  ) => {
    const inviteCodeDoc = await getDoc(
      doc(firestore, "inviteCodes", inviteCode)
    );
    if (!inviteCodeDoc.exists()) {
      throw new Error("Invalid invite code.");
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <SessionContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </SessionContext.Provider>
  );
};
