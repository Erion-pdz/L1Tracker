import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFixturesToday } from '../services/api'; 
import MatchCard from './MatchCard';

const MatchesToday = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFixturesToday();
      setMatches(data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matchs de Ligue 1 Aujourd’hui</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.fixture.id.toString()}
        renderItem={({ item }) => <MatchCard data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f0' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
});

export default MatchesToday;
