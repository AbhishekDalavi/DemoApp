import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthenticatedStack from './AuthenticatedStack';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();
const Router = props => {
  const {isSignedIn} = props;
  return (
    <Stack.Navigator
      initialRouteName={isSignedIn ? 'authenticatedStack' : 'authStack'}>
      <Stack.Screen
        name="authStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="authenticatedStack"
        component={AuthenticatedStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
