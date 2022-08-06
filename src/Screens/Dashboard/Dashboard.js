import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'UserDatabase.db'});

const Dashboard = () => {
  const navigation = useNavigation();

  const signOut = () => {
    db.transaction(txn => {
      txn.executeSql('DROP TABLE IF EXISTS table_auth', [], (tx, res) => {
        if (res.rows.length == 0) {
          navigation.replace('authStack');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello, This is dashboard</Text>
      <TouchableOpacity style={styles.ButtonStyle} onPress={() => signOut()}>
        <Text style={styles.textStyle}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  textStyle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  ButtonStyle: {
    width: '35%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FD8000',
    borderColor: '#FD8000',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
  },
});
