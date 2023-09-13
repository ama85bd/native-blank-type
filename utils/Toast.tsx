import Toast from 'react-native-toast-message';
const showToast = (type: any, text1: any, text2?: any) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

export default showToast;
