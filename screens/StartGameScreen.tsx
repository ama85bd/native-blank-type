import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

interface IStartGameSreenProps {
  text: any;
  id: any;
  onDeleteItem?: (id: any) => void;
}

const StartGameSreen: React.FunctionComponent = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput />
      <PrimaryButton>Reset</PrimaryButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </View>
  );
};

export default StartGameSreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 100,
    marginHorizontal: 24,
    backgroundColor: '#72063c',
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
