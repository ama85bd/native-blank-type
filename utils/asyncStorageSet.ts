import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveItemToAsyncStorage = async (item: any) => {
  try {
    await AsyncStorage.setItem('item_key', JSON.stringify(item));
  } catch (error) {
    console.error('Error saving item to AsyncStorage:', error);
  }
};
