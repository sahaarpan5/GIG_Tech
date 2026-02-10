
import React, { useEffect, useRef, useState } from 'react';

import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,




} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const NewLoginScreen = () => {
    const navigation = useNavigation()
    const [pin, setPin] = useState(['', '', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        if (!/^\d?$/.test(text)) return;

        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);

        if (text && index < 4) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };






    return (
        <View style={{ flex: 1, }}>
            <ImageBackground
                source={require('../../assets/new-login-bg.png')} // your top background image
                style={styles.topImage}
                resizeMode="cover"
            >
                
                <Image
                    source={require('../../assets/login-img.png')} // your top background image
                    style={styles.gigworker}

                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        
                        <View style={{height:150}}></View>

                        <Text style={styles.titleText}>GIG Staffing</Text>
                        <Text style={styles.subtitleText}>Enter your 5-digit PIN to access your account</Text>
                        <View style={styles.pinRow}>
                            {pin.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={ref => (inputs.current[index] = ref)}
                                    value={digit}
                                    onChangeText={text => handleChange(text, index)}
                                    onKeyPress={e => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    secureTextEntry
                                    style={[
                                        styles.pinBox,
                                        digit === '' && styles.emptyBox,
                                    ]}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </View>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', flexDirection: 'column', width: '100%' }}>
                            <Text style={styles.forgotText}>Forgot PIN? Set New PIN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={()=>navigation.replace('NewDashboardScreen')}>
                            <Text style={styles.btnText}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', flexDirection: 'row', width: '100%', marginTop: 20 }} onPress={()=>navigation.replace('RegistrationScreen')}>
                            <Text style={styles.forgotText}>Don’t have an account? </Text>
                            <Text style={styles.signupText}> Sign Up</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAvoidingView>




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
        top: '5%',
        width: 400,
        height: 320,
        alignSelf: 'center',
        // Center the image
    },

    titleText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 40,
        fontWeight: '700',
        lineHeight: 40,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 220
    },
    subtitleText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        marginTop: 10,
        color: '#fffffff0'
    },
    forgotText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0,
        marginTop: 10,
        color: '#fffffff0',
        textAlign: 'right',
        right: 80
    },
    signupText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0,
        marginTop: 10,
        color: '#ff7253',
        textAlign: 'right',
        right: 80
    },
    btn: {
        borderRadius: 14,
        height: 60,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
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
    pinRow: {
        flexDirection: 'row',
    },
    pinBox: {
        width: 42,
        height: 42,
        marginHorizontal: 6,
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#ffffff', // active blue
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#ffffff',
        marginTop: 20
    },
    emptyBox: {
        borderColor: '#e0e0e0',
    },
   




});

export default NewLoginScreen;
