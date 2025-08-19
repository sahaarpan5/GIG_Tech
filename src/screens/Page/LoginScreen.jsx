import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,

} from 'react-native';


const LoginScreen = () => {
    const [remember, setRemember] = useState(false);
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
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
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            style={styles.input}
                        />

                        {/* Remember checkbox */}
                        

                        {/* Login button */}
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        {/* Signup text */}
                        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
                             <Text style={styles.signupText}>
                            Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
                        </Text>
                        </TouchableOpacity>
                       
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
