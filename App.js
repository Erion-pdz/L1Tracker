import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator.js';
import { ScoreProvider } from './src/context/ScoreContext';

export default function App() {
  return (
    <ScoreProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ScoreProvider>
  );
}
