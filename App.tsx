import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notification from 'expo-notifications';
import { useEffect } from 'react';

Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notification.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to receive notifications was denied.');
      }
    };

    requestNotificationPermission();

    const subscription1 = Notification.addNotificationReceivedListener(
      (notification) => {
        console.log('notification', notification);
        console.log(notification.request.content.data);
      }
    );

    const subscription2 = Notification.addNotificationResponseReceivedListener(
      (response) => {
        console.log('response', response);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  async function scheduleNotificationHandler() {
    // Prepare the notification channel
    await Notification.setNotificationChannelAsync('my-sound', {
      name: 'default',
      importance: Notification.AndroidImportance.MAX,
      sound: '111.mp3', // <- for Android 8.0+, see channelId property below
    });

    await Notification.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification',
        data: { userName: 'Max' },
        sound: '111.mp3',
      },
      trigger: {
        seconds: 5,
        channelId: 'my-sound',
      },
    });
  }
  return (
    <View style={styles.container}>
      <Button
        title='Schedule Notification'
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
