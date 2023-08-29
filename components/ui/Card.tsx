import { Dimensions, StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';

interface ICardProps {
  children: any;
}

const Card: React.FunctionComponent<ICardProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    //shadow for android
    elevation: 4,
    //shadow for ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
