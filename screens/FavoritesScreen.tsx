import { StyleSheet, FlatList, Text } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

interface IFavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FunctionComponent = () => {
  return <Text>This is Favorite screen!!</Text>;
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
