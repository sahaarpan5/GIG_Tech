import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    Modal,
} from 'react-native';

const HERO_IMAGE =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop';

const TABS = [
  { key: 'otp', translationKey: 'otp' },
  { key: 'password', translationKey: 'passwordTab' },
  { key: 'mpin', translationKey: 'mpinTab' },
];

const LANGUAGES = [
    { key: 'English', label: 'English', native: 'English', code: 'EN' },
    { key: 'Hindi', label: 'Hindi', native: 'हिन्दी', code: 'हि' },
    { key: 'Bengali', label: 'Bengali', native: 'বাংলা', code: 'বাং' },
];



const LOGIN_TRANSLATIONS = {
    English: {
        welcome: 'Welcome back',
        subtitle: 'Sign in to continue',
        otp: 'OTP',
        passwordTab: 'Password',
        mpinTab: 'MPIN',
        mobile: 'Mobile Number',
        enterMobile: 'Enter 10-digit mobile',
        sendOtp: 'Send OTP',
        enterOtp: 'Enter OTP',
        change: 'Change',
        verifyLogin: 'Verify & Login',
        didntReceive: "Didn't receive?",
        resendOtp: 'Resend OTP',
        userId: 'User ID',
        enterUserId: 'Enter your user ID',
        password: 'Password',
        enterPassword: 'Enter your password',
        show: 'Show',
        hide: 'Hide',
        forgotPassword: 'Forgot password?',
        login: 'Login',
        enterMpin: 'Enter MPIN',
        securePin: '4-digit secure PIN',
        loginMpin: 'Login with MPIN',
        forgotMpin: 'Forgot MPIN?',
        or: 'or',
        newHere: 'New here?',
        createAccount: 'Create an account',
        chooseLanguage: 'Choose Language',
        invalidNumber: 'Invalid number',
        validMobile: 'Please enter a valid 10-digit mobile number.',
        invalidOtp: 'Invalid OTP',
        enterSixDigitOtp: 'Please enter the 6-digit OTP.',
        missingFields: 'Missing fields',
        enterCredentials: 'Please enter user ID and password.',
        invalidMpin: 'Invalid input',
        enterMobileAndMpin: 'Please enter mobile and 4-digit MPIN.',
    },

    Hindi: {
        welcome: 'वापसी पर स्वागत है',
        subtitle: 'जारी रखने के लिए साइन इन करें',
        otp: 'ओटीपी',
        passwordTab: 'पासवर्ड',
        mpinTab: 'एमपिन',
        mobile: 'मोबाइल नंबर',
        enterMobile: '10 अंकों का मोबाइल नंबर दर्ज करें',
        sendOtp: 'ओटीपी भेजें',
        enterOtp: 'ओटीपी दर्ज करें',
        change: 'बदलें',
        verifyLogin: 'सत्यापित करें और लॉगिन करें',
        didntReceive: 'ओटीपी नहीं मिला?',
        resendOtp: 'ओटीपी दोबारा भेजें',
        userId: 'यूज़र आईडी',
        enterUserId: 'अपनी यूज़र आईडी दर्ज करें',
        password: 'पासवर्ड',
        enterPassword: 'अपना पासवर्ड दर्ज करें',
        show: 'दिखाएँ',
        hide: 'छिपाएँ',
        forgotPassword: 'पासवर्ड भूल गए?',
        login: 'लॉगिन करें',
        enterMpin: 'एमपिन दर्ज करें',
        securePin: '4 अंकों का सुरक्षित पिन',
        loginMpin: 'एमपिन से लॉगिन करें',
        forgotMpin: 'एमपिन भूल गए?',
        or: 'या',
        newHere: 'यहाँ नए हैं?',
        createAccount: 'खाता बनाएँ',
        chooseLanguage: 'भाषा चुनें',
        invalidNumber: 'अमान्य नंबर',
        validMobile: 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।',
        invalidOtp: 'अमान्य ओटीपी',
        enterSixDigitOtp: 'कृपया 6 अंकों का ओटीपी दर्ज करें।',
        missingFields: 'जानकारी अधूरी है',
        enterCredentials: 'कृपया यूज़र आईडी और पासवर्ड दर्ज करें।',
        invalidMpin: 'अमान्य जानकारी',
        enterMobileAndMpin: 'कृपया मोबाइल नंबर और 4 अंकों का एमपिन दर्ज करें।',
    },

    Bengali: {
        welcome: 'আবার স্বাগতম',
        subtitle: 'চালিয়ে যেতে সাইন ইন করুন',
        otp: 'ওটিপি',
        passwordTab: 'পাসওয়ার্ড',
        mpinTab: 'এমপিন',
        mobile: 'মোবাইল নম্বর',
        enterMobile: '১০ সংখ্যার মোবাইল নম্বর লিখুন',
        sendOtp: 'ওটিপি পাঠান',
        enterOtp: 'ওটিপি লিখুন',
        change: 'পরিবর্তন করুন',
        verifyLogin: 'যাচাই করে লগইন করুন',
        didntReceive: 'ওটিপি পাননি?',
        resendOtp: 'আবার ওটিপি পাঠান',
        userId: 'ইউজার আইডি',
        enterUserId: 'আপনার ইউজার আইডি লিখুন',
        password: 'পাসওয়ার্ড',
        enterPassword: 'আপনার পাসওয়ার্ড লিখুন',
        show: 'দেখান',
        hide: 'লুকান',
        forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
        login: 'লগইন করুন',
        enterMpin: 'এমপিন লিখুন',
        securePin: '৪ সংখ্যার নিরাপদ পিন',
        loginMpin: 'এমপিন দিয়ে লগইন করুন',
        forgotMpin: 'এমপিন ভুলে গেছেন?',
        or: 'অথবা',
        newHere: 'এখানে নতুন?',
        createAccount: 'অ্যাকাউন্ট তৈরি করুন',
        chooseLanguage: 'ভাষা নির্বাচন করুন',
        invalidNumber: 'ভুল নম্বর',
        validMobile: 'অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর লিখুন।',
        invalidOtp: 'ভুল ওটিপি',
        enterSixDigitOtp: 'অনুগ্রহ করে ৬ সংখ্যার ওটিপি লিখুন।',
        missingFields: 'তথ্য অসম্পূর্ণ',
        enterCredentials: 'অনুগ্রহ করে ইউজার আইডি ও পাসওয়ার্ড লিখুন।',
        invalidMpin: 'ভুল তথ্য',
        enterMobileAndMpin: 'অনুগ্রহ করে মোবাইল নম্বর ও ৪ সংখ্যার এমপিন লিখুন।',
    },
};


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

    // Language state
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');


    const t = (key) =>
        LOGIN_TRANSLATIONS[selectedLanguage]?.[key] ??
        LOGIN_TRANSLATIONS.English[key] ??
        key;


    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('selectedLanguage');

                if (LOGIN_TRANSLATIONS[savedLanguage]) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log('Error loading language:', error);
            }
        };

        loadLanguage();
    }, []);

    const handleLanguageChange = async (language) => {
        setSelectedLanguage(language);

        try {
            await AsyncStorage.setItem('selectedLanguage', language);
        } catch (error) {
            console.log('Error saving language:', error);
        }

        setLanguageModalVisible(false);
    };

    const handleSendOtp = () => {
        if (mobile.length !== 10) {
            Alert.alert(t('invalidNumber'), t('validMobile'));
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
        navigation.replace('NewDashboardScreen');
    };

    const handlePasswordLogin = () => {
        if (!userId || !password) {
            Alert.alert('Missing fields', 'Please enter user ID and password.');
            return;
        }
        console.log('Password login:', userId, password);
        navigation.replace('NewDashboardScreen');
    };

    const handleMpinLogin = () => {
        if (mpinMobile.length !== 10 || mpin.join('').length !== 4) {
            Alert.alert('Invalid input', 'Please enter mobile and 4-digit MPIN.');
            return;
        }
        console.log('MPIN login:', mpinMobile, mpin.join(''));
        navigation.replace('NewDashboardScreen');
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
                {/* ============ HERO ============ */}
                <ImageBackground
                    source={{ uri: HERO_IMAGE }}
                    style={styles.hero}
                    resizeMode="cover"
                >
                    {/* Base teal overlay */}
                    <View style={styles.heroOverlay} />

                    {/* Decorative colorful circles */}
                    <View style={styles.heroCircle1} />
                    <View style={styles.heroCircle2} />
                    <View style={styles.heroCircle3} />

                    {/* Language button — top right */}
                    <TouchableOpacity
                        style={styles.langBtn}
                        activeOpacity={0.8}
                        onPress={() => setLanguageModalVisible(true)}
                    >
                        <Text style={styles.langBtnText}>
                            {selectedLanguage === 'English'
                                ? 'EN'
                                : selectedLanguage === 'Hindi'
                                    ? 'हि'
                                    : 'বাং'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.heroContent}>
                        <View style={styles.logoGlowRing}>
                            <View style={styles.logoBadge}>
                                <Image
                                    source={require('../../assets/genlogo.png')}
                                    style={styles.logoImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <Text style={styles.heroTitle}>{t('welcome')}</Text>
                        <Text style={styles.heroSubtitle}>{t('subtitle')}</Text>
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
                                       {t(tab.translationKey)}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* ---------- OTP TAB ---------- */}
                    {activeTab === 'otp' && (
                        <View>
                            <Text style={styles.label}>{t('mobile')}</Text>
                            <View style={styles.inputRow}>
                                <Text style={styles.countryCode}>+91</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('enterMobile')}
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
                                    <View style={styles.primaryButtonGlow} />
                                    <Text style={styles.primaryButtonText}>{t('sendOtp')}</Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <Text style={[styles.label, { marginTop: 22 }]}>{t('enterOtp')}</Text>
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
                                        <View style={styles.primaryButtonGlow} />
                                        <Text style={styles.primaryButtonText}>{t('verifyLogin')}</Text>
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
                            <Text style={styles.label}>{t('userId')}</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('enterUserId')}
                                    placeholderTextColor="#A7B4B6"
                                    autoCapitalize="none"
                                    value={userId}
                                    onChangeText={setUserId}
                                />
                            </View>

                            <Text style={[styles.label, { marginTop: 16 }]}>{t('password')}</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('enterPassword')}
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
                                <Text style={styles.forgotText}>{t('forgotPassword')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.primaryButton}
                                onPress={handlePasswordLogin}
                                activeOpacity={0.85}
                            >
                                <View style={styles.primaryButtonGlow} />
                                <Text style={styles.primaryButtonText}>{t('login')}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* ---------- MPIN TAB ---------- */}
                    {activeTab === 'mpin' && (
                        <View>
                            <Text style={styles.label}>{t('mobile')}</Text>
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

                            <Text style={[styles.label, { marginTop: 16 }]}>{t('enterMpin')}</Text>
                            <Text style={styles.helperText}>{t('securePin')}</Text>

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
                                <View style={styles.primaryButtonGlow} />
                                <Text style={styles.primaryButtonText}>{t('loginMpin')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                                <Text style={styles.forgotText}>{t('forgotMpin')}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <View style={styles.dividerPill}>
                            <Text style={styles.dividerText}>or</Text>
                        </View>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Sign up */}
                    <TouchableOpacity
                        style={styles.signupRow}
                        onPress={() => navigation.navigate('Registration')}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.signupText}>{t('newHere')}</Text>
                        <View style={styles.signupLinkWrap}>
                            <Text style={styles.signupLink}>{t('createAccount')}</Text>
                            <Text style={styles.signupArrow}>→</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* =====================================================
                LANGUAGE MODAL
                ===================================================== */}
            <Modal
                visible={languageModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalBackdrop}
                    activeOpacity={1}
                    onPress={() => setLanguageModalVisible(false)}
                >
                    <View style={styles.languageSheet}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('chooseLanguage')}</Text>
                            <TouchableOpacity
                                onPress={() => setLanguageModalVisible(false)}
                                style={styles.modalCloseBtn}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={require('../../assets/close.png')}
                                    style={{ height: 20, width: 20, tintColor: '#6B7A7C' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        {LANGUAGES.map((lang) => {
                            const selected = selectedLanguage === lang.key;
                            return (
                                <TouchableOpacity
                                    key={lang.key}
                                    style={[
                                        styles.languageItem,
                                        selected && styles.languageItemSelected,
                                    ]}
                                    activeOpacity={0.8}
                                    onPress={() => handleLanguageChange(lang.key)}
                                >
                                    <View style={styles.languageIconBox}>
                                        <Text style={styles.languageIconText}>{lang.code}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={[
                                                styles.languageLabel,
                                                selected && styles.languageLabelSelected,
                                            ]}
                                        >
                                            {lang.label}
                                        </Text>
                                        <Text style={styles.languageNative}>{lang.native}</Text>
                                    </View>
                                    {selected && (
                                        <View style={styles.languageCheck}>
                                            <Text style={styles.languageCheckText}>✓</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
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

    /* ============ HERO ============ */
    hero: {
        height: 320,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(4,114,130,0.68)',
    },
    heroCircle1: {
        position: 'absolute',
        top: -60,
        right: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(254,169,47,0.28)',
    },
    heroCircle2: {
        position: 'absolute',
        top: 60,
        left: -70,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(123,92,255,0.22)',
    },
    heroCircle3: {
        position: 'absolute',
        bottom: -80,
        right: 40,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(123,224,168,0.18)',
    },
    heroContent: {
        paddingHorizontal: 28,
        paddingBottom: 58,
        alignItems: 'flex-start',
    },
    logoGlowRing: {
        width: 104,
        height: 104,
        borderRadius: 52,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
    },
    logoBadge: {
        width: 84,
        height: 84,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 10,
    },
    logoImage: {
        width: 68,
        height: 68,
    },
    heroTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.6,
    },
    heroSubtitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 15,
        color: 'rgba(255,255,255,0.88)',
        marginTop: 6,
    },

    /* ============ LANGUAGE BUTTON ============ */
    langBtn: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 58 : 44,
        right: 24,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.16)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.24)',
        zIndex: 10,
    },
    langBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },

    /* ============ FORM CARD ============ */
    formCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        paddingHorizontal: 28,
        paddingTop: 28,
        paddingBottom: 40,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
    },

    /* ============ TABS ============ */
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#F2F9FA',
        borderRadius: 16,
        padding: 5,
        marginBottom: 26,
        borderWidth: 1,
        borderColor: '#E4ECEE',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    tabItemActive: {
        backgroundColor: '#047282',
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 6,
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

    /* ============ LABELS & INPUTS ============ */
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
        color: '#FEA92F',
        fontWeight: '700',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E4ECEE',
        paddingHorizontal: 14,
        height: 56,
    },
    countryCode: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '600',
        color: '#047282',
        marginRight: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#D4E9EC',
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

    /* ============ OTP / MPIN BOXES ============ */
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpBox: {
        width: 48,
        height: 56,
        borderRadius: 14,
        backgroundColor: '#F7FAFB',
        borderWidth: 1.5,
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
        borderColor: '#FEA92F',
        backgroundColor: '#FFF8EC',
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 2,
    },

    /* ============ BUTTONS ============ */
    primaryButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: '#FEA92F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    primaryButtonGlow: {
        position: 'absolute',
        top: -25,
        left: 20,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    primaryButtonText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.3,
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
        color: '#FEA92F',
        fontWeight: '700',
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 12,
        marginBottom: 4,
    },
    forgotText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#047282',
    },

    /* ============ DIVIDER ============ */
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
    dividerPill: {
        backgroundColor: '#F2F9FA',
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
    },
    dividerText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 11,
        fontWeight: '600',
        color: '#6B7A7C',
        letterSpacing: 0.4,
    },

    /* ============ SIGN UP ============ */
    signupRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAF5F6',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D4E9EC',
    },
    signupText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#6B7A7C',
        marginRight: 8,
    },
    signupLinkWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupLink: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#047282',
    },
    signupArrow: {
        fontSize: 14,
        fontWeight: '700',
        color: '#047282',
        marginLeft: 4,
    },

    /* ============ LANGUAGE MODAL ============ */
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(10,46,51,0.55)',
        justifyContent: 'flex-end',
    },
    languageSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 22,
        width: '100%',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    modalTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 19,
        fontWeight: '700',
        color: '#0A2E33',
        letterSpacing: -0.2,
        flex: 1,
        marginRight: 10,
    },
    modalCloseBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F2F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: '#E4ECEE',
    },
    languageItemSelected: {
        backgroundColor: '#EAF5F6',
        borderColor: '#047282',
    },
    languageIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#047282',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    languageIconText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    languageLabel: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '700',
        color: '#0A2E33',
    },
    languageLabelSelected: {
        color: '#047282',
    },
    languageNative: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#6B7A7C',
        marginTop: 2,
    },
    languageCheck: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#047282',
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageCheckText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default NewLoginScreen;