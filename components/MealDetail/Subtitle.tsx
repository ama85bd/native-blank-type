import { StyleSheet, FlatList, View, Text } from 'react-native';

interface ISubtitleProps {
  children: any;
}

const Subtitle: React.FunctionComponent<ISubtitleProps> = ({ children }) => {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{children}</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 13,
    marginVertical: 4,
    borderBottomColor: '#f8d3be',
    borderBottomWidth: 1,
  },

  subTitle: {
    color: '#f8d3be',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
