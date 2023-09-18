import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useCallback, useEffect, useState } from 'react';
import { init } from './utils/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';
import Toast from 'react-native-toast-message';
// import { store, useAppDispatch } from './services/store';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './services/store';
import LoginScreen from './screens/LoginScreen';
import Layout from './layout/Layout';
import { fetchCurrentUser } from './features/login/loginSlice';
// import {EXPO_PUBLIC_API_URL} from '@env'

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  // console.log(process.env.REACT_APP_API_URL);
  // const isAuthenticated = false;

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    <AppLoading />;
  }

  return (
    <>
      <StatusBar style='dark' />

      <Provider store={store}>
        <Layout />
      </Provider>
      <Toast />
    </>
  );
}
