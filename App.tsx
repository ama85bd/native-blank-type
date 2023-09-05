import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewscreen from './screens/MealsOverviewscreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4b1d03' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#614a3c' },
        drawerContentStyle: {
          backgroundColor: '#4b1d03',
        },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#4b1d03',
        drawerActiveBackgroundColor: '#c9aa98',
      }}
    >
      <Drawer.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='Favorites'
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name='star' color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function BottomTabNavigator({ route }: any) {
  // const mealId = route.params.mealId;
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: '#614a3c' }}
      screenOptions={{
        headerStyle: { backgroundColor: '#4b1d03' },
        headerTintColor: 'white',

        tabBarStyle: { backgroundColor: '#ebd6ca' },

        tabBarInactiveTintColor: '#4b1d03',
        tabBarActiveTintColor: '#ebd6ca',
        tabBarActiveBackgroundColor: '#6d4f3d',
      }}
    >
      <BottomTab.Screen
        name='MealsDetaill'
        component={MealDetailScreen}
        initialParams={{ mealId: route.params.mealId }}
        options={{
          title: 'About the Meal',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name='TabHome'
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <SafeAreaView style={styles.rootScreen}> */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4b1d03' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#614a3c' },
          }}
        >
          <Stack.Screen
            name='Drawer'
            component={DrawerNavigator}
            options={{
              title: 'All Categories',
              headerShown: false,
            }}
          />
          <Stack.Screen name='MealsOverview' component={MealsOverviewscreen} />
          <Stack.Screen
            name='MealsDetail'
            component={BottomTabNavigator}
            options={{
              title: 'About the Meal',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
