import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { signUp, signIn } from '../services/auth'; 
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    try {
      const user = isLoginMode
        ? await signIn(email, password)
        : await signUp(email, password);

      const token = await user.getIdToken();
      await AsyncStorage.setItem('authToken', token);

      // 🔍 Récupération du rôle via Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      if (role === 'admin') {
        await AsyncStorage.setItem('userRole', 'admin');
        router.replace('/admin/adm');
      } else {
        await AsyncStorage.setItem('userRole', role || 'user');
        router.replace('/');
      }
    } catch (err) {
      console.error('Firebase Auth error:', err);
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email ou mot de passe incorrect.');
          break;
        case 'auth/email-already-in-use':
          setError('Cet email est déjà utilisé.');
          break;
        default:
          setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoginMode ? 'Connexion' : 'Inscription'}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title={isLoginMode ? 'Se connecter' : "S'inscrire"} onPress={handleAuth} />

      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        {isLoginMode ? "Pas encore de compte ?" : 'Déjà un compte ?'}
      </Text>
      <Button
        title={isLoginMode ? "S'inscrire" : 'Se connecter'}
        onPress={() => {
          setError('');
          setIsLoginMode(!isLoginMode);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

export default LoginScreen;
