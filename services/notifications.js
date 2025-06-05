// services/notifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission refusée pour les notifications.');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('📲 Push Token:', token);
  } else {
    alert('Doit être exécuté sur un appareil physique.');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}

// ✅ Cette fonction affiche une notif réelle sur mobile, un alert() sur Web
export async function sendTestMatchNotification() {
  if (Platform.OS === 'web') {
    alert('⚽ PSG vs OM - Le match commence bientôt !');
  } else {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚽ PSG vs OM',
        body: 'Le match commence bientôt !',
      },
      trigger: null,
    });
  }
}
