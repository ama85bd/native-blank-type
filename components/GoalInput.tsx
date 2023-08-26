import { useState } from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  GestureResponderEvent,
  Modal,
  Image,
} from 'react-native';

interface IGoalInputProps {
  onAddGoal: (event: GestureResponderEvent) => void;
  showModal: boolean;
  cancerModal?: () => void;
}

const GoalInput: React.FunctionComponent<IGoalInputProps> = ({
  onAddGoal,
  showModal,
  cancerModal,
}) => {
  const [enteredGoal, setEnteredGoal] = useState<any>('');
  function goalInputHandler(e: any) {
    setEnteredGoal(e);
  }

  function addGoalHandler() {
    onAddGoal(enteredGoal);
    setEnteredGoal('');
  }
  return (
    <Modal visible={showModal} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/goal.png')}
        />
        <TextInput
          onChangeText={goalInputHandler}
          style={styles.textInput}
          placeholder='Your course goal!'
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Add Goal' onPress={addGoalHandler} color='#5e0acc' />
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={cancerModal} color='#f31282' />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#311b6b',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '80%',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: '30%',
    marginHorizontal: 8,
  },
});
