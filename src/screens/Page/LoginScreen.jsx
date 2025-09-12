import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    Alert,

} from 'react-native';
import API from '../../util/API';
import { Loader } from '../../util/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

     useEffect(() => {
        const loadData = async () => {
            try {
                const storedLoginID = await AsyncStorage.getItem('LoginId');
                setUsername(storedLoginID);

                const storedPassword = await AsyncStorage.getItem('Password');
                setPassword(storedPassword);

                

               






            } catch (error) {
                console.error('Error loading stored data:', error);
            }
        };

        loadData();
    }, []);


    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Validation', 'Please enter both Username and Password');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(API.GIG_LOGIN, {
                UserID: username,
                Password: password,
            });

            const res = response.data;
            console.log('Login Response:', res);

            if (res.Response_Code === '101') {
                const userData = res.Response_Data[0];

                // Save fields to AsyncStorage
                await AsyncStorage.multiSet([
                    ['LoginId', userData.LoginId?.toString() || ''],
                    ['Password', password],
                    ['UserId', userData.UserId?.toString() || ''],
                    ['UserName', userData.UserName || ''],
                    ['ClientName', userData.ClientName || ''],
                    ['ClientOfficeName', userData.ClientOfficeName || ''],
                    ['ClientOfficeAddress', userData.ClientOfficeAddress || ''],
                    ['SLPositionName', userData.SLPositionName || ''],
                    ['SLAgreementType', userData.SLAgreementType || ''],
                    ['SLWorkType', userData.SLWorkType || ''],
                    ['SLIsActive', userData.IsSLMap?.toString() || '0'],
                    ['SLStartDate', userData.SLStartDate || ''],
                    ['SLEndDate', userData.SLEndDate || ''],
                    ['UserCode', userData.UserCode || ''],

                ]);

                navigation.replace('DashboardScreen');
            } else {
                Alert.alert('Login Failed', res.Response_Message || 'Invalid credentials');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <Loader />}

            {/* Header with ImageBackground */}
            <ImageBackground
                source={require('../../asset/login-bg.jpg')} // 🔹 your gradient background image
                style={styles.header}
                resizeMode="cover"

            >

                <View style={{ bottom: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Login</Text>
                    <Image
                        source={require('../../asset/login-illustration.png')} // 🔹 your illustration
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#999"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />

                        {/* Remember checkbox */}


                        {/* Login button */}
                        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        {/* Signup text */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
                             <Text style={styles.signupText}>
                            Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
                        </Text>
                        </TouchableOpacity> */}

                    </View>
                </View>

            </ImageBackground>

            {/* Form Section */}

        </View>
    );
};

export default LoginScreen;

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
