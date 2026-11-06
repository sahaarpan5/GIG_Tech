import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    ActivityIndicator,
    ScrollView as RNScrollView,
} from 'react-native';

import API from '../../util/API';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

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
        guardianName: 'Guardian Name',
        relationship: 'Relationship',
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
        guardianName: 'অভিভাবকের নাম',
        relationship: 'সম্পর্ক',
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
        guardianName: 'अभिभावक का नाम',
        relationship: 'रिश्ता',
    },
};

const ProfileScreen = () => {
    const navigation = useNavigation();
    /* ---- Profile data from API ---- */
    const [profile, setProfile] = useState({
        name: '',
        mobile: '',
        email: '',
        gender: '',
        location: '',
        dob: '',
        qualification: '',
        aadhaarNo: '',
        panNo: '',
        bankName: '',
        accountNo: '',
        ifsc: '',
        aadhaarFile: '',
        panFile: '',
        bankFile: '',
        guardianName: '',
        relationship: '',
    });

    const {
        name,
        mobile,
        email,
        gender,
        location,
        dob,
        qualification,
        aadhaarNo,
        panNo,
        bankName,
        accountNo,
        ifsc,
        guardianName,
        relationship,
    } = profile;

    const [documentZoom, setDocumentZoom] = useState(1);

    const [profileLoading, setProfileLoading] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const t = (key) =>
        PROFILE_TRANSLATIONS[selectedLanguage]?.[key] ??
        PROFILE_TRANSLATIONS.English[key] ??
        key;

    /* Document preview modal */
    const [docModalVisible, setDocModalVisible] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);


    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const formatDOB = (dateString) => {
        if (!dateString) return '';

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) return '';

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };


    const handleZoomIn = () => {
        setDocumentZoom(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setDocumentZoom(prev => Math.max(prev - 0.25, 1));
    };

    const resetZoom = () => {
        setDocumentZoom(1);
    };



    /* Fetch Worker Details API */
    const fetchWorkerDetails = async () => {
        try {
            setProfileLoading(true);

            const token = await AsyncStorage.getItem('accessToken');
            const payrollCode = await AsyncStorage.getItem('workerPayrollCode');

            if (!token || !payrollCode) {
                Alert.alert(
                    'Error',
                    'Login details not found. Please login again.'
                );
                return;
            }

            const today = new Date();

            const toDate = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, '0'),
                String(today.getDate()).padStart(2, '0'),
            ].join('-');

            const payload = {
                Op: 3,
                Worker_PayrollCode: payrollCode,
                FromDate: `2026-01-01`,
                ToDate: '2026-11-05',
                Sl: '',
            };

            console.log('Worker Details Request:', payload);

            const response = await axios.post(
                API.WORKER_DETAILS,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 30000,
                }
            );

            console.log(
                'Worker Details API Status:',
                response.data?.Status
            );

            if (
                response.data?.Status === true &&
                Array.isArray(response.data?.Data) &&
                response.data.Data.length > 0
            ) {
                const data = response.data.Data[0];

                setProfile({
                    name: data.Worker_Name?.trim() || '',
                    mobile: data.Mobile || '',
                    email: data.EmailID || '',
                    gender: data.GenderName || '',
                    location: data.Location || '',

                    guardianName: data.GuardianName || '',
                    relationship: data.RelationShip || '',

                    dob: formatDOB(data.DateOfBirth),
                    qualification: data.Qualification || '',

                    aadhaarNo: data.AADHARNo || '',
                    panNo: data.ITMPanNo || '',

                    bankName: data.Worker_Name?.trim() || '',
                    accountNo: data.AccountNumber || '',
                    ifsc: data.IFSC || '',

                    aadhaarFile: data.AadharFile_Path || '',
                    panFile: data.PANFile_Path || '',
                    bankFile: data.BankFile_Path || '',
                });
            } else {
                setProfile({
                    name: '',
                    mobile: '',
                    email: '',
                    gender: '',
                    location: '',
                    dob: '',
                    qualification: '',
                    aadhaarNo: '',
                    panNo: '',
                    bankName: '',
                    accountNo: '',
                    ifsc: '',
                    aadhaarFile: '',
                    panFile: '',
                    bankFile: '',
                    guardianName: '',
                    relationship: '',
                });

                Alert.alert(
                    'Failed',
                    response.data?.Message || 'Unable to fetch worker details.'
                );
            }

        } catch (error) {
            console.log(
                'Worker Details API Error:',
                error.response?.data || error.message
            );

            Alert.alert(
                'Error',
                error.response?.data?.Message ||
                'Unable to load profile details.'
            );
        } finally {
            setProfileLoading(false);
        }
    };

    const openDocument = (docKey) => {
        const documents = {
            aadhaar: {
                title: 'Aadhaar Card',
                uri: profile.aadhaarFile,
            },
            pan: {
                title: 'PAN Card',
                uri: profile.panFile,
            },
            bank: {
                title: 'Bank Document',
                uri: profile.bankFile,
            },
        };
        setDocumentZoom(1);

        setSelectedDoc(documents[docKey]);
        setDocModalVisible(true);
    };

    const closeDocument = () => {
        setDocModalVisible(false);
        setSelectedDoc(null);
        setDocumentZoom(1);
    };

    const handleChangeRequest = () => {
        Alert.alert(t('requestSent'), t('requestSentMsg'), [
            { text: t('ok'), style: 'default' },
        ]);
    };

    useEffect(() => {
        const initializeProfile = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem(
                    'selectedLanguage'
                );

                if (
                    savedLanguage &&
                    PROFILE_TRANSLATIONS[savedLanguage]
                ) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log(
                    'Error loading saved language:',
                    error
                );
            }

            fetchWorkerDetails();
        };

        initializeProfile();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />

            {/* Profile API Loader */}
            {profileLoading && (
                <View style={styles.profileLoaderOverlay}>
                    <View style={styles.profileLoaderBox}>
                        <ActivityIndicator
                            size="large"
                            color="#047282"
                        />
                        <Text style={styles.profileLoaderText}>
                            Loading profile details...
                        </Text>
                    </View>
                </View>
            )}

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ============ HEADER ============ */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleGoBack}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require('../../assets/arrow-back.png')}
                            style={styles.backIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <View style={styles.headerCircle1} />
                    <View style={styles.headerCircle2} />

                    <View style={styles.avatarWrap}>
                        <View style={styles.avatar}>
                            <Image
                                source={require('../../assets/profileone.png')}
                                style={{
                                    height: 44,
                                    width: 44,
                                    tintColor: '#047282',
                                }}
                                resizeMode="contain"
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.avatarEdit}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={require('../../assets/camera.png')}
                                style={{
                                    height: 14,
                                    width: 14,
                                    tintColor: '#FFFFFF',
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.profileName}>
                        {name || t('yourName')}
                    </Text>

                    {/* Verified badge */}
                    <View style={styles.verifiedBadge}>
                        <Image
                            source={require('../../assets/checked.png')}
                            style={{
                                width: 12,
                                height: 12,
                                tintColor: '#FFFFFF',
                            }}
                            resizeMode="contain"
                        />

                        <Text style={styles.verifiedText}>
                            {t('verified')}
                        </Text>
                    </View>

                    <Text style={styles.profileEmail}>
                        {mobile}
                    </Text>
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
                        icon={require('../../assets/person-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('mobile')}
                        value={mobile ? `+91 ${mobile}` : ''}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/smartphone.png')}
                    />

                    <ReadOnlyField
                        label={t('email')}
                        value={email}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/mail.png')}
                    />

                    <ReadOnlyField
                        label={t('gender')}
                        value={gender}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/person-outline.png')}
                    />


                    <ReadOnlyField
                        label={t('guardianName')}
                        value={guardianName}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/person-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('relationship')}
                        value={relationship}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/person-outline.png')}
                    />



                    <ReadOnlyField
                        label={t('dob')}
                        value={dob}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/calendar.png')}
                    />

                    <ReadOnlyField
                        label={t('qualification')}
                        value={qualification}
                        onChangeRequest={handleChangeRequest}
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
                        value={name}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/person-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('accountNo')}
                        value={accountNo}
                        onChangeRequest={handleChangeRequest}
                        icon={require('../../assets/keypad-outline.png')}
                    />

                    <ReadOnlyField
                        label={t('ifsc')}
                        value={ifsc}
                        onChangeRequest={handleChangeRequest}
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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
                                <View style={styles.docHeaderIconBox}>
                                    <Image
                                        source={require('../../assets/document.png')}
                                        style={{
                                            width: 16,
                                            height: 16,
                                            tintColor: '#047282',
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>

                                <Text
                                    style={styles.docTitle}
                                    numberOfLines={1}
                                >
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
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: '#6B7A7C',
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Document image preview */}
                        <View style={styles.docImageWrap}>
                            {selectedDoc?.uri ? (
                                <Image
                                    source={{ uri: selectedDoc.uri }}
                                    style={[
                                        styles.docImage,
                                        {
                                            transform: [{ scale: documentZoom }],
                                        },
                                    ]}
                                    resizeMode="contain"
                                />
                            ) : (
                                <View style={styles.docEmptyState}>
                                    <Image
                                        source={require('../../assets/document.png')}
                                        style={{
                                            width: 56,
                                            height: 56,
                                            tintColor: '#D4E9EC',
                                        }}
                                        resizeMode="contain"
                                    />

                                    <Text style={styles.docEmptyText}>
                                        {t('documentPreview')}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Zoom Controls */}
                        {selectedDoc?.uri && (
                            <View style={styles.zoomControls}>
                                <TouchableOpacity
                                    style={styles.zoomButton}
                                    onPress={handleZoomOut}
                                    disabled={documentZoom <= 1}
                                >
                                    <Text style={styles.zoomButtonText}>−</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.zoomResetButton}
                                    onPress={resetZoom}
                                >
                                    <Text style={styles.zoomResetText}>Reset</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.zoomButton}
                                    onPress={handleZoomIn}
                                    disabled={documentZoom >= 3}
                                >
                                    <Text style={styles.zoomButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Document meta chip */}
                        <View style={styles.docMetaRow}>
                            <View style={styles.docMetaChip}>
                                <Image
                                    source={require('../../assets/checked.png')}
                                    style={{
                                        width: 12,
                                        height: 12,
                                        tintColor: '#22A06B',
                                    }}
                                    resizeMode="contain"
                                />

                                <Text style={styles.docMetaText}>
                                    {t('verified')}
                                </Text>
                            </View>

                            <Text style={styles.docMetaUploaded}>
                                Uploaded
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.docCloseFullBtn}
                            onPress={closeDocument}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.docCloseFullBtnText}>
                                {t('close')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

/* ---------- Reusable components ---------- */

const SectionHeader = ({
    icon,
    title,
    iconBg,
    iconColor,
}) => (
    <View style={styles.sectionHeader}>
        <View
            style={[
                styles.sectionIconBox,
                { backgroundColor: iconBg },
            ]}
        >
            <Image
                source={icon}
                style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: iconColor,
                }}
            />
        </View>

        <Text style={styles.sectionTitle}>
            {title}
        </Text>
    </View>
);

/* Read-only field with Change Request button */
const ReadOnlyField = ({
    label,
    value,
    icon,
    onChangeRequest,
    changeLabel,
    last,
}) => (
    <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>
            {label}
        </Text>

        <View
            style={[
                styles.readOnlyRow,
                last && { marginBottom: 4 },
            ]}
        >
            <Image
                source={icon}
                style={styles.readOnlyIcon}
                resizeMode="contain"
            />

            <Text
                style={styles.readOnlyValue}
                numberOfLines={1}
            >
                {value || '-'}
            </Text>

            <TouchableOpacity
                style={styles.changeBtn}
                onPress={onChangeRequest}
                activeOpacity={0.8}
            >
                <Text style={styles.changeBtnText}>
                    {changeLabel}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

/* Document field with View button */
const ViewDocumentField = ({
    label,
    onView,
    viewLabel,
    last,
}) => (
    <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>
            {label}
        </Text>

        <View
            style={[
                styles.docRow,
                last && { marginBottom: 4 },
            ]}
        >
            <View style={styles.docIconBox}>
                <Image
                    source={require('../../assets/document.png')}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: '#047282',
                    }}
                    resizeMode="contain"
                />
            </View>

            <View style={{ flex: 1 }}>
                <Text
                    style={styles.docFileLabel}
                    numberOfLines={1}
                >
                    {label}
                </Text>

                <Text style={styles.docFileHint}>
                    Tap to preview
                </Text>
            </View>

            <TouchableOpacity
                style={styles.viewDocBtn}
                onPress={onView}
                activeOpacity={0.8}
            >
                <Text style={styles.viewDocBtnText}>
                    {viewLabel}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F9FA',
    },

    /* Profile loader */
    profileLoaderOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 999,
    },
    profileLoaderBox: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 25,
        paddingVertical: 22,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 5,
    },
    profileLoaderText: {
        marginTop: 12,
        fontSize: 13,
        fontFamily: 'InstrumentSans-Bold',
        color: '#047282',
    },

    scrollContent: {
        paddingBottom: 30,
    },

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
        position: 'absolute',
        top: -80,
        right: -80,
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(254,169,47,0.18)',
    },
    headerCircle2: {
        position: 'absolute',
        bottom: -100,
        left: -60,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(123,92,255,0.16)',
    },
    avatarWrap: {
        position: 'relative',
        marginBottom: 14,
    },
    avatar: {
        width: 92,
        height: 92,
        borderRadius: 46,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    avatarEdit: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FEA92F',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    profileName: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.3,
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
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: 'rgba(255,255,255,0.82)',
        marginTop: 3,
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
        width: 34,
        height: 34,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    sectionTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '700',
        color: '#0A2E33',
        letterSpacing: -0.2,
    },

    /* Field block */
    fieldBlock: {
        marginTop: 14,
    },
    fieldLabel: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 12,
        fontWeight: '600',
        color: '#0A2E33',
        marginBottom: 6,
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

    /* Document modal */
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
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 55 : 40,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: '#FFFFFF',
    },

    zoomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
        gap: 14,
    },

    zoomButton: {
        width: 40,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#EAF5F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    zoomButtonText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#047282',
    },

    zoomResetButton: {
        paddingHorizontal: 18,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#047282',
        justifyContent: 'center',
        alignItems: 'center',
    },

    zoomResetText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default ProfileScreen;