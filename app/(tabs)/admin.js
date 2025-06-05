import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { getUserDocument } from '../../firebase/firestore';
import { getAllUsers, deleteUserById, updateUserRole } from '../../services/admin';

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace('/connexion');
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const data = await getUserDocument(currentUser.uid);
        setUserRole(data?.role);

        if (data?.role === 'admin') {
          const allUsers = await getAllUsers();
          setUsers(allUsers);
        } else {
          Alert.alert('Accès refusé', "Vous n'avez pas les droits admin.");
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('❌ Erreur récupération utilisateur :', error);
        Alert.alert('Erreur', 'Impossible de récupérer les données utilisateur.');
        router.replace('/(tabs)');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (uid) => {
    await deleteUserById(uid);
    setUsers(users.filter((u) => u.id !== uid));
  };

  const toggleRole = async (uid, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await updateUserRole(uid, newRole);
    setUsers(users.map((u) => (u.id === uid ? { ...u, role: newRole } : u)));
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (userRole !== 'admin') {
    return <Text style={{ padding: 20 }}>Accès refusé</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Admin</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text>{item.email} ({item.role})</Text>
            <View style={styles.actions}>
              <Button title="🛠" onPress={() => toggleRole(item.id, item.role)} />
              <Button title="🗑️" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  userRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actions: { flexDirection: 'row', gap: 10 },
});

export default AdminPage;
