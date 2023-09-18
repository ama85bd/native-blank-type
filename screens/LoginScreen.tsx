import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

interface ILoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FunctionComponent = () => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
});
