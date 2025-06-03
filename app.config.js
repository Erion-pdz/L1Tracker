import 'dotenv/config';

export default {
  expo: {
    name: 'L1Tracker',
    slug: 'l1tracker',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    userInterfaceStyle: 'automatic',
    scheme: 'l1tracker',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.l1tracker.app',
    },
    android: {
      package: 'com.l1tracker.app',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['INTERNET'],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      API_KEY: process.env.API_KEY,
      eas: {
        projectId: 'your-eas-project-id-here', // (facultatif mais recommandé)
      },
    },
    plugins: [
      'expo-router',
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#007AFF',
          sounds: ['default'],
        },
      ],
    ],
    updates: {
      fallbackToCacheTimeout: 0,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
  },
};
