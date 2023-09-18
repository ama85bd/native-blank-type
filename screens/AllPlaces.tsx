import { View, Text, StyleSheet, Button } from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/database';
import Toast from 'react-native-toast-message';
import showToast from '../utils/Toast';
import { useAppDispatch, useAppSelector } from '../services/store';
import {
  companyListSelector,
  fetchCompanyList,
} from '../features/company/getCompanyListSlice';
import { IUserLogin } from '../models/baseModel';
import { loginUser } from '../features/login/loginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAllPlacesProps {
  route: any;
}

const AllPlaces: React.FunctionComponent<IAllPlacesProps> = ({ route }) => {
  const [asyncStorage, setAsyncStorage] = useState(false);
  const dispatch = useAppDispatch();
  const { companyListLoaded, status } = useAppSelector(
    (state) => state.companyList
  );
  const companyList = useAppSelector(companyListSelector.selectAll);
  console.log('companyList', companyList);

  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
  const isFocused = useIsFocused();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const tokenLGED = await AsyncStorage.getItem('tokenLGED');
      const userRole = await AsyncStorage.getItem('userRole');
      if (value !== null) {
        console.log('Value retrieved successfully:', value);
        console.log('tokenLGED retrieved successfully:', tokenLGED);
        console.log('userRole retrieved successfully:', userRole);
      } else {
        console.log('Value not found.');
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  const data: IUserLogin = {
    email: 'ashique@lged.gov.bd',
    password: 'Lged@1234',
  };
  const rundispatch = async () => {
    await dispatch(loginUser(data)).then((e) => {
      console.log('e place all', e);
      setAsyncStorage(true);
    });
  };
  useEffect(() => {
    rundispatch();

    getData();
  }, [dispatch, rundispatch, data]);

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

  useEffect(() => {
    if (!companyListLoaded) dispatch(fetchCompanyList());
  }, [companyListLoaded]);

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
    // <View>
    //   {/* <PlacesList places={loadedPlaces} />; */}
    //   <Button title='Show toast' onPress={showToastHere} />
    // </View>
    <PlacesList places={loadedPlaces} />
  );
};

export default AllPlaces;

const styles = StyleSheet.create({});
