import { Text, StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';

interface IInstructionTextProps {
  children: any;
  style?: any;
}

const InstructionText: React.FunctionComponent<IInstructionTextProps> = ({
  children,
  style,
}) => {
  return <Text style={[styles.instrutionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instrutionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
