import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getTeamById } from '../../services/api';

export default function Favoris() {
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteTeams');
        const teamIds = storedFavorites ? JSON.parse(storedFavorites) : [];

        const teamData = await Promise.all(teamIds.map(id => getTeamById(id)));
        setFavoriteTeams(teamData);
      } catch (error) {
        console.error('Erreur lors du chargement des favoris :', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadFavorites();
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, textAlign: 'center' }}>
          Pour accéder à cette fonctionnalité, veuillez vous connecter.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Chargement de vos favoris...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>⭐ Équipes favorites</Text>

      {favoriteTeams.length === 0 ? (
        <Text>Vous n’avez pas encore ajouté d’équipes en favoris.</Text>
      ) : (
        favoriteTeams.map((team) => (
          <TouchableOpacity
            key={team.team.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              padding: 12,
              borderRadius: 10,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => router.push(`/team/${team.team.id}`)}
          >
            <Image source={{ uri: team.team.logo }} style={{ width: 40, height: 40, marginRight: 12 }} />
            <Text style={{ fontSize: 16 }}>{team.team.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
