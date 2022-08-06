/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import AuthStack from './src/Navigations/AuthStack';
import AuthenticatedStack from './src/Navigations/AuthenticatedStack';
import {NavigationContainer} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import {ActivityIndicator, View} from 'react-native';
import Router from './src/Navigations/Router';
const db = openDatabase({name: 'UserDatabase.db'});

const App: () => Node = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    db.transaction(txn => {
      // txn.executeSql('DROP TABLE IF EXISTS table_auth', []);
      txn.executeSql(
        "SELECT * FROM sqlite_master WHERE type='table' AND name='table_auth'",
        [],
        (tx, res) => {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_auth', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_auth(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),  user_password VARCHAR(20))',
              [],
            );
          } else {
            txn.executeSql('SELECT * FROM table_auth', [], (txx, result) => {
              if (result.rows.length > 0) {
                setIsSignedIn(true);
              }
            });
          }
        },
      );
    });
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }, []);

  return (
    <NavigationContainer>
      {loader ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#B8B6B5'} />
        </View>
      ) : (
        <Router isSignedIn={isSignedIn} />
      )}
    </NavigationContainer>
  );
};

export default App;
