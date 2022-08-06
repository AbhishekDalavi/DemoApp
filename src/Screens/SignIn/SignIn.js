import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase.db'});

const SignIn = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();
  const signIn = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_auth (user_name, user_password) VALUES (?,?)',
        [userName, password],
        (tx, results) => {
          console.log('Results', results);
          if (results.rowsAffected > 0) {
            console.log('sign In successfully');
            navigation.replace('authenticatedStack');
          } else console.log('sign in error');
        },
      );
    });
  };
  return (
    <View style={styles.containerStyle}>
      <View style={{width: '70%'}}>
        <View style={{width: '100%'}}>
          <Text style={styles.labelStyle}>UserName:-</Text>
          <TextInput
            value={userName}
            onChangeText={value => setUserName(value)}
            placeholder="Enter User Name"
            keyboardType="email-address"
            placeholderTextColor={'#B8B6B5'}
            style={styles.textInputStyle}
          />
        </View>
        <View style={{width: '100%', marginTop: 15}}>
          <Text style={styles.labelStyle}>Password:-</Text>
          <TextInput
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder="Enter User Name"
            secureTextEntry
            autoCorrect={false}
            textContentType={'password'}
            returnKeyType="go"
            placeholderTextColor={'#B8B6B5'}
            style={styles.textInputStyle}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.SignInStyle,
            {opacity: !userName || !password || password.length < 8 ? 0.5 : 1},
          ]}
          onPress={() => signIn()}
          disabled={!userName || !password || password.length < 8}>
          <Text style={[styles.labelStyle, {textAlign: 'center'}]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'left',
    marginHorizontal: 5,
  },
  SignInStyle: {
    backgroundColor: '#329209',
    width: '30%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  textInputStyle: {
    height: 35,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontSize: 14,
    borderRadius: 5,
    borderBottomColor: '#B8B6B5',
    borderBottomWidth: 0.5,
  },
});
