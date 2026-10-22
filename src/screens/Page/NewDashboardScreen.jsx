import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
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


const { width: SCREEN_W } = Dimensions.get('window');

const SL_DATA = {
    name: 'Sector 18 Hub',
    location: 'Sector 18, Noida, UP',
    assignedDate: '12 Oct 2025',
    startDate: '15 Oct 2025',
    endDate: '14 Nov 2025',
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

const RATE_PER_UNIT = 100;

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

    const [isSigned, setIsSigned] = useState(false);
    const signatureRef = useRef(null);

    const [quantity, setQuantity] = useState('');
    const [productName] = useState('Premium Steel Rod');

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
                            <Text style={styles.greeting}>Good morning, Rahul 👋</Text>
                            <Text style={styles.subGreeting}>Here's your today's work</Text>
                        </View>

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
                        <Text style={styles.statusText}>ACTIVE ASSIGNMENT</Text>
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

                    <DetailRow  icon={require('../../assets/location.png')} iconBg="#E8F4FF" iconColor="#2C7BE5" label="SL Location" value={SL_DATA.location} />
                    <DetailRow   icon={require('../../assets/calendar.png')}iconBg="#FFF4E5" iconColor="#F5A623" label="Assigned Date" value={SL_DATA.assignedDate} />
                    <DetailRow  icon={require('../../assets/play-button.png')}iconBg="#E8FBF2" iconColor="#22A06B" label="Start Date" value={SL_DATA.startDate} />
                    <DetailRow icon={require('../../assets/red-flag.png')} iconBg="#FFEBF0" iconColor="#E63E6D" label="End Date" value={SL_DATA.endDate} last />

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
                        <Text style={styles.primaryButtonText}>Start Activity</Text>

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
                        onPress={()=>navigation.navigate('ActivityReportScreen')}
                    >
                        <View style={[styles.quickIconBox, styles.quickIconBlue]}>

                            <Image
                                source={require('../../assets/bar-chart.png')}
                                style={{ height: 20, width: 20, tintColor: '#FFFFFF', }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.quickTitle}>Activity Report</Text>
                        
                        <View style={[styles.quickArrow, styles.quickArrowBlue]}>

                            <Image
                                source={require('../../assets/arrow-forward.png')}
                                style={{ height: 14, width: 14, tintColor: '#2C7BE5', }}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>

                    {/* My Earnings */}
                    <TouchableOpacity
                        style={[styles.quickCard, styles.quickCardGreen]}
                        activeOpacity={0.85}
                         onPress={()=>navigation.navigate('MyEarningsScreen')}
                    >
                        <View style={[styles.quickIconBox, styles.quickIconGreen]}>

                            <Image
                                source={require('../../assets/wallet.png')}
                                style={{ height: 20, width: 20, tintColor: '#FFFFFF', }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.quickTitle}>My Earnings</Text>
                        
                        <View style={[styles.quickArrow, styles.quickArrowGreen]}>

                            <Image
                                source={require('../../assets/arrow-forward.png')}
                                style={{ height: 14, width: 14, tintColor: '#22A06B', }}
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
                                style={{ height: 24, width: 24, tintColor: '#7B5CFF', }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.profileTitle}>Profile Status</Text>
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
                            {PROFILE.percent < 100 ? 'Profile incomplete' : 'Profile complete'}
                        </Text>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFillOuter, { width: `${PROFILE.percent}%` }]}>
                            <View style={styles.progressFillInner} />
                        </View>
                    </View>

                    

                    <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={()=>navigation.navigate('ProfileScreen')}>
                        <Text style={styles.secondaryButtonText}>View Profile</Text>

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
                            <Text style={styles.modalTitle}>Consent & Agreement</Text>
                            <TouchableOpacity onPress={() => setConsentVisible(false)} style={styles.modalCloseBtn} activeOpacity={0.7}>

                                <Image
                                    source={require('../../assets/close.png')}
                                    style={{ height: 20, width: 20, tintColor: '#6B7A7C', }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.consentScroll} showsVerticalScrollIndicator={false}>
                            <Text style={styles.consentText}>{CONSENT_TEXT}</Text>
                        </ScrollView>

                        <Text style={styles.signatureLabel}>Your Signature</Text>
                        <SignaturePad onSignedChange={setIsSigned} signatureRef={signatureRef} />

                        <TouchableOpacity
                            style={[styles.modalPrimaryBtn, !isSigned && styles.modalPrimaryBtnDisabled]}
                            onPress={handleSaveConsent}
                            disabled={!isSigned}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.modalPrimaryBtnText}>Save & Continue</Text>

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
                            <Text style={styles.modalTitle}>Enter your activity details</Text>
                            <TouchableOpacity onPress={() => setProductVisible(false)} style={styles.modalCloseBtn} activeOpacity={0.7}>

                                <Image
                                    source={require('../../assets/close.png')}
                                    style={{ height: 20, width: 20, tintColor: '#6B7A7C' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
                            {/* Selfie */}
                            <Text style={styles.fieldLabel}>Selfie Verification</Text>
                            <View style={styles.selfieCard}>
                                <View style={styles.selfieCircle}>

                                    <Image
                                        source={require('../../assets/cameraa.png')}
                                        style={{ height: 36, width: 36, tintColor: '#047282' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.selfieTitle}>Take a selfie</Text>
                                <Text style={styles.selfieSubtitle}>
                                    Make sure your face is clearly visible
                                </Text>
                                <TouchableOpacity style={styles.selfieBtn} activeOpacity={0.85}>

                                    <Image
                                        source={require('../../assets/camera-outline.png')}
                                        style={{ height: 18, width: 18, tintColor: '#FFFFFF' }}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.selfieBtnText}>Open Camera</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Current Location */}
                            <Text style={styles.fieldLabel}>Current Location</Text>
                            <View style={styles.locationCard}>
                                <View style={styles.locationIconBg}>

                                    <Image
                                        source={require('../../assets/location.png')}
                                        style={{ height: 22, width: 22, tintColor: '#FFFFFF' }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.locationLabel}>You are here</Text>
                                    <Text style={styles.locationAddress} numberOfLines={2}>
                                        Sector 18, Noida, Uttar Pradesh 201301
                                    </Text>
                                    <View style={styles.locationMetaRow}>
                                        <View style={styles.locationMetaDot} />
                                        <Text style={styles.locationMeta}>GPS accuracy ± 5m</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Product Name */}
                            <Text style={styles.fieldLabel}>Product Name</Text>
                            <View style={styles.productNameBox}>

                                <Image
                                    source={require('../../assets/cube-outline.png')}
                                    style={{ height: 18, width: 18, tintColor: '#047282' }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.productNameText}>{productName}</Text>
                            </View>

                            {/* Quantity */}
                            <Text style={styles.fieldLabel}>Quantity</Text>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter quantity"
                                    placeholderTextColor="#A7B4B6"
                                    keyboardType="number-pad"
                                    value={quantity}
                                    onChangeText={(v) => setQuantity(v.replace(/[^0-9]/g, ''))}
                                />
                            </View>

                            {/* Rate (locked) */}
                            <Text style={styles.fieldLabel}>Rate (₹{RATE_PER_UNIT} / unit)</Text>
                            <View style={[styles.inputRow, styles.inputRowDisabled]}>
                                <Text style={[styles.input, { color: '#6B7A7C' }]}>
                                    {rate > 0 ? `₹ ${rate}` : '₹ 0'}
                                </Text>

                                <Image
                                    source={require('../../assets/lock-closed.png')}
                                    style={{ height: 16, width: 16, tintColor: '#A7B4B6' }}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Summary */}
                            <View style={styles.summaryBox}>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Quantity</Text>
                                    <Text style={styles.summaryValue}>{quantity || '0'} unit(s)</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Rate</Text>
                                    <Text style={styles.summaryValue}>₹ {RATE_PER_UNIT} / unit</Text>
                                </View>
                                <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                                    <Text style={styles.summaryTotalLabel}>Total</Text>
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
                            <Text style={styles.modalPrimaryBtnText}>Save</Text>

                            <Image
                                source={require('../../assets/checkmark.png')}
                                style={{ height: 18, width: 18, tintColor: '#FFFFFF', marginLeft: 6 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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
    productNameBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EAF5F6', borderRadius: 12, paddingHorizontal: 14, height: 50 },
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
});

export default NewDashboardScreen;