import { ScrollView, Text, View } from 'react-native';

export default function LineUps({ lineups }) {
  if (!lineups || lineups.length === 0) return null;

  const [homeTeam, awayTeam] = lineups;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Compositions des équipes</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>{homeTeam.team.name}</Text>
          <Text style={styles.coach}>Coach : {homeTeam.coach.name}</Text>
          <Text style={styles.formation}>📐 Formation : {homeTeam.formation}</Text>
          {homeTeam.startXI.map((player, index) => (
            <Text key={index} style={styles.player}>
              {player.player.number}. {player.player.name}
            </Text>
          ))}
        </View>

        <View style={styles.separator} />

        <View style={styles.teamContainer}>
          <Text style={styles.teamName}>{awayTeam.team.name}</Text>
          <Text style={styles.coach}>Coach : {awayTeam.coach.name}</Text>
          <Text style={styles.formation}>📐 Formation : {awayTeam.formation}</Text>
          {awayTeam.startXI.map((player, index) => (
            <Text key={index} style={styles.player}>
              {player.player.number}. {player.player.name}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  teamContainer: {
    width: 180,
    marginRight: 16,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  coach: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  formation: {
    marginBottom: 6,
    color: '#444',
  },
  player: {
    paddingVertical: 2,
    fontSize: 14,
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
});
