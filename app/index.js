import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import { getLiveMatches, getTodayMatches } from '../services/api';

export default function HomeScreen() {
  const [todayMatches, setTodayMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const live = await getLiveMatches();
        const today = await getTodayMatches(); // 🆕 ajout des matchs du jour
        setLiveMatches(live);
        setTodayMatches(today);
      } catch (err) {
        console.error('Erreur récupération des données :', err);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* 🔴 Matchs en direct */}
      <Text style={styles.title}>🔴 Matchs en direct</Text>
      {liveMatches.length === 0 ? (
        <Text style={styles.emptyText}>Aucun match en cours</Text>
      ) : (
        liveMatches.map((item) => (
          <View key={item.fixture.id} style={styles.matchCard}>
            <Text style={styles.matchText}>
              {item.teams.home.name} {item.goals.home} - {item.goals.away} {item.teams.away.name}
            </Text>
          </View>
        ))
      )}

      {/* 📅 Matchs du jour */}
      <Text style={styles.title}>📅 Matchs aujourd’hui</Text>
      {todayMatches.length === 0 ? (
        <Text style={styles.emptyText}>Aucun match prévu</Text>
      ) : (
        todayMatches.map((item) => (
          <View key={item.fixture.id} style={styles.matchCard}>
            <Text style={styles.matchText}>
              {item.teams.home.name} vs {item.teams.away.name} — {item.fixture.date.split('T')[1].slice(0, 5)}
            </Text>
            <Text style={styles.leagueText}>{item.league.name}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#888', marginBottom: 10 },
  matchCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  matchText: { fontSize: 16 },
  leagueText: { fontSize: 12, color: '#666' },
});
