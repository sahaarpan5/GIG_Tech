import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform, PermissionsAndroid,
  Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
Geocoder.init('AIzaSyBuxUn1s4S2yv8fqwd0wGUTFegxNyASL1g');

const AttendanceMarkScreen = () => {
  const [location, setLocation] = useState(22.8000, 88.3700);
  const [address, setAddress] = useState('Fetching address......');
  const navigation = useNavigation();
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to mark attendance.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'Location permission is required.');
            return;
          }
        } else {
          Geolocation.requestAuthorization();
          // const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          // if (permission !== RESULTS.GRANTED) {
          //   Alert.alert('Permission Denied', 'Location permission is required.');
          //   return;
          // }
          // iOS only
        }

        // Now get location
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });

            Geocoder.from(latitude, longitude)
              .then((json) => {
                if (json.results.length > 0) {
                  const address = json.results[0].formatted_address;
                  setAddress(address);
                } else {
                  setAddress('Address not found');
                }
              })
              .catch((error) => {
                console.warn('❌ Geocoding error:', error);
                setAddress('Unable to get address');
              });
          },
          (error) => {
            console.warn('❌ Error getting location:', error);
            setAddress('Unable to get location');
          },
          {
            enableHighAccuracy: false,
            timeout: 35000,
            maximumAge: 10000,
          }
        );
      } catch (err) {
        console.warn('❌ Permission or location error:', err);
      }
    };

    getLocation();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <ImageBackground
          source={require('../../assets/Welcome-bg.png')} // your top background image
          style={styles.topImage}
          resizeMode="cover"
        >
          <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>navigation.goBack()}>
            <Image source={require('../../assets/cross.png')} style={{ height: 20, width: 20,margin:20}} />
          </TouchableOpacity>
          <View style={styles.card}>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeBtn}>

            </TouchableOpacity>

            {/* Map Section */}
            <View style={styles.mapContainer}>
              {location && (
                <MapView style={styles.map} region={location}>
                  <Marker coordinate={location} title="Your Location" />
                </MapView>
              )}


              {/* Check In Button */}

              <View style={styles.checkInWrapper}>
                <View style={[styles.checkInBtn, { backgroundColor: '#FFFFFF', width: 120, height: 120,borderRadius:60 }]}>
                  <TouchableOpacity style={styles.checkInBtn}>
                    <Image source={require('../../assets/clock.png')} style={{ height: 26, width: 26, tintColor: '#FFFFFF' }} />
                    <Text style={styles.checkInText}>Check In</Text>
                  </TouchableOpacity>
                </View>


              </View>

            </View>

            {/* Time */}
            <Text style={styles.timeText}>10:00 AM</Text>

            {/* Date & Location Row */}
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                {/* <Icon name="clock" size={14} color="#777" /> */}
                <Text style={styles.smallText}>
                  Current Location: {address}
                </Text>
              </View>
             
            </View>

            {/* User Info */}
            <View style={styles.userRow}>
              <Image
                source={{
                  uri: 'https://i.pravatar.cc/100',
                }}
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>Rehyan Roy</Text>
                <Text style={styles.email}>
                  Rohanadmin2015@gmail.com
                </Text>
              </View>
              <View style={styles.jobTag}>
                <Text style={styles.jobText}>Warehouse Helper</Text>
                <Text style={styles.companyText}>Logistic Company</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Checklist Header */}
            <View style={styles.row}>
              {/* <MaterialIcons name="assignment-turned-in" size={18} color="#2BB673" /> */}
              <Text style={styles.checklistTitle}> Check List For Job</Text>
            </View>

            {/* Checklist Items */}
            <View style={styles.checklistBox}>
              {[
                'Monitor stock levels and verify label accuracy.',
                'Check forklifts',
                'Sort & Label Items',
              ].map((item, index) => (
                <View key={index} style={styles.checkItem}>
                  {/* <MaterialIcons
                  name="check-circle"
                  size={18}
                  color="#F6A623"
                /> */}
                  <Text style={styles.checkText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Attendance Button */}
            <TouchableOpacity style={styles.attendanceBtn}>
              <Text style={styles.attendanceText}>View Attendance</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>

        {/* Card Container */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendanceMarkScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: 20
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 2,
  },
  mapContainer: {
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    
    
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  checkInWrapper: {
    position: 'absolute',
    bottom: -45,       // push outside map
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },

  checkInBtn: {
    backgroundColor: '#F6A623',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderWidth:1,
    borderColor:'#d6c7c7'
  },
  checkInText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  timeText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  smallText: {
    fontSize: 12,
    color: '#777',
    marginLeft: 5,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  email: {
    fontSize: 12,
    color: '#777',
  },
  jobTag: {
    backgroundColor: '#EAF6FF',
    padding: 6,
    borderRadius: 8,
  },
  jobText: {
    fontSize: 12,
    fontWeight: '600',
  },
  companyText: {
    fontSize: 10,
    color: '#777',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  checklistBox: {
    backgroundColor: '#F9FAFB',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkText: {
    marginLeft: 8,
    fontSize: 13,
    flex: 1,
  },
  attendanceBtn: {
    backgroundColor: '#F6A623',
    marginHorizontal: 40,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  attendanceText: {
    color: '#fff',
    fontWeight: '600',
  },
  topImage: {
    flex: 1

  },
  map: {
    width: '100%',
    height: '100%',
  },
});

