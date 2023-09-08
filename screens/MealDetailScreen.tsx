import { useLayoutEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import { IContext } from '../models/context';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorite';

interface IMealDetailScreenProps {
  route: any;
  // mealId: any;
  navigation: NavigationProp<ParamListBase>;
}

const MealDetailScreen: React.FunctionComponent<IMealDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const favoriteMealids = useSelector((state: any) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  const mealId = route.params.mealId;
  const seletedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealisFavorie = favoriteMealids.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealisFavorie) {
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealisFavorie ? 'star' : 'star-outline'}
            color='white'
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);
  return (
    // <Text>{mealId}</Text>
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: seletedMeal?.imageUrl }} />
      <Text style={styles.title}>{seletedMeal?.title}</Text>
      <MealDetails
        duration={seletedMeal?.duration}
        complexity={seletedMeal?.complexity}
        affordability={seletedMeal?.affordability}
        textStyle={styles.detailText}
        style={styles.datailStyle}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={seletedMeal?.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={seletedMeal?.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  datailStyle: {},
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
