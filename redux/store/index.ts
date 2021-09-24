import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import habitReducer from '../reducers/habitReducer';
import journalReducer from '../reducers/journalReducer';

import { createStore, combineReducers, 
    // Only when middleware (i.e. API calling) is needed
    applyMiddleware
} from 'redux';

// Only needed for middleware
import thunk from 'redux-thunk';
import cbtReducer from '../reducers/cbtReducer';
import awareReducer from '../reducers/awareReducer';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // which items from initialState do we want to persist?
    whitelist: ['habits', 'journals', 'cbtJournals', 'awareJournals']
  };

  const rootReducer = combineReducers({
    habitReducer: persistReducer(persistConfig, habitReducer),
    journalReducer: persistReducer(persistConfig, journalReducer),
    cbtReducer: persistReducer(persistConfig, cbtReducer),
    awareReducer: persistReducer(persistConfig, awareReducer),
  });
  
  export const store = createStore(rootReducer, applyMiddleware(thunk));
  export const persistor = persistStore(store);