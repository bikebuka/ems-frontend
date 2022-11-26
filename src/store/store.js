import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import RootReducer from "./Reducer/RootReducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

export const persistor = persistStore(store)