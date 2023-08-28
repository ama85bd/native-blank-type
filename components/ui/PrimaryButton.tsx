import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../../constants/colors';

interface IPrimaryButtonProps {
  children: any;
  onPress?: () => void;
}

const PrimaryButton: React.FunctionComponent<IPrimaryButtonProps> = ({
  children,
  onPress,
}) => {
  // function pressHandler() {
  //   onPress()
  // }
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    margin: 4,
    overflow: 'hidden',
    borderRadius: 28,
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
