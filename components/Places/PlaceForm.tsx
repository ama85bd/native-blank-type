import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/Place';

interface IPlaceFormProps {
  onCreatePlace: (placeData: any) => void;
}

const PlaceForm: React.FunctionComponent<IPlaceFormProps> = ({
  onCreatePlace,
}) => {
  const [enteredText, setEnteredText] = useState('');
  const [selectImage, setSelectImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText: any) {
    setEnteredText(enteredText);
  }
  function imageTakenHandler(imgageUri: any) {
    setSelectImage(imgageUri);
  }
  const locationTakenHandler = useCallback((location: any) => {
    setPickedLocation(location);
  }, []);
  function savePlaceHandler() {
    const placeData = new Place(enteredText, selectImage, pickedLocation);

    onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredText}
        />
      </View>
      <ImagePicker onImageTaken={imageTakenHandler} />
      <LocationPicker onLocationPick={locationTakenHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
