import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from '../Page/Welcome';
import LoginScreen from '../Page/LoginScreen';
import RegistrationScreen from '../Page/RegistrationScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {

  return (
    <SafeAreaProvider >

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
       
      </Stack.Navigator>

    </SafeAreaProvider>


  );
};

export default AppNavigator;