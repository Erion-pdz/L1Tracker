module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@components': './components',
            '@screens': './screens',
            '@constants': './constants',
            '@assets': './assets',
            '@utils': './utils',
          },
        },
      ],
      'react-native-reanimated/plugin', // obligatoire si tu utilises react-native-reanimated
    ],
  };
};
