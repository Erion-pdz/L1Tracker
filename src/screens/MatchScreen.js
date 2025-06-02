import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getMatchStats, getLineUps, getMatchEvents } from '../services/api';

export default function MatchScreen({ route }) {
  const { match } = route.params;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const statsData = await getMatchStats(match.fixture.id);
      const lineupsData = await getLineUps(match.fixture.id);
      const eventsData = await getMatchEvents(match.fixture.id);

      setStats(statsData);
      setLineups(lineupsData);
      setEvents(eventsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);  
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMatchStats(match.fixture.id);
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [match]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#000" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {match.teams.home.name} vs {match.teams.away.name}
      </Text>

      <Text style={styles.score}>
        {match.goals.home} - {match.goals.away}
      </Text>

      {stats && stats.length > 0 ? (
        stats[0].statistics.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.teamStat}>{stat.value || '-'}</Text>
            <Text style={styles.statType}>{stat.type}</Text>
            <Text style={styles.teamStat}>
              {stats[1] ? stats[1].statistics[index].value || '-' : '-'}
            </Text>
          </View>
        ))
      ) : (
        <Text>Aucune statistique disponible</Text>
      )}
    </ScrollView>
  );
}

{lineups.length > 0 && (
  <>
    <Text style={styles.sectionTitle}>Compositions</Text>
    {lineups.map((team, i) => (
      <View key={i} style={styles.lineupBlock}>
        <Text style={styles.teamName}>{team.team.name}</Text>
        <Text>Coach : {team.coach.name}</Text>
        <Text>Formation : {team.formation}</Text>
        <Text style={styles.playersTitle}>Titulaire(s) :</Text>
        {team.startXI.map((p, idx) => (
          <Text key={idx}>• {p.player.name} ({p.player.number})</Text>
        ))}
      </View>
    ))}
  </>
)}

{events.length > 0 && (
  <>
    <Text style={styles.sectionTitle}>Événements</Text>
    {events.map((event, idx) => (
      <View key={idx} style={styles.eventRow}>
        <Text>{event.time.elapsed}' - {event.team.name}</Text>
        <Text>{event.player.name} ({event.type} - {event.detail})</Text>
      </View>
    ))}
  </>
)}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    borderBottomWidth: 0.5,
    paddingBottom: 4,
  },
  teamStat: {
    width: '30%',
    textAlign: 'center',
  },
  statType: {
    width: '40%',
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 10,
},
lineupBlock: {
  marginBottom: 15,
  backgroundColor: '#f5f5f5',
  padding: 10,
  borderRadius: 6,
},
playersTitle: {
  marginTop: 6,
  fontWeight: '600',
},
teamName: {
  fontSize: 16,
  fontWeight: 'bold',
},
eventRow: {
  marginBottom: 8,
  paddingBottom: 4,
  borderBottomWidth: 0.3,
  borderBottomColor: '#ccc',
}
});
