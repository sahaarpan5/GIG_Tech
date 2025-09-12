import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, PermissionsAndroid, Alert, Modal, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// ✅ Adjust path as needed
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../util/API';
import { Loader } from '../../util/Loader';

Geocoder.init('AIzaSyBuxUn1s4S2yv8fqwd0wGUTFegxNyASL1g');



const AttendanceManage = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Fetching address......');
  const [modalVisible, setModalVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take attendance pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
        } else {
          const source = { uri: response.assets[0].uri };
          setCapturedImage(source);
        }
      }
    );
  };

  const markAttendance = async () => {
    if (!location) {
      Alert.alert('Location not available');
      return;
    }

    try {
      setLoading(true);

      // Get EmpCode (you can fetch from AsyncStorage if available)
      const empCode = await AsyncStorage.getItem('UserCode'); // same as login saved
      const latitude = location.latitude.toString();
      const longitude = location.longitude.toString();

      const response = await axios.post(
        API.POST_ATTENDANCE,
        {
          EmpCode: empCode || 'GC000003', // fallback if empty
          Latitude: latitude,
          Longitude: longitude,
        }
      );

      const res = response.data;
      console.log('Attendance Response:', res);

      if (res.Response_Code === '101') {
        setLoading(false);
        Alert.alert(
          'Success',
          'Punch-In marked successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('AttendanceDashboard'), // redirect
            },
          ]
        );
      } else {
        setLoading(false);
        Alert.alert('Failed', res.Response_Message || 'Failed to mark attendance.');
      }
    } catch (error) {
      setLoading(false);
      console.error('API Error:', error);
      Alert.alert('Error', 'Something went wrong while marking attendance.');
    }
  };

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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E63665' }}>
        <View style={{ flex: 1, backgroundColor: '#E63665', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
          <StatusBar backgroundColor="#E63665" barStyle="dark-content" />
          <View style={styles.container}>
            {loading && <Loader />}
            <View style={styles.toolheader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../asset/back-icon.png')} style={styles.headerIcon}></Image>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Manage</Text>
              <TouchableOpacity onPress={() => navigation.replace('DashboardScreen')}>
                <Image source={require('../../asset/home-icon.png')} style={styles.headerIcon}></Image>
              </TouchableOpacity>

            </View>
            {/* Map View */}
            <View style={{ flex: 2 }}>
              {location && (
                <MapView style={styles.map} region={location}>
                  <Marker coordinate={location} title="Your Location" />
                </MapView>
              )}

            </View>

            {/* Bottom Section */}
            <View style={styles.bottomContainer}>
              {/* Location Details */}
              <Text style={styles.locationTitleText}>
                Location
              </Text>
              <View style={styles.locationRow}>
                <Image
                  source={require('../../asset/maps.png')} // Replace with your fingerprint icon
                  style={styles.marker}
                />
                <Text style={styles.locationText}>
                  {address}
                </Text>
              </View>

              {/* Fingerprint + Attendance Text */}
              <TouchableOpacity style={styles.fingerprintContainer} onPress={markAttendance}>
                <Image
                  source={require('../../asset/fingerprint-scan.png')} // Replace with your fingerprint icon
                  style={styles.fingerprint}
                />
                <Text style={styles.attendanceText}>Mark{'\n'}Your Attendance</Text>
              </TouchableOpacity>

              {/* Attendance Report Button */}

              <View style={{ height: 40 }}></View>
            </View>


          </View>
        </View>
      </SafeAreaView>

    </SafeAreaProvider>


  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#00000012',
    backgroundColor: '#fff', // Important
    padding: 20,
    position: 'absolute', // ✅ To overlay on the map
    bottom: 0,
    left: 0,
    right: 0,
    height: '44%', // Adjust as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 20,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    color: '#444',
  },
  locationTitleText: {
    fontWeight: "700",
    fontSize: 16,
    color: '#af0909ff',
    marginBottom: 5,
    marginLeft: 35
  },
  fingerprintContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  fingerprint: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  camera: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  captureImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  marker: {
    width: 30,
    height: 30,
    bottom: 10

  },
  attendanceText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  reportButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 8,
  },
  attenMarkText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  backArrowbg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',

  },
  backArrow: {
    height: 30,
    width: 30
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  modalContainer: {
    height: 310,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '92%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.07, // 7% opacity
    shadowRadius: 18.5, // Half of 37px for similar blur effect
    elevation: 3,
    borderWidth: 1,
    borderColor: '#00000012'
  },
  closeButton: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
  },
  closeCircle: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // Android only
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    height: 46,
    paddingHorizontal: 20,
    backgroundColor: '#ECF7FF',
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'OpenSans-SemiBold', // Assuming you have the semi-bold variant of Open Sans
    fontWeight: '600', // Or 'bold' depending on platform/font setup
    fontSize: 20,
    lineHeight: 20, // 100% of 20px; consider increasing for better readability
    letterSpacing: 0,
    marginRight: 10,
    color: '#fffefeff',
  },
  closeicon: {
    height: 20,
    width: 20,
    tintColor: '#fff',
  },
  toolheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#E63665',
    height: 60,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF'
  },
});

export default AttendanceManage;
