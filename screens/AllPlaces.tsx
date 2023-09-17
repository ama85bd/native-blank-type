import { View, Text, StyleSheet, Button } from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/database';
import Toast from 'react-native-toast-message';
import showToast from '../utils/Toast';
import { useAppDispatch } from '../services/store';
import { loginUser } from '../features/login/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IUserLogin } from '../models/baseModel';

interface IAllPlacesProps {
  route: any;
}

const AllPlaces: React.FunctionComponent<IAllPlacesProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
  const isFocused = useIsFocused();
  const value = AsyncStorage.getItem('user');
  console.log('AsyncStorage value', value);
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
  const data: IUserLogin = {
    email: 'ashique@lged.gov.bd',
    password: 'Lged@1234',
  };
  const rundispatch = async () => {
    await dispatch(loginUser(data));
  };

  const startLocationTracking = async () => {
    const response = await axios.post(
      'https://apidev.lged.gov.bd/api/auth/login',
      {
        email: 'ashique@lged.gov.bd',
        password: 'Lged@1234',
      }
    );
    console.log('response startLocationTracking', response);
  };
  useEffect(() => {
    rundispatch();
  }, [rundispatch, data]);
  useEffect(() => {
    startLocationTracking();
  }, []);

  const showToastHere = () => {
    showToast('info', 'Hello', 'This is some something 👋');
    // rundispatch();
    // Toast.show({
    //   type: 'error',
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    // });
  };
  return (
    <View>
      {/* <PlacesList places={loadedPlaces} />; */}
      <Button title='Show toast' onPress={showToastHere} />
    </View>
    // <PlacesList places={loadedPlaces} />
  );
};

export default AllPlaces;

const styles = StyleSheet.create({});
