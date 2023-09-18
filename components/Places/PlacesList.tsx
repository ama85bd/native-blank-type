import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { signOut } from '../../features/login/loginSlice';
import {
  companyListSelector,
  fetchCompanyList,
} from '../../features/company/getCompanyListSlice';

interface IPlacesListProps {
  places?: any;
}

const PlacesList: React.FunctionComponent<IPlacesListProps> = ({ places }) => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const companyList = useAppSelector(companyListSelector.selectAll);
  console.log('companyList', companyList);
  const { companyListLoaded, status } = useAppSelector(
    (state) => state.companyList
  );

  function logOut() {
    dispatch(signOut());
  }

  function selectPlaceHandler(id: any) {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  }
  function getCompany() {
    if (!companyListLoaded) dispatch(fetchCompanyList());
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Button title='Logout' onPress={logOut} />
      <Button title='Company' onPress={getCompany} />
      <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <PlaceItem place={item.item} onSelect={selectPlaceHandler} />
        )}
      />
    </View>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
