import { Text, StyleSheet, Platform } from 'react-native';

interface ITitleProps {
  children: any;
}

const Title: React.FunctionComponent<ITitleProps> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    // fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS !== 'android' ? 0 : 2,
    borderWidth: Platform.select({ ios: 2, android: 0 }),
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
  },
});
