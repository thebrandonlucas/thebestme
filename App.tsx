import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
// Modify to add persistor
import { persistor, store } from './redux/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();
  const colorScheme = 'dark';

  if (!isLoadingComplete) {
    return null;
  }

  async function clearAppData() {
    console.log('Clearing App Data');
    // TODO: remove after dev
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
        Alert.alert('App data cleared');
      }
    }
  }

  // async function clearData() {
  //   console.log('clearrrring')
  //   const asyncStorageKeys = await AsyncStorage.getAllKeys();
  //   AsyncStorage.multiRemove(asyncStorageKeys);
  // }

  clearAppData();
  // clearData()

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
