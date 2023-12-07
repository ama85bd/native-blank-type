import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notification from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

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
  const [soundOff, setSoundOff] = useState(false);
  const [repeatSound, setRepeatSound] = useState(true);
  const [notifyResponse, setNotifyResponse] = useState('');
  console.log('notifyResponse', notifyResponse);
  console.log('soundOff out', soundOff);

  const soundObject = new Audio.Sound();
  const loadSound = async () => {
    try {
      await soundObject.loadAsync(require('./assets/danger-notify.wav'));
    } catch (error) {
      console.error('Error loading sound', error);
    }
  };

  const playSound = async () => {
    // alert('hi');
    // loadSound();
    await soundObject.replayAsync();
    await soundObject.setIsLoopingAsync(true);
  };
  const playSoundOff = async () => {
    await soundObject.unloadAsync();
    alert('hhhh');
  };

  useEffect(() => {
    // loadSound();
    // const playSound = async () => {
    //   await soundObject.replayAsync();
    // };
    // playSound();
    if (notifyResponse === 'Max') {
      // playSound();
      // soundObject.loadAsync(require('./assets/notify.wav'));
      // soundObject.replayAsync();
      // soundObject.setIsLoopingAsync(true);
    }
    // else {
    //   playSoundOff();
    // }
  }, [notifyResponse]);
  useEffect(() => {
    if (soundOff) {
      console.log('soundOff', soundOff);
      soundObject.unloadAsync();
      // setNotifyResponse('');
      // setSoundOff(false);
      // setRepeatSound(false);
    }
  }, [soundOff]);

  // useEffect(() => {
  //   const requestNotificationPermission = async () => {
  //     const { status } = await Notification.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('Permission to receive notifications was denied.');
  //     }
  //   };

  //   requestNotificationPermission();

  //   const subscription1 = Notification.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log('notification', notification);
  //       console.log(notification.request.content.data);
  //     }
  //   );

  //   const subscription2 = Notification.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log('response', response);
  //     }
  //   );

  //   return () => {
  //     subscription1.remove();
  //     subscription2.remove();
  //   };
  // }, []);

  // async function scheduleNotificationHandler() {
  //   // Prepare the notification channel
  //   await Notification.setNotificationChannelAsync('my-sound', {
  //     name: 'default',
  //     importance: Notification.AndroidImportance.MAX,
  //     sound: 'notify.wav', // <- for Android 8.0+, see channelId property below
  //     lightColor: '#FF231F7C',
  //     vibrationPattern: [0, 250, 250, 250],
  //   });

  //   await Notification.scheduleNotificationAsync({
  //     content: {
  //       title: 'My first local notification',
  //       body: 'This is the body of the notification',
  //       data: { userName: 'Max' },
  //       sound: 'notify.wav',
  //     },

  //     trigger: {
  //       seconds: 5,
  //       channelId: 'my-sound',
  //     },
  //   });
  // }

  useEffect(() => {
    setSoundOff(false);
    // Request permission for notifications
    const requestNotificationPermission = async () => {
      const { status } = await Notification.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to receive notifications was denied.');
      }
    };

    requestNotificationPermission();

    // Set up and load the custom sound

    loadSound();

    // Handle notifications when the app is in the foreground
    const foregroundSubscription = Notification.addNotificationReceivedListener(
      async (notification) => {
        console.log('Notification received in the foreground:', notification);
        // Play the custom sound when a notification is received
        await soundObject.replayAsync();
        setNotifyResponse(notification.request.content.data.userName);
        // await soundObject.setIsLoopingAsync(true);
      }
    );

    const subscription1 = Notification.addNotificationReceivedListener(
      (notification) => {
        console.log('notification', notification);
        console.log(notification.request.content.data);
      }
    );

    const subscription2 = Notification.addNotificationResponseReceivedListener(
      async (response: any) => {
        if (
          response.notification.request.content.title ===
          'Custom Sound Notification'
        ) {
          setSoundOff(true);
          setNotifyResponse('');
          // await soundObject.setIsLoopingAsync(false);
        }

        console.log(
          'response title',
          response.notification.request.content.title
        );
        console.log('response', response.notification.request.content);
      }
    );

    // Cleanup subscriptions and resources when the component unmounts
    return () => {
      foregroundSubscription.remove();
      soundObject.unloadAsync(); // Unload the sound
      subscription1.remove();
      subscription2.remove();
    };
  }, [soundOff]);

  const sendNotification = async () => {
    await Notification.scheduleNotificationAsync({
      content: {
        title: 'Custom Sound Notification',
        body: 'This is a notification with a custom sound!',
        data: { userName: 'Max' },
        sound: false,
      },
      trigger: null,
      // trigger: {
      //   seconds: 5,
      //   repeats: soundOff,
      // },
    });
  };

  return (
    <View style={styles.container}>
      <Button title='Schedule Notification' onPress={sendNotification} />
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
