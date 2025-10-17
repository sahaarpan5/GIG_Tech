
import React, { useEffect, useState } from 'react';

import {
    View,
    ImageBackground,
    StyleSheet,
    Image,




} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Welcome = () => {
    const navigation = useNavigation()

   useEffect(() => {
    const timer = setTimeout(() => {
      try {
        navigation.replace('LoginScreen'); // navigate after 2 sec
      } catch (error) {
        console.log(error);
      }
    }, 2000); // 2 seconds

    // cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);




    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/Welcome.png')} // your top background image
                style={styles.topImage}
                resizeMode="cover"
            >


            </ImageBackground>


        </View>
    );
};

const styles = StyleSheet.create({
    topImage: {
        height: '100%',
        width: '100%',

    },




});

export default Welcome;
