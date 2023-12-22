import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
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
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      console.log('finalStatus', finalStatus);

      if (finalStatus !== 'granted') {
        try {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
          console.log('Richiesta permessi', status);
        } catch (error) {
          console.error('Errore 2', error);
          return;
        }
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokenData);

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    }
    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('notification', notification);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('response', response);
      }
    );
    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  async function scheduleNotifictionHandler() {
    // await Notifications.setNotificationChannelAsync('new-emails', {
    //   name: 'E-mail notifications',
    //   sound: 'notify.wav', // Provide ONLY the base filename
    //   importance: Notifications.AndroidImportance.DEFAULT,
    // });

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "You've got mail! 📬",
    //     sound: 'notify.wav', // Provide ONLY the base filename
    //   },
    //   trigger: {
    //     seconds: 2,
    //     channelId: 'new-emails',
    //   },
    // });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My local notification',
        body: 'This the body of notification',
        data: { userName: 'Asif' },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[SzsqabOzNeN7mW4huQbGre]',
        title: 'Test - sent from a device',
        dody: 'This is test body',
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Button title='Push Notification' onPress={sendPushNotificationHandler} />
      <Button title='Notify' onPress={scheduleNotifictionHandler} />
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
