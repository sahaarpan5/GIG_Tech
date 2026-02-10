import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
} from 'react-native';

const NewDashboardScreen = () => {
    return (
        <SafeAreaView style={styles.safe}>
            <ImageBackground
                source={require('../../assets/Welcome-bg.png')} // your top background image
                style={styles.topImage}
                resizeMode="cover"
            >
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Dashboard</Text>
                        <TouchableOpacity style={styles.checkInBtn}>
                            <Text style={styles.checkInText}>Check in</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* Profile Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Delivery Boy</Text>

                            <View style={styles.rowBetween}>
                                <Text style={styles.name}>Zomato Company</Text>
                                <Text style={styles.date}>01-2026</Text>
                            </View>

                            <Text style={styles.location}>Newtown</Text>
                            <Text style={styles.desc}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                        </View>

                        {/* Payment Summary */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Payment Summary</Text>
                            <Text style={styles.subTitle}>From 15 Nov 2025 to 25 Jan 2026</Text>

                            <View style={styles.paymentBox}>
                                <Text style={styles.paymentLabel}>Total Payment</Text>
                                <Text style={styles.paymentAmount}>₹ 5000</Text>
                            </View>

                            {/* Progress */}
                            <View style={styles.progressWrapper}>
                                <View style={styles.progressArc}>
                                    <Text style={styles.progressText}>50%</Text>
                                </View>
                            </View>
                        </View>

                        {/* Work Status */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Work Status</Text>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHead}>Company</Text>
                                <Text style={styles.tableHead}>Job</Text>
                                <Text style={styles.tableHead}>Status</Text>
                                <Text style={styles.tableHead}>Date</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>North Point Logistics</Text>
                                <Text style={styles.tableCell}>Warehouse Helper</Text>
                                <Text style={[styles.status, styles.pending]}>Pending</Text>
                                <Text style={styles.tableCell}>2025-05-21</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>AquaFix Plumbing</Text>
                                <Text style={styles.tableCell}>Plumber</Text>
                                <Text style={[styles.status, styles.rejected]}>Rejected</Text>
                                <Text style={styles.tableCell}>2026-01-10</Text>
                            </View>

                            <Text style={styles.viewMore}>View More</Text>
                        </View>

                        {/* Work History */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Work History</Text>

                            <View style={styles.historyRow}>
                                <View>
                                    <Text style={styles.name}>Technician</Text>
                                    <Text style={styles.location}>Bigbazar • Kolkata</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.completed}>Completed</Text>
                                    <Text style={styles.time}>2 months ago</Text>
                                </View>
                            </View>

                            <Text style={styles.viewMore}>View More</Text>
                        </View>

                    </ScrollView>

                    {/* Bottom Tab */}
                    <View style={styles.bottomTab}>
                        {['Home', 'Wallet', 'Notification', 'Gigs', 'Profile'].map(item => (
                            <Text key={item} style={styles.tabText}>{item}</Text>
                        ))}
                    </View>

                </View>
            </ImageBackground>


        </SafeAreaView>
    );
};

export default NewDashboardScreen;
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#EAF7F9',
    },
    container: {
        flex: 1,
        marginTop:50,
        
    },

    header: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    checkInBtn: {
        backgroundColor: '#1AB7C3',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    checkInText: {
        color: '#fff',
        fontSize: 12,
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 14,
        padding: 16,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 12,
        color: '#777',
        marginBottom: 12,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    location: {
        fontSize: 12,
        color: '#555',
        marginVertical: 4,
    },
    desc: {
        fontSize: 12,
        color: '#777',
    },

    paymentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    paymentLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    paymentAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F5A623',
    },

    progressWrapper: {
        alignItems: 'center',
    },
    progressArc: {
        width: 120,
        height: 60,
        borderTopLeftRadius: 120,
        borderTopRightRadius: 120,
        borderWidth: 10,
        borderBottomWidth: 0,
        borderColor: '#1AB7C3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        marginTop: 18,
        fontWeight: '700',
    },

    tableHeader: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    tableHead: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
    },
    tableRow: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    tableCell: {
        flex: 1,
        fontSize: 12,
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
    },
    pending: {
        color: '#F5A623',
    },
    rejected: {
        color: '#D0021B',
    },

    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    completed: {
        color: '#2ECC71',
        fontWeight: '700',
    },
    time: {
        fontSize: 11,
        color: '#777',
    },

    viewMore: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: '#1AB7C3',
        marginTop: 6,
    },

    bottomTab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#1AB7C3',
    },
    tabText: {
        color: '#fff',
        fontSize: 12,
    },
     topImage: {
        height: '100%',
        width: '100%',

    },
});

