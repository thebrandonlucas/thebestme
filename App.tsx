import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import rootReducer from './reducers';

const middleware = applyMiddleware(thunkMiddleware);
export const store = createStore(rootReducer, middleware);
console.log('store', store.getState());

// TODO: Should firestore db be passed in globally via redux?
export const db = firebase.firestore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  // TODO: How to pass colorScheme as a prop through the app?
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
