import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaAwd_ik-KHvj7l2tjCfk95F_mb3RCnZs",
  authDomain: "comp3120-swap.firebaseapp.com",
  projectId: "comp3120-swap",
  storageBucket: "comp3120-swap.firebasestorage.app",
  messagingSenderId: "240560070119",
  appId: "1:240560070119:web:bf6a3b8691da653f57f142"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);