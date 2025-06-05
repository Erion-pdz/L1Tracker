import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { getLeagueStandings } from '../services/api';


export default function Classement() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const data = await getLeagueStandings();
        setStandings(data);
      } catch (error) {
        console.error('Erreur chargement classement :', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchStandings();
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

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>🏆 Classement Ligue 1</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        standings.map((team, index) => (
          <View
            key={team.team.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}
          >
            <Text style={{ width: 30, fontWeight: 'bold' }}>{team.rank}</Text>
            <Image source={{ uri: team.team.logo }} style={{ width: 24, height: 24, marginRight: 8 }} />
            <Text style={{ flex: 1 }}>{team.team.name}</Text>
            <Text style={{ width: 30, textAlign: 'center' }}>{team.points}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
