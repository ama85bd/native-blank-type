import { StyleSheet, FlatList, View, Text } from 'react-native';

interface IListProps {
  data: any;
}

const List: React.FunctionComponent<IListProps> = ({ data }) => {
  return data?.map((dataPoint: any) => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
};

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: '#f8d3be',
  },
  itemText: {
    color: '#4b1d03',
    textAlign: 'center',
  },
});
