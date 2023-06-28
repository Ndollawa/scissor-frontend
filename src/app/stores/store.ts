import { configureStore }  from  '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../api/apiSlice';
import authReducer from '../../features/auth/authSlice';
import settingReducer from '../../features/dashboard/pages/Settings/settingsConfigSlice';
import PreloaderReducer from '../../features/dashboard/components/PreloaderSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';



// const persist:any = localStorage.getItem('persist');
const persistConfig = {
    key:"rootApp",
    version:1,
    storage,
    blacklist:["auth"]
}

const reducer = combineReducers({
       [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        settingsConfig: settingReducer,
        preloader:PreloaderReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck:false,
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        }).concat(apiSlice.middleware),
        devTools: process.env.NODE_ENV !== 'production'
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
setupListeners(store.dispatch)