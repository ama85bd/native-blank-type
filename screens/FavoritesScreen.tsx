import { StyleSheet, Text, View } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealList from '../components/MealList/MealList';
import { IContext } from '../models/context';
import { useContext } from 'react';
import { FavoritesContext } from '../store/context/favorite-context';
import { useSelector } from 'react-redux';

interface IFavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FunctionComponent = () => {
  const favoriteMealsIds = useSelector((state: any) => state.favoriteMeals.ids);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealsIds.includes(meal.id)
  );
  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }
  return <MealList items={favoriteMeals} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
