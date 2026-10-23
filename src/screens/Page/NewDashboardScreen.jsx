import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
    Modal,
    TextInput,
    PanResponder,
    Dimensions,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_W } = Dimensions.get('window');

const SL_DATA = {
    name: 'MT',
    location: 'Kolkata',
    assignedDate: '01 Oct 2026',
    startDate: '01 Oct 2026',
    endDate: '31 Oct 2026',
};

const PROFILE = {
    percent: 60,
    missing: ['Email', 'Date of Birth'],
};

const CONSENT_TEXT = `I hereby confirm that I am starting the assigned activity at the mapped Service Location (SL) on my own will.

I agree to:
• Follow all safety guidelines and protocols provided by the company.
• Maintain professional conduct with customers and team members.
• Report any issues, damages, or incidents immediately.
• Ensure all work is completed within the assigned start and end dates.

I understand that:
• My activity will be tracked and verified.
• Any violation of company policy may result in assignment termination.
• Payments will be processed only after successful completion and verification.

By signing below, I acknowledge that I have read, understood, and agree to the above terms and conditions.`;

const RATE_PER_UNIT = 95.8100;

const LANGUAGES = [
    { key: 'English', label: 'English', native: 'English', code: 'EN' },
    { key: 'Hindi', label: 'Hindi', native: 'हिन्दी', code: 'हि' },
    { key: 'Bengali', label: 'Bengali', native: 'বাংলা', code: 'বাং' },
];



const TRANSLATIONS = {
    English: {
        greeting: 'Good morning, Rahul 👋',
        subtitle: "Here's your today's work",
        chooseLanguage: 'Choose Language',

        activeSL: 'ACTIVE SL',
        slLocation: 'SL Location',
        assignedDate: 'Assigned Date',
        startDate: 'Start Date',
        endDate: 'End Date',

        startActivity: 'Start Activity',
        activityReport: 'Activity Report',
        myEarnings: 'My Earnings',
        profileStatus: 'Profile Status',
        profileIncomplete: 'Profile incomplete',
        profileComplete: 'Profile complete',
        viewProfile: 'View Profile',

        consentTitle: 'Consent & Agreement',
        yourSignature: 'Your Signature',
        signHere: 'Sign here with your finger',
        clearSignature: 'Clear signature',
        saveContinue: 'Save & Continue',

        activityDetails: 'Enter your activity details',
        selfieVerification: 'Selfie Verification',
        takeSelfie: 'Take a selfie',
        selfieInstruction: 'Make sure your face is clearly visible',
        openCamera: 'Open Camera',

        currentLocation: 'Current Location',
        youAreHere: 'You are here',
        gpsAccuracy: 'GPS accuracy ± 5m',

        productName: 'Product Name',
        value: 'Qty',
        enterQuantity: 'Enter quantity',
        rate: 'Rate',
        total: 'Total',
        units: 'unit(s)',
        save: 'Save',
        activityDate: 'Activity Date',
        today: 'Today',
    },
    Bengali: {
        greeting: 'সুপ্রভাত, Rahul 👋', subtitle: 'আজকের কাজের বিবরণ', chooseLanguage: 'ভাষা নির্বাচন করুন',
        activeSL: 'সক্রিয় সার্ভিস লোকেশন', slLocation: 'সার্ভিস লোকেশন', assignedDate: 'নির্ধারিত তারিখ', startDate: 'শুরুর তারিখ', endDate: 'শেষ তারিখ',
        startActivity: 'কাজ শুরু করুন', activityReport: 'কাজের রিপোর্ট', myEarnings: 'আমার উপার্জন', profileStatus: 'প্রোফাইলের অবস্থা',
        profileIncomplete: 'প্রোফাইল অসম্পূর্ণ', profileComplete: 'প্রোফাইল সম্পূর্ণ', viewProfile: 'প্রোফাইল দেখুন',
        consentTitle: 'সম্মতি ও চুক্তি', yourSignature: 'আপনার স্বাক্ষর', signHere: 'এখানে আঙুল দিয়ে স্বাক্ষর করুন', clearSignature: 'স্বাক্ষর মুছে ফেলুন', saveContinue: 'সংরক্ষণ করুন ও এগিয়ে যান',
        activityDetails: 'কাজের বিবরণ লিখুন', selfieVerification: 'সেলফি যাচাইকরণ', takeSelfie: 'সেলফি তুলুন', selfieInstruction: 'আপনার মুখ স্পষ্টভাবে দেখা যাচ্ছে কিনা নিশ্চিত করুন', openCamera: 'ক্যামেরা খুলুন',
        currentLocation: 'বর্তমান অবস্থান', youAreHere: 'আপনি এখানে আছেন', gpsAccuracy: 'GPS নির্ভুলতা ± ৫ মিটার', productName: 'পণ্যের নাম', value: 'পরিমাণ', enterQuantity: 'পরিমাণ লিখুন', rate: 'দর', total: 'মোট', units: 'একক', save: 'সংরক্ষণ করুন',
        activityDate: 'কার্যকলাপের তারিখ',
        today: 'আজ',
    },
    Hindi: {
        greeting: 'सुप्रभात, Rahul 👋', subtitle: 'आज के काम का विवरण', chooseLanguage: 'भाषा चुनें',
        activeSL: 'सक्रिय सर्विस लोकेशन', slLocation: 'सर्विस लोकेशन', assignedDate: 'निर्धारित तिथि', startDate: 'शुरू होने की तिथि', endDate: 'समाप्ति तिथि',
        startActivity: 'काम शुरू करें', activityReport: 'कार्य रिपोर्ट', myEarnings: 'मेरी कमाई', profileStatus: 'प्रोफ़ाइल की स्थिति',
        profileIncomplete: 'प्रोफ़ाइल अधूरी है', profileComplete: 'प्रोफ़ाइल पूरी है', viewProfile: 'प्रोफ़ाइल देखें',
        consentTitle: 'सहमति और अनुबंध', yourSignature: 'आपके हस्ताक्षर', signHere: 'यहाँ उँगली से हस्ताक्षर करें', clearSignature: 'हस्ताक्षर मिटाएँ', saveContinue: 'सहेजें और आगे बढ़ें',
        activityDetails: 'कार्य का विवरण दर्ज करें', selfieVerification: 'सेल्फी सत्यापन', takeSelfie: 'सेल्फी लें', selfieInstruction: 'सुनिश्चित करें कि आपका चेहरा स्पष्ट दिखाई दे', openCamera: 'कैमरा खोलें',
        currentLocation: 'वर्तमान स्थान', youAreHere: 'आप यहाँ हैं', gpsAccuracy: 'GPS सटीकता ± 5 मीटर', productName: 'उत्पाद का नाम', value: 'मात्रा', enterQuantity: 'मात्रा दर्ज करें', rate: 'दर', total: 'कुल', units: 'इकाई', save: 'सहेजें',
        activityDate: 'गतिविधि तिथि',
        today: 'आज',
    },
};

/* =====================================================
   SIGNATURE PAD
   ===================================================== */
const SignaturePad = ({ onSignedChange, signatureRef }) => {
    const [paths, setPaths] = useState([]);
    const currentPath = useRef([]);
    const padHeight = 160;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                currentPath.current = [{ x: locationX, y: locationY }];
                setPaths((prev) => [...prev, [...currentPath.current]]);
            },
            onPanResponderMove: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                currentPath.current.push({ x: locationX, y: locationY });
                setPaths((prev) => {
                    const next = [...prev];
                    next[next.length - 1] = [...currentPath.current];
                    return next;
                });
            },
            onPanResponderRelease: () => {
                onSignedChange(true);
            },
        })
    ).current;

    const clear = () => {
        setPaths([]);
        currentPath.current = [];
        onSignedChange(false);
    };

    if (signatureRef) signatureRef.current = { clear };

    return (
        <View>
            <View
                style={[styles.signatureBox, { height: padHeight }]}
                {...panResponder.panHandlers}
            >
                {paths.length === 0 && (
                    <Text style={styles.signaturePlaceholder}>
                        Sign here with your finger
                    </Text>
                )}
                {paths.map((path, pathIndex) => (
                    <View key={pathIndex} style={StyleSheet.absoluteFillObject} pointerEvents="none">
                        {path.map((point, i) => {
                            if (i === 0) return null;
                            const prev = path[i - 1];
                            const dx = point.x - prev.x;
                            const dy = point.y - prev.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                            return (
                                <View
                                    key={i}
                                    style={{
                                        position: 'absolute',
                                        left: prev.x,
                                        top: prev.y,
                                        width: dist,
                                        height: 2.5,
                                        backgroundColor: '#0A2E33',
                                        borderRadius: 2,
                                        transform: [{ translateY: -1.25 }, { rotate: `${angle}deg` }],
                                        transformOrigin: 'left center',
                                    }}
                                />
                            );
                        })}
                    </View>
                ))}
            </View>

            <TouchableOpacity onPress={clear} style={styles.clearBtn} activeOpacity={0.7}>
                <Image
                    source={require('../../assets/refresh-outline.png')}
                    style={{ height: 14, width: 14, tintColor: '#E63E6D' }}
                    resizeMode="contain"
                />
                <Text style={styles.clearBtnText}>Clear signature</Text>
            </TouchableOpacity>
        </View>
    );
};

/* =====================================================
   MAIN DASHBOARD
   ===================================================== */
const NewDashboardScreen = () => {
    const navigation = useNavigation();
    const [consentVisible, setConsentVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const LANGUAGE_STORAGE_KEY = 'selectedLanguage';

    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const t = (key) => TRANSLATIONS[selectedLanguage]?.[key] ?? TRANSLATIONS.English[key] ?? key;

    const [isSigned, setIsSigned] = useState(false);
    const signatureRef = useRef(null);

    const [quantity, setQuantity] = useState('');
    const [productName] = useState('GIG deployment commissions on oshea Product Sale (PD0015)');

    const rate = quantity ? Number(quantity) * RATE_PER_UNIT : 0;

    const handleStartActivity = () => {
        setIsSigned(false);
        setConsentVisible(true);
    };

    const handleSaveConsent = () => {
        if (!isSigned) return;
        setConsentVisible(false);
        setQuantity('');
        setProductVisible(true);
    };

    const handleSaveProduct = () => {
        setProductVisible(false);
        console.log('Saved:', { productName, quantity, rate });
    };


    useEffect(() => {
        const loadSavedLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem(
                    LANGUAGE_STORAGE_KEY
                );

                if (
                    savedLanguage &&
                    TRANSLATIONS[savedLanguage]
                ) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log('Error loading language:', error);
            }
        };

        loadSavedLanguage();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ============ HEADER ============ */}
                <View style={styles.header}>
                    <View style={styles.headerCircle1} />
                    <View style={styles.headerCircle2} />
                    <View style={styles.headerCircle3} />

                    <View style={styles.headerRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.greeting}>{t('greeting')}</Text>
                            <Text style={styles.subGreeting}>{t('subtitle')}</Text>
                        </View>

                        {/* Language button */}
                        <TouchableOpacity
                            style={styles.langBtn}
                            activeOpacity={0.8}
                            onPress={() => setLanguageModalVisible(true)}
                        >
                            <Text style={styles.langBtnText}>
                                {selectedLanguage === 'English' ? 'EN' : selectedLanguage === 'Hindi' ? 'हि' : 'বাং'}
                            </Text>
                        </TouchableOpacity>

                        {/* Notification bell */}
                        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
                            <Image
                                source={require('../../assets/notifications-outline.png')}
                                style={{ height: 22, width: 22, tintColor: '#FFFFFF' }}
                                resizeMode="contain"
                            />
                            <View style={styles.bellDot} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ============ SL CARD ============ */}
                <View style={styles.slCard}>
                    <View style={styles.statusPill}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>{t('activeSL')}</Text>
                    </View>

                    <View style={styles.slHeaderRow}>
                        <View style={styles.slIconBox}>
                            <View style={styles.slIconGradientTop} />
                            <View style={styles.slIconGradientBottom} />
                            <Image
                                source={require('../../assets/work.png')}
                                style={{ height: 22, width: 22, tintColor: '#FFFFFF' }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.slHeaderTextWrap}>
                            <Text style={styles.slName}>{SL_DATA.name}</Text>
                            <Text style={styles.slLocation}>{SL_DATA.location}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <DetailRow icon={require('../../assets/location.png')} iconBg="#E8F4FF" iconColor="#2C7BE5" label={t('slLocation')} value={SL_DATA.location} />
                    <DetailRow icon={require('../../assets/calendar.png')} iconBg="#FFF4E5" iconColor="#F5A623" label={t('assignedDate')} value={SL_DATA.assignedDate} />
                    <DetailRow icon={require('../../assets/play-button.png')} iconBg="#E8FBF2" iconColor="#22A06B" label={t('startDate')} value={SL_DATA.startDate} />
                    <DetailRow icon={require('../../assets/red-flag.png')} iconBg="#FFEBF0" iconColor="#E63E6D" label={t('endDate')} value={SL_DATA.endDate} last />

                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.85}
                        onPress={handleStartActivity}
                    >
                        <View style={styles.primaryButtonGlow} />
                        <Image
                            source={require('../../assets/play.png')}
                            style={{ height: 16, width: 16, tintColor: '#FFFFFF' }}
                            resizeMode="contain"
                        />
                        <Text style={styles.primaryButtonText}> {t('startActivity')}</Text>
                        <Image
                            source={require('../../assets/arrow-forward.png')}
                            style={{ height: 18, width: 18, tintColor: '#FFFFFF', marginLeft: 6 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* ============ QUICK ACTIONS ============ */}
                <View style={styles.quickActionsRow}>
                    {/* View Activity Report */}
                    <TouchableOpacity
                        style={[styles.quickCard, styles.quickCardBlue]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('ActivityReportScreen')}
                    >
                        <View style={[styles.quickIconBox, styles.quickIconBlue]}>
                            <Image
                                source={require('../../assets/bar-chart.png')}
                                style={{ height: 20, width: 20, tintColor: '#FFFFFF' }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.quickTitle}>{t('activityReport')}</Text>

                        <View style={[styles.quickArrow, styles.quickArrowBlue]}>
                            <Image
                                source={require('../../assets/arrow-forward.png')}
                                style={{ height: 14, width: 14, tintColor: '#2C7BE5' }}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>

                    {/* My Earnings */}
                    <TouchableOpacity
                        style={[styles.quickCard, styles.quickCardGreen]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('MyEarningsScreen')}
                    >
                        <View style={[styles.quickIconBox, styles.quickIconGreen]}>
                            <Image
                                source={require('../../assets/wallet.png')}
                                style={{ height: 20, width: 20, tintColor: '#FFFFFF' }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.quickTitle}>{t('myEarnings')}</Text>

                        <View style={[styles.quickArrow, styles.quickArrowGreen]}>
                            <Image
                                source={require('../../assets/arrow-forward.png')}
                                style={{ height: 14, width: 14, tintColor: '#22A06B' }}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* ============ PROFILE CARD ============ */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeaderRow}>
                        <View style={styles.profileIconBox}>
                            <Image
                                source={require('../../assets/person-circle.png')}
                                style={{ height: 24, width: 24, tintColor: '#7B5CFF' }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.profileTitle}>{t('profileStatus')}</Text>
                        <View style={styles.percentBadge}>
                            <Text style={styles.percentBadgeText}>{PROFILE.percent}%</Text>
                        </View>
                    </View>

                    <View style={styles.profileStatusRow}>
                        <Image
                            source={
                                PROFILE.percent < 100
                                    ? require('../../assets/warning.png')
                                    : require('../../assets/checked.png')
                            }
                            style={{
                                width: 18,
                                height: 18,
                                resizeMode: 'contain',
                                tintColor: '#F5A623',
                            }}
                        />
                        <Text style={styles.profileStatusText}>
                            {PROFILE.percent < 100
                                ? t('profileIncomplete')
                                : t('profileComplete')}
                        </Text>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFillOuter, { width: `${PROFILE.percent}%` }]}>
                            <View style={styles.progressFillInner} />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('ProfileScreen')}
                    >
                        <Text style={styles.secondaryButtonText}>{t('viewProfile')}</Text>
                        <Image
                            source={require('../../assets/arrow-forward.png')}
                            style={{ height: 18, width: 18, tintColor: '#047282', marginLeft: 6 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 24 }} />
            </ScrollView>

            {/* =====================================================
                MODAL 1 — CONSENT + SIGNATURE
                ===================================================== */}
            <Modal visible={consentVisible} transparent animationType="slide" onRequestClose={() => setConsentVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('consentTitle')}</Text>
                            <TouchableOpacity onPress={() => setConsentVisible(false)} style={styles.modalCloseBtn} activeOpacity={0.7}>
                                <Image
                                    source={require('../../assets/close.png')}
                                    style={{ height: 20, width: 20, tintColor: '#6B7A7C' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.consentScroll} showsVerticalScrollIndicator={false}>
                            <Text style={styles.consentText}>{CONSENT_TEXT}</Text>
                        </ScrollView>

                        <Text style={styles.signatureLabel}>{t('yourSignature')}</Text>
                        <SignaturePad onSignedChange={setIsSigned} signatureRef={signatureRef} />

                        <TouchableOpacity
                            style={[styles.modalPrimaryBtn, !isSigned && styles.modalPrimaryBtnDisabled]}
                            onPress={handleSaveConsent}
                            disabled={!isSigned}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.modalPrimaryBtnText}>{t('saveContinue')}</Text>
                            <Image
                                source={require('../../assets/arrow-forward.png')}
                                style={{ height: 18, width: 18, tintColor: '#FFFFFF', marginLeft: 6 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* =====================================================
                MODAL 2 — ENTER YOUR ACTIVITY DETAILS
                ===================================================== */}
            <Modal visible={productVisible} transparent animationType="slide" onRequestClose={() => setProductVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('activityDetails')}</Text>
                            <TouchableOpacity onPress={() => setProductVisible(false)} style={styles.modalCloseBtn} activeOpacity={0.7}>
                                <Image
                                    source={require('../../assets/close.png')}
                                    style={{ height: 20, width: 20, tintColor: '#6B7A7C' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>


                            <Text style={styles.fieldLabel}>{t('activityDate')}</Text>
                            <View style={styles.activityDateCard}>
                                <View style={styles.activityDateIconBg}>
                                    <Image
                                        source={require('../../assets/calendar.png')}
                                        style={{ height: 20, width: 20, tintColor: '#FFFFFF' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.activityDateLabel}>{t('today')}</Text>
                                    <Text style={styles.activityDateValue}>
                                        {new Date().toLocaleDateString('en-IN', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </Text>
                                    <View style={styles.activityDateMetaRow}>
                                        <View style={styles.activityDateMetaDot} />
                                        <Text style={styles.activityDateMeta}>
                                            {new Date().toLocaleDateString('en-IN', { weekday: 'long' })}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {/* Selfie */}
                            <Text style={styles.fieldLabel}>{t('selfieVerification')}</Text>
                            <View style={styles.selfieCard}>
                                <View style={styles.selfieCircle}>
                                    <Image
                                        source={require('../../assets/cameraa.png')}
                                        style={{ height: 36, width: 36, tintColor: '#047282' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.selfieTitle}>{t('takeSelfie')}</Text>
                                <Text style={styles.selfieSubtitle}>
                                    {t('selfieInstruction')}
                                </Text>
                                <TouchableOpacity style={styles.selfieBtn} activeOpacity={0.85}>
                                    <Image
                                        source={require('../../assets/camera-outline.png')}
                                        style={{ height: 18, width: 18, tintColor: '#FFFFFF' }}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.selfieBtnText}>{t('openCamera')}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Current Location */}
                            <Text style={styles.fieldLabel}>{t('currentLocation')}</Text>
                            <View style={styles.locationCard}>
                                <View style={styles.locationIconBg}>
                                    <Image
                                        source={require('../../assets/location.png')}
                                        style={{ height: 22, width: 22, tintColor: '#FFFFFF' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.locationLabel}>{t('youAreHere')}</Text>
                                    <Text style={styles.locationAddress} numberOfLines={2}>
                                        BP Block Sector V, Bidhannagar, Kolkata, West Bengal 700091
                                    </Text>
                                    <View style={styles.locationMetaRow}>
                                        <View style={styles.locationMetaDot} />
                                        <Text style={styles.locationMeta}>{t('gpsAccuracy')}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Product Name */}
                            <Text style={styles.fieldLabel}>{t('productName')}</Text>
                            <View style={styles.productNameBox}>
                                <Image
                                    source={require('../../assets/cube-outline.png')}
                                    style={{ height: 18, width: 18, tintColor: '#047282' }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.productNameText}>{productName}</Text>
                            </View>
                            <Text style={styles.summaryValue}>{t('rate')}: ₹{RATE_PER_UNIT} / unit</Text>

                            {/* Quantity */}
                            <Text style={styles.fieldLabel}>{t('value')}</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Qty"
                                    placeholderTextColor="#A7B4B6"
                                    keyboardType="number-pad"
                                    value={quantity}
                                    onChangeText={(v) => setQuantity(v.replace(/[^0-9]/g, ''))}
                                />
                            </View>

                            {/* Summary */}
                            <View style={styles.summaryBox}>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>{t('value')}</Text>
                                    <Text style={styles.summaryValue}>{quantity || '0'} unit(s)</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>{t('rate')}</Text>
                                    <Text style={styles.summaryValue}>₹ {RATE_PER_UNIT} / unit</Text>
                                </View>
                                <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                                    <Text style={styles.summaryTotalLabel}>{t('total')}</Text>
                                    <Text style={styles.summaryTotalValue}>₹ {rate}</Text>
                                </View>
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.modalPrimaryBtn, !quantity && styles.modalPrimaryBtnDisabled]}
                            onPress={handleSaveProduct}
                            disabled={!quantity}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.modalPrimaryBtnText}>{t('save')}</Text>
                            <Image
                                source={require('../../assets/checkmark.png')}
                                style={{ height: 18, width: 18, tintColor: '#FFFFFF', marginLeft: 6 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* =====================================================
                MODAL 3 — LANGUAGE SELECTOR
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
                            <Text style={styles.modalTitle}>Choose Language</Text>
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
                                    onPress={async () => {
                                        try {
                                            await AsyncStorage.setItem(
                                                'selectedLanguage',
                                                lang.key
                                            );

                                            setSelectedLanguage(lang.key);
                                            setLanguageModalVisible(false);
                                        } catch (error) {
                                            console.log('Error saving language:', error);
                                        }
                                    }}
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
        </View>
    );
};

/* ---------- Reusable detail row ---------- */
const DetailRow = ({ icon, iconBg, iconColor, label, value, last }) => (
    <View style={[styles.detailRow, !last && styles.detailRowBorder]}>
        <View style={styles.detailLeft}>
            <View style={[styles.detailIconChip, { backgroundColor: iconBg }]}>
                <Image
                    source={icon}
                    style={{
                        width: 14,
                        height: 14,
                        resizeMode: 'contain',
                        tintColor: iconColor,
                    }}
                />
            </View>
            <Text style={styles.detailLabel}>{label}</Text>
        </View>
        <Text style={styles.detailValue} numberOfLines={1}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F9FA' },
    scrollContent: { paddingBottom: 30 },

    /* Header */
    header: {
        backgroundColor: '#047282',
        paddingTop: Platform.OS === 'ios' ? 62 : 44,
        paddingHorizontal: 24,
        paddingBottom: 80,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
    },
    headerCircle1: { position: 'absolute', top: -90, right: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(254,169,47,0.18)' },
    headerCircle2: { position: 'absolute', bottom: -120, left: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(123,92,255,0.16)' },
    headerCircle3: { position: 'absolute', top: 20, left: -40, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.06)' },
    headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
    greeting: { fontFamily: 'InstrumentSans-Bold', fontSize: 22, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 },
    subGreeting: { fontFamily: 'InstrumentSans-Regular', fontSize: 14, color: 'rgba(255,255,255,0.82)', marginTop: 4 },
    bellBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.16)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.24)' },
    bellDot: { position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FEA92F', borderWidth: 1.5, borderColor: '#047282' },

    /* ============ LANGUAGE BUTTON ============ */
    langBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.16)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.24)',
        marginRight: 10,
    },
    langBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.3,
    },

    /* SL card */
    slCard: { backgroundColor: '#FFFFFF', borderRadius: 24, marginHorizontal: 20, marginTop: -56, padding: 20, shadowColor: '#047282', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 10 },
    statusPill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#E4F9EC', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, marginBottom: 16 },
    statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#22C55E', marginRight: 6 },
    statusText: { fontFamily: 'InstrumentSans-Bold', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, color: '#16A34A' },
    slHeaderRow: { flexDirection: 'row', alignItems: 'center' },
    slIconBox: { width: 52, height: 52, borderRadius: 16, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginRight: 14, position: 'relative' },
    slIconGradientTop: { ...StyleSheet.absoluteFillObject, backgroundColor: '#FEA92F' },
    slIconGradientBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', backgroundColor: '#F58220', opacity: 0.55 },
    slHeaderTextWrap: { flex: 1 },
    slName: { fontFamily: 'InstrumentSans-Bold', fontSize: 18, fontWeight: '700', color: '#0A2E33', letterSpacing: -0.2 },
    slLocation: { fontFamily: 'InstrumentSans-Regular', fontSize: 13, color: '#6B7A7C', marginTop: 2 },
    divider: { height: 1, backgroundColor: '#E4ECEE', marginVertical: 16 },

    /* Detail rows */
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
    detailRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F2F5F6' },
    detailLeft: { flexDirection: 'row', alignItems: 'center' },
    detailIconChip: { width: 26, height: 26, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    detailLabel: { fontFamily: 'InstrumentSans-Regular', fontSize: 13, color: '#6B7A7C' },
    detailValue: { fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '600', color: '#0A2E33', flexShrink: 1, textAlign: 'right', marginLeft: 16 },

    /* Primary CTA */
    primaryButton: { flexDirection: 'row', height: 54, borderRadius: 16, backgroundColor: '#FEA92F', justifyContent: 'center', alignItems: 'center', marginTop: 18, shadowColor: '#FEA92F', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 8, overflow: 'hidden', position: 'relative' },
    primaryButtonGlow: { position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.18)' },
    primaryButtonText: { fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.2, marginLeft: 8 },

    /* ============ QUICK ACTIONS ============ */
    quickActionsRow: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        gap: 12,
    },
    quickCard: {
        flex: 1,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    quickCardBlue: {
        backgroundColor: '#E8F4FF',
        borderColor: '#C5DEFF',
    },
    quickCardGreen: {
        backgroundColor: '#E4F9EC',
        borderColor: '#B8EBC9',
    },
    quickIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    quickIconBlue: {
        backgroundColor: '#2C7BE5',
    },
    quickIconGreen: {
        backgroundColor: '#22A06B',
    },
    quickTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#0A2E33',
        letterSpacing: -0.2,
    },
    quickSub: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 11,
        color: '#6B7A7C',
        marginTop: 3,
    },
    quickArrow: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickArrowBlue: {},
    quickArrowGreen: {},

    /* Profile card */
    profileCard: { backgroundColor: '#FFFFFF', borderRadius: 24, marginHorizontal: 20, marginTop: 20, padding: 20, shadowColor: '#7B5CFF', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.10, shadowRadius: 20, elevation: 6 },
    profileHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    profileIconBox: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#F0EDFF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    profileTitle: { fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700', color: '#0A2E33', flex: 1 },
    percentBadge: { backgroundColor: '#FFF4E5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    percentBadgeText: { fontFamily: 'InstrumentSans-Bold', fontSize: 12, fontWeight: '700', color: '#F5A623' },
    profileStatusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    profileStatusText: { fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '600', color: '#0A2E33', marginLeft: 8 },
    progressBar: { height: 10, borderRadius: 5, backgroundColor: '#F2F5F6', overflow: 'hidden', marginBottom: 14 },
    progressFillOuter: { height: '100%', borderRadius: 5, backgroundColor: '#FEA92F', overflow: 'hidden' },
    progressFillInner: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
    missingWrap: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 },
    missingLabel: { fontFamily: 'InstrumentSans-Regular', fontSize: 12, color: '#6B7A7C', marginRight: 8 },
    missingPill: { backgroundColor: '#FFEBF0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 6, marginBottom: 4 },
    missingPillText: { fontFamily: 'InstrumentSans-Bold', fontSize: 11, fontWeight: '600', color: '#E63E6D' },
    secondaryButton: { flexDirection: 'row', height: 50, borderRadius: 14, backgroundColor: '#EAF5F6', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#D4E9EC' },
    secondaryButtonText: { fontFamily: 'InstrumentSans-Bold', fontSize: 15, fontWeight: '700', color: '#047282', letterSpacing: 0.2 },

    /* MODAL COMMON */
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(10,46,51,0.55)', justifyContent: 'flex-end' },
    modalSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 24, paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 34 : 22, maxHeight: '92%' },
    modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    modalTitle: { fontFamily: 'InstrumentSans-Bold', fontSize: 19, fontWeight: '700', color: '#0A2E33', letterSpacing: -0.2, flex: 1, marginRight: 10 },
    modalCloseBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F2F9FA', justifyContent: 'center', alignItems: 'center' },

    /* Consent modal */
    consentScroll: { maxHeight: 220, marginBottom: 14 },
    consentText: { fontFamily: 'InstrumentSans-Regular', fontSize: 13, lineHeight: 21, color: '#3A4B4E' },
    signatureLabel: { fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '600', color: '#0A2E33', marginBottom: 8 },
    signatureBox: { backgroundColor: '#F7FAFB', borderRadius: 14, borderWidth: 1.5, borderColor: '#D4E9EC', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' },
    signaturePlaceholder: { fontFamily: 'InstrumentSans-Regular', fontSize: 13, color: '#A7B4B6' },
    clearBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 8, paddingVertical: 4 },
    clearBtnText: { fontFamily: 'InstrumentSans-Regular', fontSize: 12, color: '#E63E6D', marginLeft: 4, fontWeight: '600' },

    /* Activity details modal */
    fieldLabel: { fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '600', color: '#0A2E33', marginBottom: 8, marginTop: 14 },
    selfieCard: { backgroundColor: '#F2F9FA', borderRadius: 16, borderWidth: 1.5, borderColor: '#D4E9EC', borderStyle: 'dashed', paddingVertical: 20, alignItems: 'center' },
    selfieCircle: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 2, borderColor: '#EAF5F6' },
    selfieTitle: { fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '700', color: '#0A2E33' },
    selfieSubtitle: { fontFamily: 'InstrumentSans-Regular', fontSize: 12, color: '#6B7A7C', marginTop: 3, marginBottom: 14, textAlign: 'center', paddingHorizontal: 12 },
    selfieBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#047282', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 22 },
    selfieBtnText: { fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginLeft: 6 },
    locationCard: { flexDirection: 'row', backgroundColor: '#E8F4FF', borderRadius: 16, padding: 14, borderWidth: 1.5, borderColor: '#B8D9FF', alignItems: 'flex-start' },
    locationIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#2C7BE5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    locationLabel: { fontFamily: 'InstrumentSans-Bold', fontSize: 11, fontWeight: '700', letterSpacing: 0.6, color: '#2C7BE5', textTransform: 'uppercase' },
    locationAddress: { fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '600', color: '#0A2E33', marginTop: 4, lineHeight: 19 },
    locationMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    locationMetaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22C55E', marginRight: 6 },
    locationMeta: { fontFamily: 'InstrumentSans-Regular', fontSize: 11, color: '#6B7A7C' },
    productNameBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAF5F6', borderRadius: 12, paddingHorizontal: 14, height: 70 },
    productNameText: { fontFamily: 'InstrumentSans-Bold', fontSize: 15, fontWeight: '700', color: '#047282', marginLeft: 10 },
    inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7FAFB', borderRadius: 12, borderWidth: 1, borderColor: '#E4ECEE', paddingHorizontal: 14, height: 54 },
    inputRowDisabled: { backgroundColor: '#F2F5F6', borderColor: '#E4ECEE' },
    input: { flex: 1, fontFamily: 'InstrumentSans-Regular', fontSize: 15, color: '#0A2E33', paddingVertical: 0 },
    summaryBox: { backgroundColor: '#F2F9FA', borderRadius: 14, padding: 14, marginTop: 18 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    summaryLabel: { fontFamily: 'InstrumentSans-Regular', fontSize: 13, color: '#6B7A7C' },
    summaryValue: { fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '600', color: '#0A2E33' },
    summaryTotalRow: { marginTop: 6, paddingTop: 10, marginBottom: 0, borderTopWidth: 1, borderTopColor: '#D4E9EC' },
    summaryTotalLabel: { fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '700', color: '#0A2E33' },
    summaryTotalValue: { fontFamily: 'InstrumentSans-Bold', fontSize: 18, fontWeight: '700', color: '#047282' },

    /* Modal primary button */
    modalPrimaryBtn: { flexDirection: 'row', height: 54, borderRadius: 14, backgroundColor: '#FEA92F', justifyContent: 'center', alignItems: 'center', marginTop: 16, shadowColor: '#FEA92F', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 },
    modalPrimaryBtnDisabled: { backgroundColor: '#F5D9A8', shadowOpacity: 0, elevation: 0 },
    modalPrimaryBtnText: { fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.2 },

    /* ============ LANGUAGE MODAL ============ */
    languageSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 22,
        width: '100%',
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
    /* Activity date card (product modal) */
activityDateCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF4E5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FFD9A8',
    alignItems: 'flex-start',
},
activityDateIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5A623',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
},
activityDateLabel: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: '#F5A623',
    textTransform: 'uppercase',
},
activityDateValue: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2E33',
    marginTop: 4,
},
activityDateMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
},
activityDateMetaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F5A623',
    marginRight: 6,
},
activityDateMeta: {
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 11,
    color: '#6B7A7C',
},
});

export default NewDashboardScreen;