import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, format, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import MatchCard from '../../components/MatchCard';
import { getFixturesByDate } from '../../services/api';

const Calendrier = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  const ligue1Id = 61;
  
    useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const loadFixtures = async (date) => {
    try {
      setLoading(true);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await getFixturesByDate(formattedDate, ligue1Id); 
      setFixtures(response || []);
    } catch (error) {
      console.error('Erreur lors du chargement des matchs :', error);
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    if (isAuthenticated) {
      loadFixtures(currentDate);
    }
  }, [isAuthenticated, currentDate]);


  const goToNextDay = () => setCurrentDate(prev => addDays(prev, 1));
  const goToPreviousDay = () => setCurrentDate(prev => subDays(prev, 1));

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
    <View style={{ flex: 1, backgroundColor: '#f4f4f4', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>📅 Calendrier des matchs</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <TouchableOpacity onPress={goToPreviousDay}>
          <Text>← Jour précédent</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold' }}>{format(currentDate, 'EEEE d MMMM yyyy')}</Text>
        <TouchableOpacity onPress={goToNextDay}>
          <Text>Jour suivant →</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : fixtures.length === 0 ? (
        <Text>Aucun match prévu ce jour.</Text>
      ) : (
        <FlatList
          data={fixtures}
          keyExtractor={(item) => item.fixture.id.toString()}
          renderItem={({ item }) => <MatchCard match={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default Calendrier;
