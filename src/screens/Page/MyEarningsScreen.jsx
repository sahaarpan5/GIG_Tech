import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Platform,
    Image,
    ScrollView,
    Modal
} from 'react-native';


/* ------- Single list: Week 1, Week 2, 15 Days, Monthly ------- */
const EARNINGS_PERIODS = [
    {
        id: 'w1',
        label: 'Week 1',
        range: '07 – 13 Oct 2025',
        activities: 12,
        amount: 3200,
        status: 'paid',
        icon: require('../../assets/calendar.png'),
        iconBg: '#E4F9EC',
        iconColor: '#22A06B',
        activitiesList: [
            { date: '12 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 3, rate: 287.43 },
            { date: '11 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 5, rate: 479.05 },
            { date: '10 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 4, rate: 383.24 },
        ],
    },
    {
        id: 'w2',
        label: 'Week 2',
        range: '14 – 20 Oct 2025',
        activities: 18,
        amount: 4800,
        status: 'paid',
        icon: require('../../assets/calendar.png'),
        iconBg: '#E4F9EC',
        iconColor: '#22A06B',
        activitiesList: [
            { date: '12 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 3, rate: 287.43 },
            { date: '11 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 5, rate: 479.05 },
            { date: '10 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 4, rate: 383.24 },
        ],
    },
    {
        id: 'w3',
        label: 'Week 3',
        range: '21 – 27 Oct 2025',
        activities: 15,
        amount: 3600,
        status: 'paid',
        icon: require('../../assets/calendar.png'),
        iconBg: '#FFF4E5',
        iconColor: '#F5A623',
        activitiesList: [
            { date: '12 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 3, rate: 287.43 },
            { date: '11 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 5, rate: 479.05 },
            { date: '10 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 4, rate: 383.24 },
        ],
    },
    {
        id: 'd15',
        label: '15 Days',
        range: '01 – 15 Oct 2025',
        activities: 30,
        amount: 8000,
        status: 'paid',
        icon: require('../../assets/calendar.png'),
        iconBg: '#E8F4FF',
        iconColor: '#2C7BE5',
        activitiesList: [
            { date: '12 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 3, rate: 287.43 },
            { date: '11 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 5, rate: 479.05 },
            { date: '10 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 4, rate: 383.24 },
        ],
    },
    {
        id: 'm1',
        label: 'Monthly',
        range: 'October 2025',
        activities: 48,
        amount: 12250,
        status: 'paid',
        icon: require('../../assets/calendar.png'),
        iconBg: '#F0EDFF',
        iconColor: '#7B5CFF',
        activitiesList: [
            { date: '12 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 3, rate: 287.43 },
            { date: '11 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 5, rate: 479.05 },
            { date: '10 Oct 2025', product: 'GIG deployment commissions on oshea Product Sale', qty: 4, rate: 383.24 },
        ],
    },
];



const EARNINGS_TRANSLATIONS = {
    English: {
        title: 'My Earnings',
        totalEarned: 'Total Earned',
        paymentHistory: 'Payment History',
        paid: 'Paid',
        pending: 'Pending',
        activities: 'activities',
        noEarnings: 'No earnings yet',
        emptyMessage: 'Complete activities to start earning',
        week1: 'Week 1',
        week2: 'Week 2',
        week3: 'Week 3',
        fifteenDays: '15 Days',
        monthly: 'Monthly',
        detailTitle: 'Activity Details',
        activityDate: 'Activity Date',
        productNameLabel: 'Product Name',
        qtyLabel: 'Quantity',
        rateLabel: 'Rate',
        close: 'Close',
    },
    Hindi: {
        title: 'मेरी कमाई',
        totalEarned: 'कुल कमाई',
        paymentHistory: 'भुगतान इतिहास',
        paid: 'भुगतान किया गया',
        pending: 'लंबित',
        activities: 'गतिविधियाँ',
        noEarnings: 'अभी तक कोई कमाई नहीं',
        emptyMessage: 'कमाई शुरू करने के लिए गतिविधियाँ पूरी करें',
        week1: 'सप्ताह 1',
        week2: 'सप्ताह 2',
        week3: 'सप्ताह 3',
        fifteenDays: '15 दिन',
        monthly: 'मासिक',
        detailTitle: 'गतिविधि विवरण',
        activityDate: 'गतिविधि तिथि',
        productNameLabel: 'उत्पाद का नाम',
        qtyLabel: 'मात्रा',
        rateLabel: 'दर',
        close: 'बंद करें',
    },
    Bengali: {
        title: 'আমার উপার্জন',
        totalEarned: 'মোট উপার্জন',
        paymentHistory: 'পেমেন্টের ইতিহাস',
        paid: 'পরিশোধিত',
        pending: 'বাকি',
        activities: 'টি কার্যক্রম',
        noEarnings: 'এখনও কোনো উপার্জন নেই',
        emptyMessage: 'উপার্জন শুরু করতে কার্যক্রম সম্পূর্ণ করুন',
        week1: 'প্রথম সপ্তাহ',
        week2: 'দ্বিতীয় সপ্তাহ',
        week3: 'তৃতীয় সপ্তাহ',
        fifteenDays: '১৫ দিন',
        monthly: 'মাসিক',
        detailTitle: 'কার্যক্রমের বিবরণ',
        activityDate: 'কার্যক্রমের তারিখ',
        productNameLabel: 'পণ্যের নাম',
        qtyLabel: 'পরিমাণ',
        rateLabel: 'দর',
        close: 'বন্ধ করুন',
    },
};


const TOTAL_EARNED = 18450;
const CHANGE_PERCENT = 12;

const MyEarningsScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const t = (key) =>
        EARNINGS_TRANSLATIONS[selectedLanguage]?.[key] ??
        EARNINGS_TRANSLATIONS.English[key] ??
        key;

    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(null);

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('selectedLanguage');

                if (EARNINGS_TRANSLATIONS[savedLanguage]) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log('Error loading language:', error);
            }
        };

        loadLanguage();
    }, []);


    const truncateWords = (str, count) => {
        if (!str) return '';
        const words = str.trim().split(/\s+/);
        if (words.length <= count) return str;
        return words.slice(0, count).join(' ') + '...';
    };



    /* ---------- Card renderer ---------- */
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card}
            activeOpacity={0.85}
            onPress={() => {
                setSelectedPeriod(item);
                setDetailModalVisible(true);
            }}>
            <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                    <View style={[styles.cardIconChip, { backgroundColor: item.iconBg }]}>

                        <Image
                            source={item.icon}
                            style={{
                                width: 16,
                                height: 16,
                                resizeMode: 'contain',
                                tintColor: item.iconColor,
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardLabel}>{item.label}</Text>
                        <Text style={styles.cardRange}>{item.range}</Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        item.status === 'paid' ? styles.statusPaid : styles.statusPending,
                    ]}
                >
                    <Image
                        source={
                            item.status === 'paid'
                                ? require('../../assets/checked.png')
                                : require('../../assets/time.png')
                        }
                        style={{
                            width: 11,
                            height: 11,
                            resizeMode: 'contain',
                            tintColor: item.status === 'paid' ? '#22A06B' : '#F5A623',
                        }}
                    />
                    <Text
                        style={[
                            styles.statusText,
                            item.status === 'paid' ? styles.statusTextPaid : styles.statusTextPending,
                        ]}
                    >
                        {t(item.status === 'paid' ? 'paid' : 'pending')}
                    </Text>
                </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.cardFooterRow}>
                <View style={styles.activitiesWrap}>

                    <Image
                        source={require('../../assets/layers.png')}
                        style={{ height: 13, width: 13, tintColor: '#6B7A7C' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.activitiesText}>{item.activities} {t('activities')}</Text>
                </View>

                <Text style={styles.cardAmount}>₹ {item.amount.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* ============ HEADER ============ */}
            <View style={styles.header}>
                <View style={styles.headerCircle1} />
                <View style={styles.headerCircle2} />

                <View style={styles.headerTopRow}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation && navigation.goBack()}
                        activeOpacity={0.8}
                    >

                        <Image
                            source={require('../../assets/arrow-back.png')}
                            style={{ height: 20, width: 20, tintColor: '#FFFFFF' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>{t('title')}</Text>

                    <View style={{ width: 38 }} />
                </View>

                {/* Summary card */}
                <View style={styles.summaryCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.summaryLabel}>{t('totalEarned')}</Text>
                        <Text style={styles.summaryValue}>₹ {TOTAL_EARNED.toLocaleString()}</Text>


                    </View>

                    <View style={styles.summaryIconWrap}>

                        <Image
                            source={require('../../assets/wallet.png')}
                            style={{ height: 32, width: 32, tintColor: '#FEA92F' }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            {/* ============ LIST ============ */}
            <FlatList
                data={EARNINGS_PERIODS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={styles.sectionLabel}>{t('paymentHistory')}</Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>

                        <Image
                            source={require('../../assets/wallet.png')}
                            style={{ height: 52, width: 52, tintColor: '#D4E9EC' }}
                            resizeMode="contain"
                        />

                        <Text style={styles.emptyTitle}>{t('noEarnings')}</Text>
                        <Text style={styles.emptySubtitle}>
                            {t('emptyMessage')}
                        </Text>
                    </View>
                }
            />

            {/* =====================================================
    ACTIVITY DETAIL MODAL
    ===================================================== */}
            <Modal
                visible={detailModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setDetailModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('detailTitle')}</Text>
                            <TouchableOpacity
                                onPress={() => setDetailModalVisible(false)}
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

                        {/* Period header */}
                        {selectedPeriod && (
                            <View style={styles.periodBadge}>
                                <View style={styles.periodBadgeLeft}>
                                    <Image
                                        source={selectedPeriod.icon}
                                        style={{
                                            width: 14,
                                            height: 14,
                                            tintColor: selectedPeriod.iconColor,
                                            marginRight: 6,
                                        }}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.periodBadgeLabel}>
                                        {selectedPeriod.label}
                                    </Text>
                                </View>
                                <Text style={styles.periodBadgeRange}>
                                    {selectedPeriod.range}
                                </Text>
                            </View>
                        )}

                        {/* Activities list */}
                        <ScrollView
                            style={styles.modalScroll}
                            showsVerticalScrollIndicator={false}
                        >
                            {selectedPeriod?.activitiesList?.map((activity, index) => (
                                <View key={index} style={styles.detailCard}>
                                    {/* Date row */}
                                    <View style={styles.detailDateRow}>
                                        <View style={styles.detailDateChip}>
                                            <Image
                                                source={require('../../assets/calendar.png')}
                                                style={{ width: 12, height: 12, tintColor: '#F5A623' }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <Text style={styles.detailDateLabel}>{t('activityDate')}</Text>
                                        <Text style={styles.detailDateValue}>{activity.date}</Text>
                                    </View>

                                    <View style={styles.detailDivider} />

                                    {/* Product */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>{t('productNameLabel')}</Text>
                                        <Text style={styles.detailValue} numberOfLines={1}>
                                            {truncateWords(activity.product, 2)}
                                        </Text>
                                    </View>

                                    {/* Qty */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>{t('qtyLabel')}</Text>
                                        <Text style={styles.detailValue}>{activity.qty} unit(s)</Text>
                                    </View>

                                    {/* Rate */}
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>{t('rateLabel')}</Text>
                                        <Text style={[styles.detailValue, styles.detailRate]}>
                                            ₹ {activity.rate.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.modalCloseFullBtn}
                            onPress={() => setDetailModalVisible(false)}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.modalCloseFullBtnText}>{t('close')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F9FA' },

    /* ============ HEADER ============ */
    header: {
        backgroundColor: '#047282',
        paddingTop: Platform.OS === 'ios' ? 58 : 42,
        paddingHorizontal: 20,
        paddingBottom: 56,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: 'hidden',
    },
    headerCircle1: {
        position: 'absolute', top: -60, right: -60,
        width: 180, height: 180, borderRadius: 90,
        backgroundColor: 'rgba(254,169,47,0.18)',
    },
    headerCircle2: {
        position: 'absolute', bottom: -80, left: -50,
        width: 160, height: 160, borderRadius: 80,
        backgroundColor: 'rgba(123,92,255,0.16)',
    },
    headerTopRow: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 20,
    },
    backBtn: {
        width: 38, height: 38, borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.16)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.24)',
    },
    headerTitle: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 17, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: -0.2,
    },

    /* Summary */
    summaryCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 18, paddingVertical: 18, paddingHorizontal: 18,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    summaryLabel: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 12,
        color: 'rgba(255,255,255,0.78)',
        letterSpacing: 0.3, textTransform: 'uppercase',
    },
    summaryValue: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 30, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: -0.6, marginTop: 4,
    },
    changeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    changeText: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 11, fontWeight: '600',
        marginLeft: 4,
    },
    summaryIconWrap: {
        width: 56, height: 56, borderRadius: 18,
        backgroundColor: 'rgba(254,169,47,0.18)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(254,169,47,0.3)',
    },

    /* ============ LIST ============ */
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 30,
    },
    sectionLabel: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '700',
        color: '#0A2E33', letterSpacing: -0.2, marginBottom: 12,
    },

    /* Card */
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
    },
    cardHeaderRow: {
        flexDirection: 'row', alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    cardHeaderLeft: { flexDirection: 'row', flex: 1, marginRight: 10 },
    cardIconChip: {
        width: 34, height: 34, borderRadius: 11,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12,
    },
    cardLabel: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '700',
        color: '#0A2E33',
    },
    cardRange: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 12,
        color: '#8A9698', marginTop: 2,
    },
    statusBadge: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
    },
    statusPaid: { backgroundColor: '#E4F9EC' },
    statusPending: { backgroundColor: '#FFF4E5' },
    statusText: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 10, fontWeight: '600',
        marginLeft: 3,
    },
    statusTextPaid: { color: '#22A06B' },
    statusTextPending: { color: '#F5A623' },

    cardDivider: {
        height: 1, backgroundColor: '#F2F5F6',
        marginVertical: 12,
    },
    cardFooterRow: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
    },
    activitiesWrap: { flexDirection: 'row', alignItems: 'center' },
    activitiesText: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 12,
        color: '#6B7A7C', marginLeft: 5,
    },
    cardAmount: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700',
        color: '#047282',
    },

    /* Empty */
    emptyWrap: {
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700',
        color: '#0A2E33', marginTop: 14,
    },
    emptySubtitle: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 13,
        color: '#8A9698', marginTop: 6, textAlign: 'center',
    },

    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(10,46,51,0.55)',
        justifyContent: 'flex-end',
    },
    modalSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 22,
        maxHeight: '88%',
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
    periodBadge: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EAF5F6',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#D4E9EC',
    },
    periodBadgeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    periodBadgeLabel: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '700',
        color: '#047282',
    },
    periodBadgeRange: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#6B7A7C',
    },
    modalScroll: {
        maxHeight: 380,
    },
    detailCard: {
        backgroundColor: '#F7FAFB',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E4ECEE',
    },
    detailDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailDateChip: {
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: '#FFF4E5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    detailDateLabel: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#6B7A7C',
        flex: 1,
    },
    detailDateValue: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 12,
        fontWeight: '700',
        color: '#0A2E33',
    },
    detailDivider: {
        height: 1,
        backgroundColor: '#E4ECEE',
        marginBottom: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    detailLabel: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#6B7A7C',
        flex: 1,
    },
    detailValue: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#0A2E33',
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 12,
    },
    detailRate: {
        color: '#047282',
        fontSize: 14,
    },
    modalCloseFullBtn: {
        height: 52,
        borderRadius: 14,
        backgroundColor: '#047282',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    modalCloseFullBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },
});

export default MyEarningsScreen;