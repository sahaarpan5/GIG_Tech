import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
    Image,
    Modal,
    Dimensions,
    Alert,
    ScrollView as RNScrollView,
} from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/* ---------- Sample document images (replace with real URLs from API) ---------- */
const DOCUMENTS = {
    aadhaar: {
        title: 'Aadhaar Card',
        image: require('../../assets/aadhar.png'),
        // Placeholder sample — replace with actual aadhaar scan URL
    },
    pan: {
        title: 'PAN Card',
        image: require('../../assets/PAN.png'),
        // Placeholder sample — replace with actual PAN scan URL
    },
    bank: {
        title: 'Bank Document',
        image: require('../../assets/chque.png'),
        // Placeholder sample — replace with actual cheque/passbook scan URL
    },
};

const PROFILE_TRANSLATIONS = {
    English: {
        personalInfo: 'Personal Information',
        fullName: 'Full Name',
        mobile: 'Mobile Number',
        email: 'Email Address',
        gender: 'Gender',
        location: 'Location',
        dob: 'Date of Birth',
        qualification: 'Highest Qualification',
        identity: 'Identity Documents',
        aadhaar: 'Aadhaar Number',
        aadhaarFile: 'Aadhaar File',
        pan: 'PAN Number',
        panFile: 'PAN File',
        bankDetails: 'Bank Details',
        bankName: 'Name as per Bank',
        accountNo: 'Account Number',
        ifsc: 'IFSC Code',
        bankFile: 'Bank File (Cancelled Cheque / Passbook)',
        changeRequest: 'Change Request',
        viewDocument: 'View Document',
        documentPreview: 'Document Preview',
        close: 'Close',
        yourName: 'Your Name',
        yourEmail: 'your@email.com',
        male: 'Male',
        female: 'Female',
        other: 'Other',
        verified: 'Verified',
        requestSent: 'Request Sent',
        requestSentMsg: 'Your change request has been submitted. Our team will review it shortly.',
        ok: 'OK',
    },
    Bengali: {
        personalInfo: 'ব্যক্তিগত তথ্য',
        fullName: 'পুরো নাম',
        mobile: 'মোবাইল নম্বর',
        email: 'ইমেল ঠিকানা',
        gender: 'লিঙ্গ',
        location: 'ঠিকানা',
        dob: 'জন্ম তারিখ',
        qualification: 'সর্বোচ্চ শিক্ষাগত যোগ্যতা',
        identity: 'পরিচয়পত্র',
        aadhaar: 'আধার নম্বর',
        aadhaarFile: 'আধার ফাইল',
        pan: 'প্যান নম্বর',
        panFile: 'প্যান ফাইল',
        bankDetails: 'ব্যাঙ্কের বিবরণ',
        bankName: 'ব্যাঙ্কের নথি অনুযায়ী নাম',
        accountNo: 'অ্যাকাউন্ট নম্বর',
        ifsc: 'IFSC কোড',
        bankFile: 'ব্যাঙ্কের নথি (বাতিল চেক / পাসবুক)',
        changeRequest: 'পরিবর্তনের অনুরোধ',
        viewDocument: 'নথি দেখুন',
        documentPreview: 'নথির প্রিভিউ',
        close: 'বন্ধ করুন',
        yourName: 'আপনার নাম',
        yourEmail: 'আপনার ইমেল',
        male: 'পুরুষ',
        female: 'মহিলা',
        other: 'অন্যান্য',
        verified: 'যাচাইকৃত',
        requestSent: 'অনুরোধ পাঠানো হয়েছে',
        requestSentMsg: 'আপনার পরিবর্তনের অনুরোধ জমা দেওয়া হয়েছে। আমাদের দল শীঘ্রই এটি পর্যালোচনা করবে।',
        ok: 'ঠিক আছে',
    },
    Hindi: {
        personalInfo: 'व्यक्तिगत जानकारी',
        fullName: 'पूरा नाम',
        mobile: 'मोबाइल नंबर',
        email: 'ईमेल पता',
        gender: 'लिंग',
        location: 'स्थान',
        dob: 'जन्म तिथि',
        qualification: 'उच्चतम शैक्षणिक योग्यता',
        identity: 'पहचान दस्तावेज़',
        aadhaar: 'आधार नंबर',
        aadhaarFile: 'आधार फ़ाइल',
        pan: 'पैन नंबर',
        panFile: 'पैन फ़ाइल',
        bankDetails: 'बैंक विवरण',
        bankName: 'बैंक रिकॉर्ड के अनुसार नाम',
        accountNo: 'खाता नंबर',
        ifsc: 'IFSC कोड',
        bankFile: 'बैंक दस्तावेज़ (रद्द चेक / पासबुक)',
        changeRequest: 'बदलाव का अनुरोध',
        viewDocument: 'दस्तावेज़ देखें',
        documentPreview: 'दस्तावेज़ पूर्वावलोकन',
        close: 'बंद करें',
        yourName: 'आपका नाम',
        yourEmail: 'आपका ईमेल',
        male: 'पुरुष',
        female: 'महिला',
        other: 'अन्य',
        verified: 'सत्यापित',
        requestSent: 'अनुरोध भेजा गया',
        requestSentMsg: 'आपका परिवर्तन अनुरोध सबमिट कर दिया गया है। हमारी टीम जल्द ही इसकी समीक्षा करेगी।',
        ok: 'ठीक है',
    },
};

const ProfileScreen = () => {
    /* ---- Profile data (read-only) ---- */
    const [name] = useState('Rahul Sharma');
    const [mobile] = useState('9876543210');
    const [email] = useState('rahul@example.com');
    const [gender] = useState('Male');
    const [location] = useState('Sector 18, Noida, UP');
    const [dob] = useState('15 Aug 1995');
    const [qualification] = useState('Graduate');
    const [aadhaarNo] = useState('1234 5678 9012');
    const [panNo] = useState('ABCDE1234F');
    const [bankName] = useState('Rahul Sharma');
    const [accountNo] = useState('1234567890');
    const [ifsc] = useState('SBIN0001234');

    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const t = (key) =>
        PROFILE_TRANSLATIONS[selectedLanguage]?.[key] ??
        PROFILE_TRANSLATIONS.English[key] ??
        key;

    /* Document preview modal */
    const [docModalVisible, setDocModalVisible] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const openDocument = (docKey) => {
        setSelectedDoc(DOCUMENTS[docKey]);
        setDocModalVisible(true);
    };

    const closeDocument = () => {
        setDocModalVisible(false);
        setSelectedDoc(null);
    };

    const handleChangeRequest = () => {
        Alert.alert(t('requestSent'), t('requestSentMsg'), [
            { text: t('ok'), style: 'default' },
        ]);
    };

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (savedLanguage && PROFILE_TRANSLATIONS[savedLanguage]) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log('Error loading saved language:', error);
            }
        };
        loadLanguage();
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

                    <View style={styles.avatarWrap}>
                        <View style={styles.avatar}>
                            <Image
                                source={require('../../assets/profileone.png')}
                                style={{ height: 44, width: 44, tintColor: '#047282' }}
                                resizeMode="contain"
                            />
                        </View>
                        <TouchableOpacity style={styles.avatarEdit} activeOpacity={0.8}>
                            <Image
                                source={require('../../assets/camera.png')}
                                style={{ height: 14, width: 14, tintColor: '#FFFFFF' }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.profileName}>{name || t('yourName')}</Text>

                    {/* Verified badge */}
                    <View style={styles.verifiedBadge}>
                        <Image
                            source={require('../../assets/checked.png')}
                            style={{ width: 12, height: 12, tintColor: '#FFFFFF' }}
                            resizeMode="contain"
                        />
                        <Text style={styles.verifiedText}>{t('verified')}</Text>
                    </View>

                    <Text style={styles.profileEmail}>{email || t('yourEmail')}</Text>
                </View>

                {/* ============ FORM CARD ============ */}
                <View style={styles.formCard}>
                    {/* ---------- SECTION: Personal ---------- */}
                    <SectionHeader
                        icon={require('../../assets/person-outline.png')}
                        title={t('personalInfo')}
                        iconBg="#F0EDFF"
                        iconColor="#7B5CFF"
                    />

                    <ReadOnlyField
                        label={t('fullName')}
                        value={name}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/person-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('mobile')}
                        value={`+91 ${mobile}`}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/smartphone.png')}
                    />

                    <ReadOnlyField
                        label={t('email')}
                        value={email}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/mail.png')}
                    />

                    <ReadOnlyField
                        label={t('gender')}
                        value={gender}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/person-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('location')}
                        value={location}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/location.png')}
                    />

                    <ReadOnlyField
                        label={t('dob')}
                        value={dob}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/calendar.png')}
                    />

                    <ReadOnlyField
                        label={t('qualification')}
                        value={qualification}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/school-outline.png')}
                        last
                    />

                    {/* ---------- SECTION: Identity ---------- */}
                    <SectionHeader
                        icon={require('../../assets/security.png')}
                        title={t('identity')}
                        iconBg="#E8F4FF"
                        iconColor="#2C7BE5"
                    />

                    <ReadOnlyField
                        label={t('aadhaar')}
                        value={aadhaarNo}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/card-outline.png')}
                    />

                    <ViewDocumentField
                        label={t('aadhaarFile')}
                        onView={() => openDocument('aadhaar')}
                        viewLabel={t('viewDocument')}
                    />

                    <ReadOnlyField
                        label={t('pan')}
                        value={panNo}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/card-outline.png')}
                    />

                    <ViewDocumentField
                        label={t('panFile')}
                        onView={() => openDocument('pan')}
                        viewLabel={t('viewDocument')}
                        last
                    />

                    {/* ---------- SECTION: Bank ---------- */}
                    <SectionHeader
                        icon={require('../../assets/bank.png')}
                        title={t('bankDetails')}
                        iconBg="#E4F9EC"
                        iconColor="#22A06B"
                    />

                    <ReadOnlyField
                        label={t('bankName')}
                        value={bankName}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/person-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('accountNo')}
                        value={accountNo}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/keypad-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('ifsc')}
                        value={ifsc}
                        onChangeRequest={handleChangeRequest}
                        changeLabel={t('changeRequest')}
                        icon={require('../../assets/bank.png')}
                    />

                    <ViewDocumentField
                        label={t('bankFile')}
                        onView={() => openDocument('bank')}
                        viewLabel={t('viewDocument')}
                        last
                    />
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* =====================================================
                DOCUMENT PREVIEW MODAL
                ===================================================== */}
            <Modal
                visible={docModalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeDocument}
            >
                <View style={styles.docBackdrop}>
                    <View style={styles.docSheet}>
                        <View style={styles.docHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <View style={styles.docHeaderIconBox}>
                                    <Image
                                        source={require('../../assets/document.png')}
                                        style={{ width: 16, height: 16, tintColor: '#047282' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.docTitle} numberOfLines={1}>
                                    {selectedDoc?.title}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={closeDocument}
                                style={styles.docCloseBtn}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={require('../../assets/close.png')}
                                    style={{ height: 20, width: 20, tintColor: '#6B7A7C' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Document image preview */}
                        <View style={styles.docImageWrap}>
                            {selectedDoc?.image ? (
                                <Image
                                    source={selectedDoc.image}
                                    style={styles.docImage}
                                    resizeMode="contain"
                                />
                            ) : (
                                <View style={styles.docEmptyState}>
                                    <Image
                                        source={require('../../assets/document.png')}
                                        style={{ width: 56, height: 56, tintColor: '#D4E9EC' }}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.docEmptyText}>
                                        {t('documentPreview')}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Document meta chip */}
                        <View style={styles.docMetaRow}>
                            <View style={styles.docMetaChip}>
                                <Image
                                    source={require('../../assets/checked.png')}
                                    style={{ width: 12, height: 12, tintColor: '#22A06B' }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.docMetaText}>{t('verified')}</Text>
                            </View>
                            <Text style={styles.docMetaUploaded}>Uploaded</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.docCloseFullBtn}
                            onPress={closeDocument}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.docCloseFullBtnText}>{t('close')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

/* ---------- Reusable components ---------- */

const SectionHeader = ({ icon, title, iconBg, iconColor }) => (
    <View style={styles.sectionHeader}>
        <View style={[styles.sectionIconBox, { backgroundColor: iconBg }]}>
            <Image
                source={icon}
                style={{ width: 18, height: 18, resizeMode: 'contain', tintColor: iconColor }}
            />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

/* Read-only field with Change Request button */
const ReadOnlyField = ({ label, value, icon, onChangeRequest, changeLabel, last }) => (
    <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={[styles.readOnlyRow, last && { marginBottom: 4 }]}>
            <Image
                source={icon}
                style={styles.readOnlyIcon}
                resizeMode="contain"
            />
            <Text style={styles.readOnlyValue} numberOfLines={1}>
                {value}
            </Text>
            <TouchableOpacity
                style={styles.changeBtn}
                onPress={onChangeRequest}
                activeOpacity={0.8}
            >
                <Text style={styles.changeBtnText}>{changeLabel}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

/* Document field with View button */
const ViewDocumentField = ({ label, onView, viewLabel, last }) => (
    <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <View style={[styles.docRow, last && { marginBottom: 4 }]}>
            <View style={styles.docIconBox}>
                <Image
                    source={require('../../assets/document.png')}
                    style={{ width: 20, height: 20, tintColor: '#047282' }}
                    resizeMode="contain"
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.docFileLabel} numberOfLines={1}>
                    {label}
                </Text>
                <Text style={styles.docFileHint}>Tap to preview</Text>
            </View>
            <TouchableOpacity
                style={styles.viewDocBtn}
                onPress={onView}
                activeOpacity={0.8}
            >
                <Text style={styles.viewDocBtnText}>{viewLabel}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F9FA' },
    scrollContent: { paddingBottom: 30 },

    /* Header */
    header: {
        backgroundColor: '#047282',
        paddingTop: Platform.OS === 'ios' ? 62 : 44,
        paddingBottom: 70,
        alignItems: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
        position: 'relative',
    },
    headerCircle1: {
        position: 'absolute', top: -80, right: -80,
        width: 220, height: 220, borderRadius: 110,
        backgroundColor: 'rgba(254,169,47,0.18)',
    },
    headerCircle2: {
        position: 'absolute', bottom: -100, left: -60,
        width: 200, height: 200, borderRadius: 100,
        backgroundColor: 'rgba(123,92,255,0.16)',
    },
    avatarWrap: { position: 'relative', marginBottom: 14 },
    avatar: {
        width: 92, height: 92, borderRadius: 46,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    },
    avatarEdit: {
        position: 'absolute', bottom: 0, right: 0,
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: '#FEA92F',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#FFFFFF',
    },
    profileName: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 22, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: -0.3,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(34,160,107,0.92)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    verifiedText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        marginLeft: 4,
        letterSpacing: 0.3,
    },
    profileEmail: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 13,
        color: 'rgba(255,255,255,0.82)', marginTop: 3,
    },

    /* Form card */
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginHorizontal: 20,
        marginTop: -46,
        padding: 20,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 10,
    },

    /* Section header */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 4,
    },
    sectionIconBox: {
        width: 34, height: 34, borderRadius: 11,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 10,
    },
    sectionTitle: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 15, fontWeight: '700',
        color: '#0A2E33', letterSpacing: -0.2,
    },

    /* Field block */
    fieldBlock: {
        marginTop: 14,
    },
    fieldLabel: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 12, fontWeight: '600',
        color: '#0A2E33', marginBottom: 6,
    },

    /* Read-only row */
    readOnlyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        paddingHorizontal: 14,
        height: 52,
    },
    readOnlyIcon: {
        width: 18,
        height: 18,
        tintColor: '#8A9698',
        marginRight: 10,
    },
    readOnlyValue: {
        flex: 1,
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#0A2E33',
    },
    changeBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#EAF5F6',
        borderWidth: 1,
        borderColor: '#D4E9EC',
        marginLeft: 8,
    },
    changeBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 10,
        fontWeight: '700',
        color: '#047282',
        letterSpacing: 0.2,
    },

    /* Document row */
    docRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    docIconBox: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: '#EAF5F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    docFileLabel: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '700',
        color: '#0A2E33',
    },
    docFileHint: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 11,
        color: '#8A9698',
        marginTop: 2,
    },
    viewDocBtn: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
        backgroundColor: '#047282',
    },
    viewDocBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },

    /* ============ DOCUMENT MODAL ============ */
    docBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(10,46,51,0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    docSheet: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        width: '100%',
        maxWidth: 420,
        maxHeight: SCREEN_H * 0.85,
    },
    docHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    docHeaderIconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#EAF5F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    docTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 17,
        fontWeight: '700',
        color: '#0A2E33',
        flex: 1,
        marginRight: 10,
    },
    docCloseBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F2F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    docImageWrap: {
        backgroundColor: '#F7FAFB',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        overflow: 'hidden',
        marginBottom: 14,
        height: SCREEN_H * 0.42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    docImage: {
        width: '100%',
        height: '100%',
    },
    docEmptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    docEmptyText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#8A9698',
        marginTop: 12,
    },
    docMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    docMetaChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E4F9EC',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    docMetaText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 11,
        fontWeight: '700',
        color: '#22A06B',
        marginLeft: 4,
    },
    docMetaUploaded: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 11,
        color: '#8A9698',
    },
    docCloseFullBtn: {
        height: 50,
        borderRadius: 12,
        backgroundColor: '#047282',
        justifyContent: 'center',
        alignItems: 'center',
    },
    docCloseFullBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },
});

export default ProfileScreen;