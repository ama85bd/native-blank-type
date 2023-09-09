import { View, Text, StyleSheet } from 'react-native';
import PlacesList from '../components/Places/PlacesList';

interface IAllPlacesProps {
  title: any;
  color: any;
  onPress: () => void;
}

const AllPlaces: React.FunctionComponent = () => {
  return <PlacesList />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
