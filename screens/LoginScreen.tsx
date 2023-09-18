import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import Button from '../components/UI/Button';
import { IUserLogin } from '../models/baseModel';
import { useAppDispatch } from '../services/store';
import { loginUser } from '../features/login/loginSlice';

interface ILoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const data: IUserLogin = {
    email: 'ashique@lged.gov.bd',
    password: 'Lged@1234',
  };
  const rundispatch = async () => {
    await dispatch(loginUser(data));
  };
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Login Screen</Text>
      <Button onPress={rundispatch}>Login</Button>
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
