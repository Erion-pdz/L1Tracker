import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getTodayMatches, getLiveMatches } from '../services/api';

export default function HomeScreen() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLiveMatches(await getLiveMatches());
      setTodayMatches(await getTodayMatches());
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Matchs en direct */}
      <Text style={styles.sectionTitle}>🔴Matchs en direct</Text>
      {liveMatches.length === 0 ? (
        <Text style={styles.emptyText}>Aucun match en cours</Text>
      ) : (
        liveMatches.map((match) => (
          <View key={match.fixture.id} style={styles.card}>
            <Text style={styles.text}>
              {match.teams.home.name} {match.goals.home} - {match.goals.away} {match.teams.away.name}
            </Text>
          </View>
        ))
      )}

      {/* Matchs du jour */}
      <Text style={styles.sectionTitle}>⚪Matchs aujourd’hui</Text>
      {todayMatches.length === 0 ? (
        <Text style={styles.emptyText}>Aucun match prévu</Text>
      ) : (
        todayMatches.map((match) => (
          <View key={match.fixture.id} style={styles.card}>
            <Text style={styles.text}>
              {match.teams.home.name} vs {match.teams.away.name} — {match.fixture.date.split('T')[1].slice(0, 5)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  emptyText: { color: '#888', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  text: { fontSize: 16 },
});
