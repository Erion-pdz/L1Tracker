// services/admin.js
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// 🔄 Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 🗑 Supprimer un utilisateur
export const deleteUserById = async (uid) => {
  await deleteDoc(doc(db, 'users', uid));
};

// 🔁 Changer le rôle d’un utilisateur
export const updateUserRole = async (uid, newRole) => {
  await updateDoc(doc(db, 'users', uid), { role: newRole });
};
