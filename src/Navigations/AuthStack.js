import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Dashboard from '../Screens/Dashboard/Dashboard';
import SignIn from '../Screens/SignIn/SignIn';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="signin">
      <Stack.Screen
        name="signin"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
