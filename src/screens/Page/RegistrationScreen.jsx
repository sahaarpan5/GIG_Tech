import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    ScrollView,

} from 'react-native';


const RegistrationScreen = () => {

    return (
        <View style={styles.container}>
            {/* Header with ImageBackground */}
            <ImageBackground
                source={require('../../asset/login-bg.jpg')} // 🔹 your gradient background image
                style={styles.header}
                resizeMode="cover"

            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>User Registration</Text>
                        <Image
                            source={require('../../asset/registration-illustration.png')} // 🔹 your illustration
                            style={styles.illustration}
                            resizeMode="contain"
                        />
                        <ScrollView style={{ flex: 1 }}>
                            <View style={styles.form}>
                                <TextInput
                                    placeholder="First Name"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                />
                                <TouchableOpacity style={styles.input}>
                                    <Text style={styles.inouttext}>
                                        Date of Birth
                                    </Text>
                                </TouchableOpacity>

                                 <TouchableOpacity style={[styles.input,{justifyContent:'space-between', flexDirection: 'row',alignItems:'center'}]}>
                                    <Text style={styles.inouttext}>
                                        Gender
                                    </Text>
                                    <Image source={require('../../asset/dropDown.png')} style={{tintColor:'#999'}}/>
                                </TouchableOpacity>

                                  <TouchableOpacity style={[styles.input,{justifyContent:'space-between', flexDirection: 'row',alignItems:'center'}]}>
                                    <Text style={styles.inouttext}>
                                        Country
                                    </Text>
                                    <Image source={require('../../asset/dropDown.png')} style={{tintColor:'#999'}} />
                                </TouchableOpacity>
                                <TextInput
                                    placeholder="Mobile Number"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    keyboardType="phone-pad" 
                                    maxLength={10}
                                />

                               

                                {/* Remember checkbox */}


                                {/* Login button */}
                                <TouchableOpacity style={styles.loginBtn}>
                                    <Text style={styles.loginText}>Register</Text>
                                </TouchableOpacity>

                                
                                

                            </View>
                        </ScrollView>

                    </View>
                </KeyboardAvoidingView>



            </ImageBackground>

            {/* Form Section */}

        </View>
    );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        overflow: 'hidden',
        width: '100%',

    },
    title: { color: '#fff', fontSize: 26, fontWeight: '600', marginBottom: 25 },
    illustration: { width: 200, height: 200 },
    form: { padding: 20, marginTop: 50, width: '100%' },
    input: {
        backgroundColor: '#fddde6',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 15,
        fontSize: 16,
        width: '340'
    },
    inouttext: {
       color:'#999',
        
        fontSize: 16,
       
    },
    rememberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    rememberText: { marginLeft: 8, color: '#555' },
    loginBtn: {
        backgroundColor: '#E63665',
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    signupText: { textAlign: 'center', color: '#444' },
    signupLink: { color: '#f15f79', fontWeight: 'bold' },
});
