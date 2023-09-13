import { View, Text, StyleSheet, Button } from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/database';
import Toast from 'react-native-toast-message';
import showToast from '../utils/Toast';

interface IAllPlacesProps {
  route: any;
}

const AllPlaces: React.FunctionComponent<IAllPlacesProps> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((currPlaces: any) => [
      //   ...currPlaces,
      //   route.params?.place,
      // ]);
    }
  }, [isFocused]);

  const showToastHere = () => {
    showToast('info', 'Hello', 'This is some something 👋');
    // Toast.show({
    //   type: 'error',
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    // });
  };
  return (
    // <View>
    //   {/* <PlacesList places={loadedPlaces} />; */}
    //   <Button title='Show toast' onPress={showToastHere} />
    // </View>
    <PlacesList places={loadedPlaces} />
  );
};

export default AllPlaces;

const styles = StyleSheet.create({});
