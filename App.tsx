import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { newDay } from './redux/actions/DayActions';
// Modify to add persistor
import { persistor, RootState, store } from './redux/store';
import { IDayType, IHabitType } from './types';

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark'

  if (!isLoadingComplete) {
    return null;
  }

  async function clearAppData() {
    console.log('Clearing App Data')
    // TODO: remove after dev
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
        Alert.alert('App data cleared')
      }
    }
  }

  // clearAppData();

  // TODO: How to pass colorScheme as a prop through the app?
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
