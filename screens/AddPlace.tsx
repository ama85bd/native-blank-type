import { View, Text, StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';

interface IAddPlaceProps {
  navigation: any;
}

const AddPlace: React.FunctionComponent<IAddPlaceProps> = ({ navigation }) => {
  function createPlaceHandler(place: any) {
    navigation.navigate('AllPlaces', {
      place: place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
