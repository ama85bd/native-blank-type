import { store, useAppDispatch, useAppSelector } from '../services/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import AllPlaces from '../screens/AllPlaces';
import IconButton from '../components/UI/IconButton';
import AddPlace from '../screens/AddPlace';
import Map from '../screens/Map';
import PlaceDetails from '../screens/PlaceDetails';
import LoginScreen from '../screens/LoginScreen';
import { useCallback, useEffect } from 'react';
import { fetchCurrentUser, loginUser } from '../features/login/loginSlice';
import { IUserLogin } from '../models/baseModel';

const Stack = createNativeStackNavigator();

const Layout: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.login);
  console.log('isAuthenticated', isAuthenticated);

  // const data: IUserLogin = {
  //   email: 'ashique@lged.gov.bd',
  //   password: 'Lged@1234',
  // };
  // const rundispatch = async () => {
  //   await dispatch(loginUser(data));
  // };
  // useEffect(() => {
  //   rundispatch();
  // }, [rundispatch, data]);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        {/* <Stack.Screen name='UserLocation' component={UserLocation} /> */}
        {!isAuthenticated ? (
          <Stack.Screen name='Login' component={LoginScreen} />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
