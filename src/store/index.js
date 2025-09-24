import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import your slices
import accordion from '../modules/moduleTools/store/prohibitedTab/accordion.slice';
import customsCalculator from '../modules/moduleTools/store/calculatorTap/customs.slice';
import trackSlice from '../modules/moduleTools/store/trackTab/track.slice';
import moduleServices from '../modules/moduleServices/store';
import moduleMain from '../modules/moduleMain/store';

// 1. Create persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['trackSlice', 'customsCalculator', 'moduleMain'],
};

// 2. Combine reducers into a root reducer FUNCTION
const rootReducer = combineReducers({
  trackSlice,
  accordion,
  customsCalculator,
  moduleServices,
  moduleMain,
});

// 3. Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Create the persistor
export const persistor = persistStore(store);

export default store;