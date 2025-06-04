import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// ✅ Créer un utilisateur Firestore après inscription
export const createUserDocument = async (uid, email) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      role: 'user',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erreur lors de la création du document utilisateur :', error);
    throw error;
  }
};

// ✅ Lire le document utilisateur (pour récupérer son rôle par exemple)
export const getUserDocument = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.warn('Aucun utilisateur trouvé pour cet UID');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du document utilisateur :', error);
    throw error;
  }
};

// ✅ Exemple pour mettre à jour les favoris
export const updateUserFavoris = async (uid, favoris) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      favoris,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des favoris :', error);
    throw error;
  }
};
