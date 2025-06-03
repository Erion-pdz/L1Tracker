import { Text, View } from 'react-native';

export default function TeamStats({ stats }) {
  if (!stats) return null;

  return (
    <View style={{ padding: 12, backgroundColor: '#f9f9f9', borderRadius: 10, marginTop: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>📊 Statistiques de l'équipe</Text>

      <StatRow label="Matchs joués" value={stats.played.total} />
      <StatRow label="Victoires" value={stats.wins.total} />
      <StatRow label="Nuls" value={stats.draws.total} />
      <StatRow label="Défaites" value={stats.loses.total} />
      <StatRow label="Buts marqués" value={stats.goals.for.total} />
      <StatRow label="Buts encaissés" value={stats.goals.against.total} />
      <StatRow label="Différence de buts" value={stats.goals.for.total - stats.goals.against.total} />
    </View>
  );
}

const StatRow = ({ label, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
    <Text style={{ fontWeight: '500' }}>{label}</Text>
    <Text>{value}</Text>
  </View>
);
