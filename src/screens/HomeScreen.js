import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getLiveMatches } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [matches, setMatches] = useState([]);
  const navigation = useNavigation();

  <TouchableOpacity onPress={() => navigation.navigate('Match', { match: item })}>
  <Text>{item.teams.home.name} {item.goals.home} - {item.goals.away} {item.teams.away.name}</Text>
</TouchableOpacity>

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLiveMatches();
      setMatches(data);
    };
    fetchData();
  }, []);

  return (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.fixture.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.teams.home.name} {item.goals.home} - {item.goals.away} {item.teams.away.name}</Text>
        </View>
      )}
    />
  );
}
