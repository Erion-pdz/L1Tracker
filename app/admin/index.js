import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDocument } from '../../firebase/firestore';
import { getAllUsers, deleteUserById, updateUserRole } from '../../services/admin'; // à créer

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return router.replace('/login');

      setUser(currentUser);
      const data = await getUserDocument(currentUser.uid);
      setUserRole(data?.role);

      if (data?.role === 'admin') {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setLoading(false);
      } else {
        Alert.alert('Accès refusé', "Vous n'avez pas les droits admin.");
        router.replace('/');
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

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

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
      <View style={{ marginTop: 40 }}>
        <Text style={styles.subtitle}>Zone de gestion du contenu</Text>
        <Text>(à compléter selon ce que tu veux gérer ici)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
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
