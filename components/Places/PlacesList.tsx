import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../services/store';
import { signOut } from '../../features/login/loginSlice';

interface IPlacesListProps {
  places?: any;
}

const PlacesList: React.FunctionComponent<IPlacesListProps> = ({ places }) => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  function logOut() {
    Alert.alert('Out');
    dispatch(signOut());
  }

  function selectPlaceHandler(id: any) {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
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
