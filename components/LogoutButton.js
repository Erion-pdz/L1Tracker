import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutButton() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setVisible(!!token);
    };

    checkToken();
    const interval = setInterval(checkToken, 2000); // vérifie régulièrement si on est connecté
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  if (!visible) return null;

  return <Button title="Déconnexion" onPress={handleLogout} />;
}
