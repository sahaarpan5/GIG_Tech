import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    ImageBackground,
    Image,
} from 'react-native';


const HERO_IMAGE =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop';

const TABS = [
    { key: 'otp', label: 'OTP' },
    { key: 'password', label: 'Password' },
    { key: 'mpin', label: 'MPIN' },
];

const NewLoginScreen = () => {
      const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('otp');

    // OTP state
    const [mobile, setMobile] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpRefs = useRef([]);

    // Password state
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // MPIN state
    const [mpinMobile, setMpinMobile] = useState('');
    const [mpin, setMpin] = useState(['', '', '', '']);
    const mpinRefs = useRef([]);

    const handleSendOtp = () => {
        if (mobile.length !== 10) {
            Alert.alert('Invalid number', 'Please enter a valid 10-digit mobile number.');
            return;
        }
        setOtpSent(true);
    };

    const handleOtpChange = (value, index) => {
        const next = [...otp];
        next[index] = value.replace(/[^0-9]/g, '');
        setOtp(next);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleMpinChange = (value, index) => {
        const next = [...mpin];
        next[index] = value.replace(/[^0-9]/g, '');
        setMpin(next);
        if (value && index < 3) mpinRefs.current[index + 1]?.focus();
    };

    const handleMpinKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !mpin[index] && index > 0) {
            mpinRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpLogin = () => {
        if (otp.join('').length !== 6) {
            Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP.');
            return;
        }
        console.log('OTP login:', mobile, otp.join(''));
        navigation.replace('NewDashboardScreen')
    };

    const handlePasswordLogin = () => {
        if (!userId || !password) {
            Alert.alert('Missing fields', 'Please enter user ID and password.');
            return;
        }
        console.log('Password login:', userId, password);
         navigation.replace('NewDashboardScreen')
    };

    const handleMpinLogin = () => {
        if (mpinMobile.length !== 10 || mpin.join('').length !== 4) {
            Alert.alert('Invalid input', 'Please enter mobile and 4-digit MPIN.');
            return;
        }
        console.log('MPIN login:', mpinMobile, mpin.join(''));
         navigation.replace('NewDashboardScreen')
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* ============ HERO (remote image) ============ */}
                <ImageBackground
                    source={{ uri: HERO_IMAGE }}
                    style={styles.hero}
                    resizeMode="cover"
                >
                    <View style={styles.heroOverlay} />

                    <View style={styles.heroContent}>
                        <View style={styles.logoBadge}>
                            <Image
                                source={require('../../assets/genlogo.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={styles.heroTitle}>Welcome back</Text>
                        <Text style={styles.heroSubtitle}>Sign in to continue</Text>
                    </View>
                </ImageBackground>

                {/* ============ FORM CARD ============ */}
                <View style={styles.formCard}>
                    {/* Tab switcher */}
                    <View style={styles.tabBar}>
                        {TABS.map((tab) => {
                            const active = activeTab === tab.key;
                            return (
                                <TouchableOpacity
                                    key={tab.key}
                                    style={[styles.tabItem, active && styles.tabItemActive]}
                                    onPress={() => setActiveTab(tab.key)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.tabText, active && styles.tabTextActive]}>
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* ---------- OTP TAB ---------- */}
                    {activeTab === 'otp' && (
                        <View>
                            <Text style={styles.label}>Mobile Number</Text>
                            <View style={styles.inputRow}>
                                <Text style={styles.countryCode}>+91</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter 10-digit mobile"
                                    placeholderTextColor="#A7B4B6"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    value={mobile}
                                    onChangeText={setMobile}
                                    editable={!otpSent}
                                />
                            </View>

                            {!otpSent ? (
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={handleSendOtp}
                                    activeOpacity={0.85}
                                >
                                    <Text style={styles.primaryButtonText}>Send OTP</Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <Text style={[styles.label, { marginTop: 22 }]}>Enter OTP</Text>
                                    <Text style={styles.helperText}>
                                        Sent to +91 {mobile}{' '}
                                        <Text
                                            style={styles.changeLink}
                                            onPress={() => { setOtpSent(false); setOtp(['', '', '', '', '', '']); }}
                                        >
                                            Change
                                        </Text>
                                    </Text>

                                    <View style={styles.otpRow}>
                                        {otp.map((digit, i) => (
                                            <TextInput
                                                key={i}
                                                ref={(el) => (otpRefs.current[i] = el)}
                                                style={[styles.otpBox, digit && styles.otpBoxFilled]}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                value={digit}
                                                onChangeText={(v) => handleOtpChange(v, i)}
                                                onKeyPress={(e) => handleOtpKeyPress(e, i)}
                                            />
                                        ))}
                                    </View>

                                    <TouchableOpacity
                                        style={styles.primaryButton}
                                        onPress={handleOtpLogin}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={styles.primaryButtonText}>Verify & Login</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.resendBtn} activeOpacity={0.7}>
                                        <Text style={styles.resendText}>
                                            Didn't receive? <Text style={styles.resendLink}>Resend OTP</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}

                    {/* ---------- PASSWORD TAB ---------- */}
                    {activeTab === 'password' && (
                        <View>
                            <Text style={styles.label}>User ID</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your user ID"
                                    placeholderTextColor="#A7B4B6"
                                    autoCapitalize="none"
                                    value={userId}
                                    onChangeText={setUserId}
                                />
                            </View>

                            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#A7B4B6"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.showHide}>{showPassword ? 'Hide' : 'Show'}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={handlePasswordLogin}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.primaryButtonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* ---------- MPIN TAB ---------- */}
                    {activeTab === 'mpin' && (
                        <View>
                            <Text style={styles.label}>Mobile Number</Text>
                            <View style={styles.inputRow}>
                                <Text style={styles.countryCode}>+91</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter 10-digit mobile"
                                    placeholderTextColor="#A7B4B6"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    value={mpinMobile}
                                    onChangeText={setMpinMobile}
                                />
                            </View>

                            <Text style={[styles.label, { marginTop: 16 }]}>Enter MPIN</Text>
                            <Text style={styles.helperText}>4-digit secure PIN</Text>

                            <View style={styles.otpRow}>
                                {mpin.map((digit, i) => (
                                    <TextInput
                                        key={i}
                                        ref={(el) => (mpinRefs.current[i] = el)}
                                        style={[styles.otpBox, styles.mpinBox, digit && styles.otpBoxFilled]}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        secureTextEntry
                                        value={digit}
                                        onChangeText={(v) => handleMpinChange(v, i)}
                                        onKeyPress={(e) => handleMpinKeyPress(e, i)}
                                    />
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={handleMpinLogin}
                                activeOpacity={0.85}
                            >
                                <Text style={styles.primaryButtonText}>Login with MPIN</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                                <Text style={styles.forgotText}>Forgot MPIN?</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Sign up */}
                    <TouchableOpacity style={styles.signupRow} onPress={()=>navigation.navigate('Registration')}>
                        <Text style={styles.signupText}>New here?</Text>
                        <View activeOpacity={0.7}>
                            <Text style={styles.signupLink}> Create an account</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#047282',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 0,
    },

    /* Hero */
    hero: {
        height: 300,
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(4,114,130,0.62)',
    },
    heroContent: {
        paddingHorizontal: 28,
        paddingBottom: 54,
        alignItems: 'flex-start',
    },
    logoBadge: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    heroTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 15,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 6,
    },

    /* Form card */
    formCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        paddingHorizontal: 28,
        paddingTop: 28,
        paddingBottom: 40,
    },

    /* Tabs */
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F2F9FA',
        borderRadius: 14,
        padding: 4,
        marginBottom: 24,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 11,
        alignItems: 'center',
    },
    tabItemActive: {
        backgroundColor: '#047282',
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    tabText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7A7C',
    },
    tabTextActive: {
        color: '#FFFFFF',
    },

    /* Labels & inputs */
    label: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#0A2E33',
        marginBottom: 8,
    },
    helperText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#8A9698',
        marginBottom: 14,
    },
    changeLink: {
        color: '#047282',
        fontWeight: '700',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        paddingHorizontal: 14,
        height: 54,
    },
    countryCode: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '600',
        color: '#0A2E33',
        marginRight: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#E4ECEE',
    },
    input: {
        flex: 1,
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 15,
        color: '#0A2E33',
        paddingVertical: 0,
    },
    showHide: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 12,
        fontWeight: '700',
        color: '#047282',
        marginLeft: 10,
    },

    /* OTP / MPIN boxes */
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpBox: {
        width: 48,
        height: 54,
        borderRadius: 12,
        backgroundColor: '#F7FAFB',
        borderWidth: 1,
        borderColor: '#E4ECEE',
        textAlign: 'center',
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 20,
        fontWeight: '700',
        color: '#0A2E33',
    },
    mpinBox: {
        width: 58,
    },
    otpBoxFilled: {
        borderColor: '#047282',
        backgroundColor: '#EAF5F6',
    },

    /* Buttons */
    primaryButton: {
        height: 54,
        borderRadius: 14,
        backgroundColor: '#FEA92F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },

    resendBtn: {
        alignItems: 'center',
        marginTop: 16,
    },
    resendText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#6B7A7C',
    },
    resendLink: {
        color: '#047282',
        fontWeight: '700',
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 12,
        marginBottom: 4,
    },
    forgotText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#047282',
        fontWeight: '600',
    },

    /* Divider */
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 22,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E4ECEE',
    },
    dividerText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#A7B4B6',
        marginHorizontal: 14,
    },

    /* Sign up */
    signupRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#6B7A7C',
    },
    signupLink: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#047282',
    },
    logoImage: {
        width: 70,
        height: 70,
    },
});

export default NewLoginScreen;