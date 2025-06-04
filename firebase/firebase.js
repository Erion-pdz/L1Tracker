// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Ta configuration Firebase (remplace avec tes vraies clés)
const firebaseConfig = {
  apiKey: 'AIzaSyDep3CieEiJk-kXA3idNFca2RT60E_luuo',
  authDomain: 'l1tracker.firebaseapp.com',
  projectId: 'l1tracker',
  storageBucket: 'l1tracker.appspot.com',
  messagingSenderId: '258886932054',
  appId: 'l1tracker',
};

// Initialiser Firebase si ce n’est pas déjà fait
const app = initializeApp(firebaseConfig);

// 🔐 Auth & 🔥 Firestore exports
export const auth = getAuth(app);
export const db = getFirestore(app);