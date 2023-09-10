import { View, Text, StyleSheet } from 'react-native';
import PlacesList from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

interface IAllPlacesProps {
  route: any;
}

const AllPlaces: React.FunctionComponent<IAllPlacesProps> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currPlaces: any) => [
        ...currPlaces,
        route.params?.place,
      ]);
    }
  }, [isFocused, route.params]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
