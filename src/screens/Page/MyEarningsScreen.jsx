import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Platform,
    Image
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
    },
];

const TOTAL_EARNED = 18450;
const CHANGE_PERCENT = 12;

const MyEarningsScreen = ({ navigation }) => {
    /* ---------- Card renderer ---------- */
    const renderItem = ({ item }) => (
        <View style={styles.card}>
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
                        {item.status === 'paid' ? 'Paid' : 'Pending'}
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
                    <Text style={styles.activitiesText}>{item.activities} activities</Text>
                </View>

                <Text style={styles.cardAmount}>₹ {item.amount.toLocaleString()}</Text>
            </View>
        </View>
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

                    <Text style={styles.headerTitle}>My Earnings</Text>

                    <View style={{ width: 38 }} />
                </View>

                {/* Summary card */}
                <View style={styles.summaryCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.summaryLabel}>Total Earned</Text>
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
                    <Text style={styles.sectionLabel}>Payment History</Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>

                        <Image
                            source={require('../../assets/wallet.png')}
                            style={{ height: 52, width: 52, tintColor: '#D4E9EC' }}
                            resizeMode="contain"
                        />

                        <Text style={styles.emptyTitle}>No earnings yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Complete activities to start earning
                        </Text>
                    </View>
                }
            />
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
});

export default MyEarningsScreen;