import { View, Text, StyleSheet } from 'react-native';

interface IPrimaryButtonProps {
  children: any;
}

const PrimaryButton: React.FunctionComponent<IPrimaryButtonProps> = ({
  children,
}) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
