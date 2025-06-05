import { useEffect, useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync, sendTestMatchNotification } from '../../services/notifications';

export default function OptionsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Charger la préférence depuis AsyncStorage
    const loadPreference = async () => {
      const saved = await AsyncStorage.getItem('notificationsEnabled');
      if (saved !== null) {
        setNotificationsEnabled(saved === 'true');
      }
    };
    loadPreference();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notificationsEnabled', String(newValue));

    if (newValue) {
      const token = await registerForPushNotificationsAsync();
      if (token) Alert.alert('Notifications activées');
    } else {
      Alert.alert('Notifications désactivées');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notifications</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Activer les notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleSwitch}
          thumbColor={notificationsEnabled ? '#007AFF' : '#ccc'}
        />
      </View>

      <Button
        title="📣 Test Notification"
        onPress={sendTestMatchNotification}
        disabled={!notificationsEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 16 },
});
