import * as SQLite from 'expo-sqlite';
import { Place } from '../models/Place';

const database = SQLite.openDatabase('place.db');

export function init() {
  const promise = new Promise((resolve: any, reject: any) => {
    // database.transaction((tx) => {
    //   tx.executeSql(
    //     `DROP TABLE IF EXISTS places`,
    //     [],
    //     (_, result) => {
    //       // Table deleted successfully
    //       console.log('Table deleted successfully');
    //     },
    //     (_, error: any) => {
    //       return reject(error);
    //     }
    //   );
    // });
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lon REAL NOT NULL
              )`,
        [],
        () => {
          resolve();
        },
        (_, error: any) => {
          return reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place: Place) {
  const promise = new Promise((resolve: any, reject: any) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title,imageUri,address,lat,lon) 
      VALUES (?, ?, ?, ?, ? )`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lon,
        ],
        (_, results) => {
          resolve(results);
        },
        (_, error: any) => {
          return reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve: any, reject: any) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places `,
        [],
        (_, results) => {
          const places = [];
          for (const dp of results.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lon: dp.lon,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error: any) => {
          return reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaceDetails(id: any) {
  const promise = new Promise((resolve: any, reject: any) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, results) => {
          resolve(results.rows._array[0]);
        },
        (_, error: any) => {
          return reject(error);
        }
      );
    });
  });
  return promise;
}
