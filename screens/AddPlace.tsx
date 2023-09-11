import { StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';
import { Place } from '../models/Place';
import { insertPlace } from '../utils/database';

interface IAddPlaceProps {
  navigation: any;
}

const AddPlace: React.FunctionComponent<IAddPlaceProps> = ({ navigation }) => {
  async function createPlaceHandler(place: Place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;

const styles = StyleSheet.create({});
