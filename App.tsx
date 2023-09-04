import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserScreen from './screens/UserScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#32064d' },
          headerTintColor: 'white',
          drawerActiveBackgroundColor: '#d8a9f5',
          drawerActiveTintColor: '#32064d',
          drawerStyle: {
            backgroundColor: '#d0e3f1',
          },
        }}
        initialRouteName='User'
      >
        <Drawer.Screen
          name='User'
          component={UserScreen}
          options={{
            drawerLabel: 'User Screen',
            drawerIcon: ({ color }) => (
              <Ionicons name='home' color={color} size={18} />
            ),
          }}
        />
        <Drawer.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name='person' color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
