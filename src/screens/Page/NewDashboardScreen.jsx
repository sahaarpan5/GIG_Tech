import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    Image,
} from 'react-native';

const NewDashboardScreen = () => {
    const navigation=useNavigation();
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
                        <TouchableOpacity style={styles.checkInBtn} onPress={()=>navigation.navigate('AttendanceMarkScreen')}>
                            <Text style={styles.checkInText}>Check in</Text>
                            <Image source={require('../../assets/checkin-icon.png')} style={{ marginLeft: 6, height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* Profile Card */}
                        <View style={styles.card}>
                            <View style={styles.sltitlerow}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.workerbg}>
                                        <Image source={require('../../assets/worker.png')} style={{ height: 26, width: 26 }} />
                                    </View>

                                    <Text style={[styles.cardTitle, { marginLeft: 10, marginTop: 5 }]}>Delivery Boy</Text>
                                </View>
                                <Image source={require('../../assets/navigator.png')} style={{ height: 26, width: 26 }} />

                            </View>



                            <View style={styles.rowBetween}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/briefcase.png')} style={{ height: 12, width: 14, tintColor: '#000000', marginRight: 5 }} />
                                    <Text style={styles.name}>Zomato Company</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/gps.png')} style={{ height: 18, width: 14, tintColor: '#000000', marginRight: 5 }} />
                                    <Text style={styles.name}>Newtown</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/calendar.png')} style={{ height: 18, width: 14, tintColor: '#000000', marginRight: 5 }} />
                                    <Text style={styles.name}>01-2026</Text>
                                </View>


                            </View>


                            <Text style={styles.desc}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </Text>
                        </View>

                        {/* Payment Summary */}
                        <View style={styles.card}>
                            <Text style={styles.paymentcardTitle}>Payment Summary</Text>
                            <Text style={styles.subTitle}>From 15 Nov 2025 to 25 Jan 2026</Text>

                            <View style={styles.paymentBox}>
                                <Text style={styles.paymentcardTitle}>Total Payment</Text>
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
                            <Text style={styles.paymentcardTitle}>Work Status</Text>

                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHead}>Company</Text>
                                <Text style={styles.tableHead}>Job</Text>
                                <Text style={styles.tableHead}>Status</Text>
                                <Text style={styles.tableHead}>Date</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>North Point Logistics</Text>
                                <Text style={styles.tableCell}>Warehouse Helper</Text>
                                <Text style={[styles.tableCell, styles.pending]}>Pending</Text>
                                <Text style={styles.tableCell}>2025-05-21</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>AquaFix Plumbing</Text>
                                <Text style={styles.tableCell}>Plumber</Text>
                                <Text style={[styles.tableCell, styles.rejected]}>Rejected</Text>
                                <Text style={styles.tableCell}>2026-01-10</Text>
                            </View>

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end', justifyContent: 'center' }}>
                                <Image source={require('../../assets/eye.png')} style={{ height: 12, width: 14, marginRight: 5, marginTop: 5 }} />
                                <Text style={styles.viewMore}>View More</Text>
                            </TouchableOpacity>


                        </View>

                        {/* Work History */}
                        <View style={styles.card}>
                            <Text style={[styles.paymentcardTitle, { marginBottom: 10 }]}>Work History</Text>

                            <View style={styles.historyRow}>
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.workerbg, { width: 50, height: 50 }]}>
                                        <Image source={require('../../assets/worker.png')} style={{ height: 30, width: 30 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <View >


                                        <Text style={[styles.paymentcardTitle]}>Technician</Text>
                                        <Text style={styles.location}>Bigbazar • Kolkata</Text>
                                    </View>

                                </View>

                                <View style={{ flex: 2 }}>
                                    <View >

                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end', justifyContent: 'center', marginBottom: 4 }}>
                                            <Image source={require('../../assets/clock.png')} style={{ height: 16, width: 16, marginRight: 5 }} />
                                            <Text style={styles.time}>2 months ago</Text>

                                        </View>

                                        <Text style={styles.completed}>Completed</Text>
                                    </View>

                                </View>


                            </View>

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'flex-end', justifyContent: 'center' }}>
                                <Image source={require('../../assets/eye.png')} style={{ height: 12, width: 14, marginRight: 5, marginTop: 5 }} />
                                <Text style={styles.viewMore}>View More</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: '30%' }}></View>

                    </ScrollView>

                    {/* Bottom Tab */}
                    {/* <View style={styles.bottomTab}>
                        {['Home', 'Wallet', 'Notification', 'Gigs', 'Profile'].map(item => (
                            <Text key={item} style={styles.tabText}>{item}</Text>
                        ))}
                    </View> */}

                </View>
            </ImageBackground>


        </SafeAreaView>
    );
};

export default NewDashboardScreen;
const styles = StyleSheet.create({
    safe: {
        flex: 1,


    },
    container: {
        flex: 1,
        marginTop: 50,

    },

    header: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'InstrumentSans-SemiBold', // ensure font is linked correctly
        fontSize: 20,
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: 'center',
        fontWeight: '600',
        color: '#000',
    },
    checkInBtn: {

        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    checkInText: {
        color: '#000000',
        fontSize: 14,
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 14,
        padding: 16,
        elevation: 5,
    },
    cardTitle: {
        fontFamily: 'InstrumentSans-SemiBold',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0,

        marginBottom: 8,
    },

    paymentcardTitle: {
        fontFamily: 'InstrumentSans-SemiBold',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000'
    },
    subTitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0,
        marginBottom: 12,
        color: '#9C8E8E'
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    name: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#605C5C'
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
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0,
        marginTop: 10,
        color: '#887878'
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
        fontFamily: 'InstrumentSans-Medium',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#FEA92F',
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
        marginTop: 10,
        backgroundColor: '#C6F5FB8C',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    tableHead: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
    },
    tableRow: {
        flexDirection: 'row',
        marginVertical: 4,
        backgroundColor: '#C6F5FB8C',
        paddingVertical: 10,
        paddingHorizontal: 10

    },
    tableCell: {
        flex: 1,
        fontSize: 12,
        fontWeight: '400',
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
        marginVertical: 10,
    },
    completed: {
        color: '#2ECC71',
        fontWeight: '700',
        alignSelf: 'flex-end'
    },
    time: {
        fontSize: 11,
        color: '#777',
        alignSelf: 'flex-end',

    },

    viewMore: {

        fontSize: 12,
        color: '#047282',
        marginTop: 6,
        fontWeight: "500"
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
        flex: 1

    },
    sltitlerow: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'



    },
    workerbg: {
        backgroundColor: '#fff',
        borderRadius: 55,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#00000040',
        padding: 5,
        elevation: 3,
        alignItems:'center'

    }
});

