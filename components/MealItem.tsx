import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealDetails from './MealDetails';

interface IMealItemProps {
  id: any;
  title: any;
  imageUrl: any;
  duration: any;
  complexity: any;
  affordability: any;
}

const MealItem: React.FunctionComponent<IMealItemProps> = ({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) => {
  const navigation: any = useNavigation();

  function selectMealItemHandler() {
    navigation.navigate('MealsDetail', {
      mealId: id,
    });
  }

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectMealItemHandler}
      >
        <View style={styles.innerMealItem}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
            style={styles.datailStyle}
            textStyle={styles.detailText}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: 'white',
    //android
    elevation: 4,
    //ios
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  //for ios broder radius
  innerMealItem: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },

  buttonPressed: {
    opacity: 0.5,
  },
  detailText: {
    color: 'black',
  },
  datailStyle: {},
});
