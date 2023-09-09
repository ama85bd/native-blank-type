import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

interface IPlaceItemProps {
  place: any;
  onSelect?: () => void;
}

const PlaceItem: React.FunctionComponent<IPlaceItemProps> = ({
  place,
  onSelect,
}) => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
