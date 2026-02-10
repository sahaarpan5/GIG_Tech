
import React, { useEffect, useState } from 'react';

import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,




} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const NewWelcomeScreen = () => {
    const navigation = useNavigation()

    //    useEffect(() => {
    //     const timer = setTimeout(() => {
    //       try {
    //         navigation.replace('LoginScreen'); // navigate after 2 sec
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }, 2000); // 2 seconds

    //     // cleanup timer on unmount
    //     return () => clearTimeout(timer);
    //   }, []);




    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/Welcome-bg.png')} // your top background image
                style={styles.topImage}
                resizeMode="cover"
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/gigworker.png')} // your top background image
                        style={styles.gigworker}

                    />

                    <Text style={styles.titleText}>Find Gigs, Work &{'\n'}Get Paid</Text>
                    <Text style={styles.subtitleText}>Discover flexible job opportunities and{'\n'}
                        earn money instantly.</Text>

                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.replace('NewLoginScreen')}>
                        <Text style={styles.btnText}>Get Started</Text>
                    </TouchableOpacity>


                </View>



            </ImageBackground>


        </View>
    );
};

const styles = StyleSheet.create({
    topImage: {
        height: '100%',
        width: '100%',

    },
    gigworker: {
        position: 'absolute',
        top: '10%',
        width: 300,
        height: 300,
        alignSelf: 'center',
        // Center the image
    },
    titleText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 30,
        fontWeight: '700',
        lineHeight: 40,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#047282',
        marginTop: 200
    },
    subtitleText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        marginTop: 10,
        color: '#777575F0'
    },
    btn: {
        borderRadius: 14,
        height: 60,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: '#FEA92F'
    },
    btnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#fffffff0'
    },




});

export default NewWelcomeScreen;
