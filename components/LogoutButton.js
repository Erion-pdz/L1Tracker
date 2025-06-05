// components/LogoutButton.js
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    await signOut(auth);
    router.replace('/login');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text style={styles.text}>Déconnexion</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});
