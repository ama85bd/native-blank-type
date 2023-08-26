import { useState } from 'react';
import {
  Button,
  FlatList,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/Goaltem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [listOfGoal, setListOfGoal] = useState<any>([]);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoal: any) {
    // setListOfGoal([...listOfGoal, enteredGoal]);
    setListOfGoal((currentGoal: any) => [
      ...currentGoal,
      // { text: enteredGoal, key: Math.random().toString() },

      // if get data from api without key but has another unique field
      // like id then in FlatList should use keyExtractor
      { text: enteredGoal, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id: any) {
    setListOfGoal((currentGoal: any) => {
      return currentGoal.filter((goal: any) => goal.id !== id);
    });
  }
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#5e0acc'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          showModal={modalIsVisible}
          onAddGoal={addGoalHandler}
          cancerModal={endAddGoalHandler}
        />
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
              return (
                <GoalItem
                  onDeleteItem={deleteGoalHandler}
                  text={itemData.item.text}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item: any, index: any) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  goalsContainer: {
    flex: 5,
  },
});
