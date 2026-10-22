import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar,
    Platform,
} from 'react-native';


/* ------- Sample data (replace with API) ------- */
const ACTIVITY_DATA = [
    {
        id: '1',
        date: '12 Oct 2025',
        time: '10:30 AM',
        productName: 'Premium Steel Rod',
        quantity: 2,
        rate: 200,
        image:
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80&auto=format&fit=crop',
        location: 'Sector 18, Noida, UP',
    },
    {
        id: '2',
        date: '11 Oct 2025',
        time: '02:15 PM',
        productName: 'Copper Wire Coil',
        quantity: 5,
        rate: 500,
        image:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80&auto=format&fit=crop',
        location: 'Sector 62, Noida, UP',
    },
    {
        id: '3',
        date: '10 Oct 2025',
        time: '09:00 AM',
        productName: 'Iron Angle Bar',
        quantity: 10,
        rate: 1000,
        image:
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&q=80&auto=format&fit=crop',
        location: 'Indirapuram, Ghaziabad',
    },
    {
        id: '4',
        date: '09 Oct 2025',
        time: '04:45 PM',
        productName: 'Aluminum Sheet',
        quantity: 3,
        rate: 300,
        image:
            'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&q=80&auto=format&fit=crop',
        location: 'Vaishali, Ghaziabad',
    },
    {
        id: '5',
        date: '08 Oct 2025',
        time: '11:20 AM',
        productName: 'Steel Pipe Set',
        quantity: 4,
        rate: 400,
        image:
            'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=300&q=80&auto=format&fit=crop',
        location: 'Sector 18, Noida, UP',
    },
];

const ActivityReportScreen = ({ navigation }) => {
    const totalAmount = ACTIVITY_DATA.reduce((sum, item) => sum + item.rate, 0);

    /* ---------- Card renderer ---------- */
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* Date row */}
            <View style={styles.cardDateRow}>
                <View style={styles.cardDateLeft}>

                    <Image
                        source={require('../../assets/calendar.png')}
                        style={{ height: 13, width: 13, tintColor: '#F5A623' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.cardDate}>{item.date}</Text>
                    <Text style={styles.cardTime}>· {item.time}</Text>
                </View>

            </View>

            {/* Main row: image + details */}
            <View style={styles.cardMainRow}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />

                <View style={styles.cardDetails}>
                    <Text style={styles.productName} numberOfLines={2}>
                        {item.productName}
                    </Text>

                    <View style={styles.metaRow}>
                        <View style={styles.metaChip}>
                            <Text style={styles.metaChipLabel}>Qty</Text>
                            <Text style={styles.metaChipValue}>{item.quantity}</Text>
                        </View>
                        <View style={[styles.metaChip, styles.metaChipRate]}>
                            <Text style={[styles.metaChipLabel, { color: '#F5A623' }]}>Rate</Text>
                            <Text style={[styles.metaChipValue, { color: '#F5A623' }]}>
                                ₹{item.rate}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Location row */}
            <View style={styles.locationRow}>
                <View style={styles.locationIconChip}>

                    <Image
                        source={require('../../assets/location.png')}
                        style={{ height: 12, width: 12, tintColor: '#2C7BE5' }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.locationText} numberOfLines={1}>
                    {item.location}
                </Text>
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

                    <Text style={styles.headerTitle}>Activity Report</Text>

                    <View style={{ width: 38 }} />
                </View>

                {/* Summary strip */}
                <View style={styles.summaryStrip}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>{ACTIVITY_DATA.length}</Text>
                        <Text style={styles.summaryLabel}>Activities</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>₹{totalAmount.toLocaleString()}</Text>
                        <Text style={styles.summaryLabel}>Total Rate</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryValue}>
                            {ACTIVITY_DATA.reduce((s, i) => s + i.quantity, 0)}
                        </Text>
                        <Text style={styles.summaryLabel}>Total Qty</Text>
                    </View>
                </View>
            </View>

            {/* ============ LIST ============ */}
            <FlatList
                data={ACTIVITY_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyWrap}>
                        
                        <Image
                            source={require('../../assets/google-docs.png')}
                            style={{ height: 52, width: 52, tintColor: '#D4E9EC' }}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyTitle}>No activities yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Your completed activities will appear here
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
        paddingBottom: 24,
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

    /* Summary strip */
    summaryStrip: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryValue: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 18, fontWeight: '700',
        color: '#FFFFFF',
    },
    summaryLabel: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 10,
        color: 'rgba(255,255,255,0.75)',
        marginTop: 3, letterSpacing: 0.4, textTransform: 'uppercase',
    },
    summaryDivider: {
        width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.22)',
        alignSelf: 'center',
    },

    /* ============ LIST ============ */
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },

    /* Card */
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
    },

    /* Date row */
    cardDateRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 12,
    },
    cardDateLeft: { flexDirection: 'row', alignItems: 'center' },
    cardDate: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 12, fontWeight: '600',
        color: '#0A2E33', marginLeft: 5,
    },
    cardTime: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 12,
        color: '#8A9698', marginLeft: 4,
    },
    cardBadge: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#E4F9EC', paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 10,
    },
    cardBadgeText: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 10, fontWeight: '600',
        color: '#22A06B', marginLeft: 3,
    },

    /* Main row */
    cardMainRow: { flexDirection: 'row' },
    cardImage: {
        width: 76, height: 76, borderRadius: 12,
        backgroundColor: '#F2F9FA', marginRight: 12,
    },
    cardDetails: { flex: 1, justifyContent: 'center' },
    productName: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '700',
        color: '#0A2E33', lineHeight: 18, marginBottom: 8,
    },
    metaRow: { flexDirection: 'row' },
    metaChip: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#F2F9FA',
        paddingHorizontal: 8, paddingVertical: 4,
        borderRadius: 8, marginRight: 6,
    },
    metaChipRate: { backgroundColor: '#FFF4E5' },
    metaChipLabel: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 10,
        color: '#6B7A7C', marginRight: 4,
    },
    metaChipValue: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 11, fontWeight: '700',
        color: '#0A2E33',
    },

    /* Location row */
    locationRow: {
        flexDirection: 'row', alignItems: 'center',
        marginTop: 12, paddingTop: 10,
        borderTopWidth: 1, borderTopColor: '#F2F5F6',
    },
    locationIconChip: {
        width: 22, height: 22, borderRadius: 7,
        backgroundColor: '#E8F4FF',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 8,
    },
    locationText: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 12,
        color: '#6B7A7C', flex: 1,
    },

    /* Empty state */
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

export default ActivityReportScreen;