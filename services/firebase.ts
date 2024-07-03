import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Ensure the config is loaded safely
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || "",
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || "",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || "",
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId || "",
  appId: Constants.expoConfig?.extra?.firebaseAppId || "",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
