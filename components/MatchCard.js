import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ligue1Logo from '../assets/logos/ligue1.jpg';

const MatchCard = ({ data }) => {
  const router = useRouter();
  const { fixture, teams, goals, league } = data;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/match/${fixture.id}`)}
      style={{
        backgroundColor: '#ffffff',
        marginVertical: 8,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
{/* Ligne supérieure : minute + logo Ligue 1 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#888' }}>
          {fixture.status.elapsed ? `${fixture.status.elapsed}'` : fixture.status.long}
        </Text>
        <Image source={ligue1Logo} style={{ width: 24, height: 24 }} />
      </View>

      {/* Logos et scores */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        {/* Équipe à domicile */}
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: teams.home.logo }}
            style={{ width: 40, height: 40 }}
          />
          <Text>{teams.home.name}</Text>
        </View>

        {/* Score */}
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {goals.home} - {goals.away}
        </Text>

        {/* Équipe à l’extérieur */}
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: teams.away.logo }}
            style={{ width: 40, height: 40 }}
          />
          <Text>{teams.away.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchCard;
