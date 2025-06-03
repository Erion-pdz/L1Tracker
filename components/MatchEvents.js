import { ScrollView, Text, View } from 'react-native';

export default function MatchEvents({ events }) {
  if (!events || events.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Événements du match</Text>

      <ScrollView>
        {events.map((event, index) => (
          <View
            key={index}
            style={[
              styles.eventRow,
              event.team.name === event.teams.home.name ? styles.leftAlign : styles.rightAlign,
            ]}
          >
            {event.team.name === event.teams.home.name && (
              <>
                <Text style={styles.minute}>{event.time.elapsed}'</Text>
                <Text style={styles.eventText}>{renderEventText(event)}</Text>
              </>
            )}
            {event.team.name === event.teams.away.name && (
              <>
                <Text style={styles.eventText}>{renderEventText(event)}</Text>
                <Text style={styles.minute}>{event.time.elapsed}'</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function renderEventText(event) {
  const player = event.player?.name || '';
  const assist = event.assist?.name ? ` (assist: ${event.assist.name})` : '';
  switch (event.type) {
    case 'Goal':
      return `⚽ ${player}${assist}`;
    case 'Card':
      return event.detail === 'Yellow Card' ? `🟨 ${player}` : `🟥 ${player}`;
    case 'Substitution':
      return `🔁 ${player} ↔ ${event.assist?.name}`;
    default:
      return `${player} - ${event.detail}`;
  }
}
