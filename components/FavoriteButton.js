import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function FavoriteButton({ teamId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const stored = await AsyncStorage.getItem('favoriteTeams');
    const ids = stored ? JSON.parse(stored) : [];
    setIsFavorite(ids.includes(teamId));
  };

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem('favoriteTeams');
    let ids = stored ? JSON.parse(stored) : [];

    if (ids.includes(teamId)) {
      ids = ids.filter(id => id !== teamId);
    } else {
      ids.push(teamId);
    }

    await AsyncStorage.setItem('favoriteTeams', JSON.stringify(ids));
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
      onPress={toggleFavorite}
      style={{
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: isFavorite ? '#ffcc00' : '#e0e0e0',
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ fontWeight: 'bold', color: isFavorite ? '#000' : '#333' }}>
        {isFavorite ? '★ Retirer' : '☆ Ajouter'}
      </Text>
    </TouchableOpacity>
  );
}
