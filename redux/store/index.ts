import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import habitReducer from '../reducers/habitReducer';
import journalReducer from '../reducers/journalReducer';
import cbtReducer from '../reducers/cbtReducer';
import awareReducer from '../reducers/awareReducer';
import myCircleReducer from '../reducers/myCircleReducer';

import { createStore, combineReducers, 
    // Only when middleware (i.e. API calling) is needed
    applyMiddleware
} from 'redux';

// Only needed for middleware
import thunk from 'redux-thunk'; 
import dayReducer from '../reducers/dayReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Determines which items from initialState do we want to persist
  whitelist: ['habitReducer', 'journalReducer', 'cbtReducer', 'awareReducer', 'myCircleReducer', 'dayReducer']
};

const rootReducer = combineReducers({
  habitReducer,
  journalReducer,
  cbtReducer,
  awareReducer,
  myCircleReducer,
  dayReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);