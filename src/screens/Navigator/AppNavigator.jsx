import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from '../Page/Welcome';
import LoginScreen from '../Page/LoginScreen';
import RegistrationScreen from '../Page/RegistrationScreen';
import AttendanceReport from '../Page/AttendanceReport';
import DashboardScreen from '../Page/DashboardScreen';
import AttendanceDashboard from '../Page/AttendanceDashboard';
import AttendanceManage from '../Page/AttendanceManage';
import AvailableSLScreen from '../Page/AvailableSLScreen';
import JobDetailsScreen from '../Page/JobDetailsScreen';
import AppliedSLScreen from '../Page/AppliedSLScreen';
import NewWelcomeScreen from '../Page/NewWelcomeScreen';
import NewLoginScreen from '../Page/NewLoginScreen';

import MainTabNavigator from '../Navigator/MainTabNavigator';
import AttendanceMarkScreen from '../Page/AttendanceMarkScreen';



const Stack = createNativeStackNavigator();


const AppNavigator = () => {

  return (
   <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="NewWelcomeScreen"
      >
        {/* Auth Screens */}
        <Stack.Screen name="NewWelcomeScreen" component={NewWelcomeScreen} />
        <Stack.Screen name="NewLoginScreen" component={NewLoginScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="AttendanceManage" component={AttendanceManage} />
         <Stack.Screen name="AttendanceMarkScreen" component={AttendanceMarkScreen} />

        {/* Main App (Bottom Tabs) */}
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      </Stack.Navigator>
    </SafeAreaProvider>


  );
};

export default AppNavigator;