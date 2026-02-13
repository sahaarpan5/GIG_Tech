import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewDashboardScreen from '../Page/NewDashboardScreen';
import AttendanceDashboard from '../Page/AttendanceDashboard';
import AvailableSLScreen from '../Page/AvailableSLScreen';
import AppliedSLScreen from '../Page/AppliedSLScreen';
import RegistrationScreen from '../Page/RegistrationScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(30,130,191,0.95)',
                    height: 70,
                    paddingBottom: 10,
                    borderTopLeftRadius: 44,
                    borderTopRightRadius: 40,
                    borderTopWidth: 0,
                },

                tabBarLabelStyle: {
                    fontFamily: 'InstrumentSans-Bold',
                    fontSize: 12,
                    fontWeight: '700',
                    lineHeight: 21,
                    letterSpacing: 0,
                    textAlign: 'center',
                    marginBottom: 4,
                    color: '#FFFFFF',
                    marginTop: 5
                },

                tabBarIcon: ({ focused }) => {
                    let iconSource;

                    switch (route.name) {
                        case 'Home':
                            iconSource = focused
                                ? require('../../assets/home_active.png')
                                : require('../../assets/home.png');
                            break;

                        case 'Wallet':
                            iconSource = focused
                                ? require('../../assets/wallet_active.png')
                                : require('../../assets/wallet.png');
                            break;

                        case 'Notification':
                            iconSource = focused
                                ? require('../../assets/notification_active.png')
                                : require('../../assets/notification.png');
                            break;

                        case 'Gigs':
                            iconSource = focused
                                ? require('../../assets/gigs_active.png')
                                : require('../../assets/gigs.png');
                            break;

                        case 'Profile':
                            iconSource = focused
                                ? require('../../assets/profile_active.png')
                                : require('../../assets/profile.png');
                            break;

                        default:
                            iconSource = require('../../assets/home.png');
                    }

                    return (
                        <Image
                            source={iconSource}
                            style={{
                                width: focused ? 50 : 22,
                                height: focused ? 50 : 22,
                                resizeMode: 'contain',
                                marginTop: focused ? -15 : 0,

                            }}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={NewDashboardScreen} />
            <Tab.Screen name="Wallet" component={NewDashboardScreen} />
            <Tab.Screen name="Notification" component={AvailableSLScreen} />
            <Tab.Screen name="Gigs" component={AvailableSLScreen} />
            <Tab.Screen name="Profile" component={RegistrationScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
