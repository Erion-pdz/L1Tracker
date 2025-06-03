import 'expo-router/entry';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getLiveMatches } from '../services/api';

export default function HomeScreen() {
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const data = await getLiveMatches();
        setLiveMatches(data);
      } catch (err) {
        console.error('Erreur récupération des matchs live :', err);
      }
    };

    fetchLive();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matchs en direct</Text>
      {liveMatches.length === 0 ? (
        <Text style={styles.empty}>Aucun match en direct</Text>
      ) : (
        <FlatList
          data={liveMatches}
          keyExtractor={(item) => item.fixture.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <Text style={styles.matchText}>
                {item.teams.home.name} {item.goals.home} - {item.goals.away} {item.teams.away.name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: '#888' },
  matchCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  matchText: { fontSize: 16 },
});
