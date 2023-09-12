import React from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TRACKING = 'location-tracking';

var l1;
var l2;

function UserLocation() {
  const [locationStarted, setLocationStarted] = React.useState(false);

  const startLocationTracking = async () => {
    const response = await axios.get('https://ipinfo.io');
    const { loc, city, region, country } = response.data;
    console.log('Location:', loc);
    console.log('City:', city);
    console.log('Region:', region);
    console.log('Country:', country);
    // const testConn = await Location.startLocationUpdatesAsync(
    //   LOCATION_TRACKING,
    //   {
    //     accuracy: Location.Accuracy.Highest,
    //     timeInterval: 5000,
    //     distanceInterval: 0,
    //   }
    // );
    // console.log('testConn', testConn);
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Lowest,
      timeInterval: 5000,
      //   distanceInterval: 0,
      showsBackgroundLocationIndicator: true,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setLocationStarted(hasStarted);
    console.log('tracking started?', hasStarted);
  };

  //   React.useEffect(() => {
  //     const config = async () => {
  //       let resf = await Location.requestForegroundPermissionsAsync();
  //       let resb = await Location.requestBackgroundPermissionsAsync();
  //       if (resf.status != 'granted' && resb.status !== 'granted') {
  //         console.log('Permission to access location was denied');
  //       } else {
  //         console.log('Permission to access location granted');
  //       }
  //     };

  //     config();
  //   }, []);

  const startLocation = async () => {
    startLocationTracking();
    // const { coords } = await Location.getCurrentPositionAsync({});
    // const { latitude, longitude } = coords;
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  };

  const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
      if (tracking) {
        Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      }
    });
  };

  return (
    <View>
      {locationStarted ? (
        <TouchableOpacity onPress={stopLocation}>
          <Text style={styles.btnText}>Stop Tracking</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startLocation}>
          <Text style={styles.btnText}>Start Tracking</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    backgroundColor: 'green',
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }: any) => {
  console.log('data', data);
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    l1 = lat;
    l2 = long;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});

export default UserLocation;
