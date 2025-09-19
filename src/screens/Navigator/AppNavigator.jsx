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
import AppliedJobDetails from '../Page/AppliedJobDetails';




const Stack = createNativeStackNavigator();


const AppNavigator = () => {

  return (
    <SafeAreaProvider >

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="AttendanceReport" component={AttendanceReport} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="AttendanceDashboard" component={AttendanceDashboard} />
         <Stack.Screen name="AttendanceManage" component={AttendanceManage} />
         <Stack.Screen name="AvailableSLScreen" component={AvailableSLScreen} />
         <Stack.Screen name="JobDetailsScreen" component={JobDetailsScreen} />
          <Stack.Screen name="AppliedSLScreen" component={AppliedSLScreen} />
          <Stack.Screen name="AppliedJobDetails" component={AppliedJobDetails} />

      </Stack.Navigator>

    </SafeAreaProvider>


  );
};

export default AppNavigator;