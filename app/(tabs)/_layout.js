// app/(tabs)/_layout.js
import { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import LogoutButton from '../../components/LogoutButton';
import { View, ActivityIndicator } from 'react-native';

export default function TabsLayout() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userRole').then((r) => {
      setRole(r);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerRight: () => <LogoutButton />,
        tabBarActiveTintColor: '#007AFF',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="classement"
        options={{
          title: 'Classement',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendrier"
        options={{
          title: 'Calendrier',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      {!role && (
        <Tabs.Screen
          name="connexion"
          options={{
            title: 'Connexion',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-in-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {role === 'admin' && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="construct-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="option"
        options={{
          title: 'Options',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
