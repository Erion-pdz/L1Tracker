// components/Header.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    // Re-check when component mounts
    checkToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.replace('/'); // retour à l'accueil
  };

  const handleLogin = () => {
    router.push('/login'); // aller à la page login
  };

  return (
    <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>L1Tracker</Text>

      {isAuthenticated ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: 'red' }}>Déconnexion</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLogin}>
          <Text style={{ color: 'blue' }}>Connexion / Inscription</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
