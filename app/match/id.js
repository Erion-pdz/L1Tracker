
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { getLineUps, getMatchEvents, getMatchStats } from '../../services/api';
import { getMatchOdds } from '../../services/api';

export default function MatchDetail() {
  const { id } = useLocalSearchParams(); 
  const [stats, setStats] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [events, setEvents] = useState([]);
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
    const fetchMatchDetails = async () => {
      try {
        const [statsData, lineupsData, eventsData] = await Promise.all([
          getMatchStats(id),
          getLineUps(id),
          getMatchEvents(id),
        ]);

        setStats(statsData);
        setLineups(lineupsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Erreur lors du chargement des données du match :', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMatchDetails();
    }
  }, [id, isAuthenticated]);

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
        <Text>Chargement des détails du match...</Text>
      </View>
    );
  }

  const homeTeam = lineups[0]?.team;
  const awayTeam = lineups[1]?.team;

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Compositions d’équipe */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Compositions</Text>
      {homeTeam && awayTeam && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: homeTeam.logo }} style={{ width: 40, height: 40 }} />
            <Text style={{ fontWeight: 'bold' }}>{homeTeam.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: awayTeam.logo }} style={{ width: 40, height: 40 }} />
            <Text style={{ fontWeight: 'bold' }}>{awayTeam.name}</Text>
          </View>
        </View>
      )}

      {/* Statistiques */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Statistiques</Text>
      {stats.length === 2 && stats[0].statistics.map((stat, index) => (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
          <Text style={{ flex: 1 }}>{stat.value}</Text>
          <Text style={{ flex: 1, textAlign: 'center' }}>{stat.type}</Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>{stats[1].statistics[index]?.value}</Text>
        </View>
      ))}

      {/* Événements du match */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Événements</Text>
      {events.map((event, index) => (
        <View key={index} style={{ marginVertical: 4 }}>
          <Text>
            {event.time.elapsed}' - {event.team.name} - {event.player.name} ({event.type} - {event.detail})
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
