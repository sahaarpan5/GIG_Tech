import React, { useState, useEffect } from 'react';
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
    Image,
    Modal,
} from 'react-native';

const WORK_TYPES = ['Delivery', 'Driver', 'Trades', 'Events', 'Cleaning', 'Security'];

const QUALIFICATIONS = [
    'Below 10th',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate',
    'Post Graduate',
];

const LANGUAGES = [
    { key: 'English', label: 'English', native: 'English', code: 'EN' },
    { key: 'Hindi', label: 'Hindi', native: 'हिन्दी', code: 'हि' },
    { key: 'Bengali', label: 'Bengali', native: 'বাংলা', code: 'বাং' },
];


const REGISTRATION_TRANSLATIONS = {
    English: {
        createAccountTitle: 'Create your account',
        subtitle: 'Join thousands of gig workers near you',
        fullName: 'Full Name',
        enterFullName: 'Enter your full name',
        mobile: 'Mobile Number',
        enterMobile: 'Enter 10-digit mobile',
        email: 'Email Address',
        emailPlaceholder: 'you@example.com',
        location: 'Location',
        selectCity: 'Select your city',
        workType: 'Work Type',
        dob: 'Date of Birth',
        datePlaceholder: 'DD / MM / YYYY',
        qualification: 'Highest Qualification',
        selectQualification: 'Select qualification',
        createButton: 'Create Account',
        alreadyAccount: 'Already have an account?',
        signIn: 'Sign In',
        chooseLanguage: 'Choose Language',
        workTypes: {
            Delivery: 'Delivery',
            Driver: 'Driver',
            Trades: 'Trades',
            Events: 'Events',
            Cleaning: 'Cleaning',
            Security: 'Security',
        },
        qualifications: {
            'Below 10th': 'Below 10th',
            '10th Pass': '10th Pass',
            '12th Pass': '12th Pass',
            Diploma: 'Diploma',
            Graduate: 'Graduate',
            'Post Graduate': 'Post Graduate',
        },
    },

    Hindi: {
        createAccountTitle: 'अपना खाता बनाएँ',
        subtitle: 'अपने आसपास हजारों गिग वर्कर्स से जुड़ें',
        fullName: 'पूरा नाम',
        enterFullName: 'अपना पूरा नाम दर्ज करें',
        mobile: 'मोबाइल नंबर',
        enterMobile: '10 अंकों का मोबाइल नंबर दर्ज करें',
        email: 'ईमेल पता',
        emailPlaceholder: 'you@example.com',
        location: 'स्थान',
        selectCity: 'अपना शहर चुनें',
        workType: 'काम का प्रकार',
        dob: 'जन्म तिथि',
        datePlaceholder: 'दिन / महीना / वर्ष',
        qualification: 'उच्चतम शैक्षणिक योग्यता',
        selectQualification: 'योग्यता चुनें',
        createButton: 'खाता बनाएँ',
        alreadyAccount: 'पहले से खाता है?',
        signIn: 'साइन इन करें',
        chooseLanguage: 'भाषा चुनें',
        workTypes: {
            Delivery: 'डिलीवरी',
            Driver: 'ड्राइवर',
            Trades: 'तकनीकी कार्य',
            Events: 'कार्यक्रम',
            Cleaning: 'सफाई',
            Security: 'सुरक्षा',
        },
        qualifications: {
            'Below 10th': '10वीं से नीचे',
            '10th Pass': '10वीं पास',
            '12th Pass': '12वीं पास',
            Diploma: 'डिप्लोमा',
            Graduate: 'स्नातक',
            'Post Graduate': 'स्नातकोत्तर',
        },
    },

    Bengali: {
        createAccountTitle: 'আপনার অ্যাকাউন্ট তৈরি করুন',
        subtitle: 'আপনার কাছাকাছি হাজার হাজার গিগ কর্মীর সঙ্গে যুক্ত হন',
        fullName: 'পুরো নাম',
        enterFullName: 'আপনার পুরো নাম লিখুন',
        mobile: 'মোবাইল নম্বর',
        enterMobile: '১০ সংখ্যার মোবাইল নম্বর লিখুন',
        email: 'ইমেল ঠিকানা',
        emailPlaceholder: 'you@example.com',
        location: 'অবস্থান',
        selectCity: 'আপনার শহর নির্বাচন করুন',
        workType: 'কাজের ধরন',
        dob: 'জন্ম তারিখ',
        datePlaceholder: 'দিন / মাস / বছর',
        qualification: 'সর্বোচ্চ শিক্ষাগত যোগ্যতা',
        selectQualification: 'যোগ্যতা নির্বাচন করুন',
        createButton: 'অ্যাকাউন্ট তৈরি করুন',
        alreadyAccount: 'আগে থেকেই অ্যাকাউন্ট আছে?',
        signIn: 'সাইন ইন',
        chooseLanguage: 'ভাষা নির্বাচন করুন',
        workTypes: {
            Delivery: 'ডেলিভারি',
            Driver: 'ড্রাইভার',
            Trades: 'কারিগরি কাজ',
            Events: 'অনুষ্ঠান',
            Cleaning: 'পরিষ্কার-পরিচ্ছন্নতা',
            Security: 'নিরাপত্তা',
        },
        qualifications: {
            'Below 10th': 'দশম শ্রেণির নিচে',
            '10th Pass': 'দশম শ্রেণি উত্তীর্ণ',
            '12th Pass': 'দ্বাদশ শ্রেণি উত্তীর্ণ',
            Diploma: 'ডিপ্লোমা',
            Graduate: 'স্নাতক',
            'Post Graduate': 'স্নাতকোত্তর',
        },
    },
};

const Registration = () => {
    // Form state (UI only)
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [workType, setWorkType] = useState('');
    const [dob, setDob] = useState('');
    const [qualification, setQualification] = useState('');

    // Dropdown open flags
    const [showQualifications, setShowQualifications] = useState(false);

    // Language
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const t = (key) =>
        REGISTRATION_TRANSLATIONS[selectedLanguage]?.[key] ??
        REGISTRATION_TRANSLATIONS.English[key] ??
        key;

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('selectedLanguage');

                if (REGISTRATION_TRANSLATIONS[savedLanguage]) {
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
                <View style={styles.hero}>
                    <View style={styles.heroOverlay} />

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
                        <View style={styles.logoBadge}>
                            <Image
                                source={require('../../assets/genlogo.png')}
                                style={{ height: 60, width: 60 }}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={styles.heroTitle}>{t('createAccountTitle')}</Text>
                        <Text style={styles.heroSubtitle}>
                            {t('subtitle')}
                        </Text>
                    </View>
                </View>

                {/* ============ FORM CARD ============ */}
                <View style={styles.formCard}>
                    {/* Full Name */}
                    <Text style={styles.label}>{t('fullName')}</Text>
                    <View style={styles.inputRow}>
                        <Image
                            source={require('../../assets/person-outline.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                           placeholder={t('enterFullName')}
                            placeholderTextColor="#A7B4B6"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Mobile */}
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
                        />
                    </View>

                    {/* Email */}
                    <Text style={styles.label}>{t('email')}</Text>
                    <View style={styles.inputRow}>
                        <Image
                            source={require('../../assets/mail.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            placeholderTextColor="#A7B4B6"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Location */}
                    <Text style={styles.label}>{t('location')}</Text>
                    <View style={styles.inputRow}>
                        <Image
                            source={require('../../assets/location.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={t('selectCity')}
                            placeholderTextColor="#A7B4B6"
                            value={location}
                            onChangeText={setLocation}
                        />
                    </View>

                    {/* Work Type */}
                    <Text style={styles.label}>{t('workType')}</Text>
                    <View style={styles.chipWrap}>
                        {WORK_TYPES.map((type) => {
                            const selected = workType === type;
                            return (
                                <TouchableOpacity
                                    key={type}
                                    style={[styles.chip, selected && styles.chipSelected]}
                                    onPress={() => setWorkType(type)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                                       {REGISTRATION_TRANSLATIONS[selectedLanguage].workTypes[type]}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Date of Birth */}
                    <Text style={styles.label}>{t('dob')}</Text>
                    <TouchableOpacity style={styles.inputRow} activeOpacity={0.7}>
                        <Image
                            source={require('../../assets/schedule.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <Text style={[styles.input, !dob && { color: '#A7B4B6' }]}>
                            {dob || t('datePlaceholder')}
                        </Text>
                        <Image
                            source={require('../../assets/chevron-down.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* Highest Qualification */}
                    <Text style={styles.label}>{t('qualification')}</Text>
                    <TouchableOpacity
                        style={styles.inputRow}
                        activeOpacity={0.8}
                        onPress={() => setShowQualifications(!showQualifications)}
                    >
                        <Image
                            source={require('../../assets/school-outline.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <Text style={[styles.input, !qualification && { color: '#A7B4B6' }]}>
                            {qualification || t('selectQualification')}
                        </Text>
                        <Image
                            source={require('../../assets/chevron-down.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* CTA */}
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
                        <Text style={styles.primaryButtonText}>{t('createButton')}</Text>
                    </TouchableOpacity>

                    {/* Sign in link */}
                    <View style={styles.signinRow}>
                        <Text style={styles.signinText}>{t('alreadyAccount')}</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.signinLink}> {t('signIn')}</Text>
                        </TouchableOpacity>
                    </View>
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

    /* Hero */
    hero: {
        height: 210,
        backgroundColor: '#047282',
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(4,114,130,1)',
    },
    heroContent: {
        paddingHorizontal: 28,
        paddingBottom: 40,
    },
    logoBadge: {
        width: 70,
        height: 70,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    heroTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 6,
    },

    /* ============ LANGUAGE BUTTON (top-right of hero) ============ */
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

    /* Form card */
    formCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -28,
        paddingHorizontal: 28,
        paddingTop: 28,
        paddingBottom: 40,
    },

    /* Labels */
    label: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#0A2E33',
        marginBottom: 8,
        marginTop: 16,
    },

    /* Input rows */
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
    inputIcon: {
        marginRight: 10,
        height: 18,
        width: 18,
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

    /* Chips */
    chipWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: '#F2F9FA',
        borderWidth: 1,
        borderColor: '#E4ECEE',
        marginHorizontal: 4,
        marginBottom: 8,
    },
    chipSelected: {
        backgroundColor: '#047282',
        borderColor: '#047282',
    },
    chipText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7A7C',
    },
    chipTextSelected: {
        color: '#FFFFFF',
    },

    /* CTA */
    primaryButton: {
        height: 54,
        borderRadius: 14,
        backgroundColor: '#FEA92F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
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

    /* Sign in */
    signinRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#6B7A7C',
    },
    signinLink: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#047282',
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

export default Registration;