import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './utils/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';
import UserLocation from './screens/CellularInfo';
import Toast from 'react-native-toast-message';
import { store, useAppDispatch } from './services/store';
import { loginUser } from './features/login/loginSlice';
import { Provider } from 'react-redux';
// import {EXPO_PUBLIC_API_URL} from '@env'

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useAppDispatch();
  const [dbInitialized, setDbInitialized] = useState(false);
  // console.log(process.env.REACT_APP_API_URL);

  const REACT_APP_API_URL: any = process.env.EXPO_PUBLIC_API_URL;
  console.log('REACT_APP_API_URL', REACT_APP_API_URL);
  useEffect(() => {
    dispatch(
      loginUser({
        email: 'ashique@lged.gov.bd',
        password: 'Lged@1234',
      })
    );
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

      <Toast />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            {/* <Stack.Screen name='UserLocation' component={UserLocation} /> */}
            <Stack.Screen
              name='AllPlaces'
              component={AllPlaces}
              options={({ navigation }) => ({
                title: 'Your Favorite Places',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon='add'
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('AddPlace')}
                  />
                ),
              })}
            />
            <Stack.Screen
              name='AddPlace'
              component={AddPlace}
              options={{
                title: 'Add a new place',
              }}
            />
            <Stack.Screen
              name='Map'
              component={Map}
              options={{
                title: 'Map Page',
              }}
            />
            <Stack.Screen
              name='PlaceDetails'
              component={PlaceDetails}
              options={{
                title: 'Loading place...',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
