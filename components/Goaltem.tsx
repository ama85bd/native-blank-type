import { View, Text, StyleSheet, Pressable } from 'react-native';

interface IGoalItemProps {
  text: any;
  id: any;
  onDeleteItem?: (id: any) => void;
}

const GoalItem: React.FunctionComponent<IGoalItemProps> = ({
  text,
  onDeleteItem,
  id,
}) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#fff' }}
        onPress={onDeleteItem?.bind(this, id)}
        //for ios
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    padding: 8,
    color: 'white',
  },
});
