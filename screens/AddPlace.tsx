import { View, Text, StyleSheet } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';

interface IAddPlaceProps {
  title: any;
  color: any;
  onPress: () => void;
}

const AddPlace: React.FunctionComponent = () => {
  return <PlaceForm />;
};

export default AddPlace;

const styles = StyleSheet.create({});
