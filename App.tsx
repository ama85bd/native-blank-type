import { useState } from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import GoalItem from './components/Goaltem';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [listOfGoal, setListOfGoal] = useState<any>([]);
  function goalInputHandler(e: any) {
    setEnteredGoal(e);
  }

  function addGoalHandler() {
    // setListOfGoal([...listOfGoal, enteredGoal]);
    setListOfGoal((currentGoal: any) => [
      ...currentGoal,
      // { text: enteredGoal, key: Math.random().toString() },

      // if get data from api without key but has another unique field
      // like id then in FlatList should use keyExtractor
      { text: enteredGoal, id: Math.random().toString() },
    ]);
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={goalInputHandler}
          style={styles.textInput}
          placeholder='Your course goal!'
        />
        <Button title='Add Goal' onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {/* <ScrollView>
          {listOfGoal.map((goal: any, index: any) => (
            <View style={styles.goalItem} key={'key' + index}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          data={listOfGoal}
          renderItem={(itemData: any) => {
            return <GoalItem text={itemData.item.text} />;
          }}
          keyExtractor={(item: any, index: any) => {
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '75%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
});
