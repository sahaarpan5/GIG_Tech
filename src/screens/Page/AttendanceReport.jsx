import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../../util/API';
import { Loader } from '../../util/Loader';


const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];



const AttendanceReport = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef();
    const navigation = useNavigation();
    const reportType = 1;



    useEffect(() => {
        const index = months.indexOf(selectedMonth);
        if (index !== -1 && scrollRef.current) {
            scrollRef.current.scrollTo({
                x: index * 80 - width / 2 + 40,
                animated: true,
            });
        }
    }, [selectedMonth]);

    // useEffect(() => {
    //     fetchAttendance(selectedMonth);
    // }, [selectedMonth]);



    const getFinancialYear = (monthName) => {
        const monthIndex = months.indexOf(monthName); // months is your months array
        const currentYear = new Date().getFullYear();

        if (monthIndex >= 0 && monthIndex <= 2) {
            // Jan, Feb, Mar
            return `${currentYear - 1}-${currentYear}`;
        } else {
            // Apr to Dec
            return `${currentYear}-${currentYear + 1}`;
        }
    };

    // const fetchAttendance = async (monthName) => {
    //     const financialYear = getFinancialYear(monthName);
    //     setLoading(true);
    //     try {
    //         const storedLoginID = await AsyncStorage.getItem('UserID');
    //         const securityCode = await AsyncStorage.getItem('SecurityCode');


    //         const response = await axios.get(API.FETCH_ATTENDANCE(
    //             storedLoginID,
    //             financialYear,
    //             monthName,
    //             reportType,
    //             securityCode
    //         ));

    //         const data = response.data?.responseData || [];

    //         const formatted = data.map((item) => ({
    //             date: item.Date?.split(' ')[0]?.slice(0, 2) ?? '',
    //             day: item.Day?.slice(0, 3) ?? '',
    //             punchIn: item.Time ?? '',
    //             punchOut: item.LogoutTime ?? '',
    //             status: item.Status ?? '',
    //         }));

    //         setAttendanceData(formatted);
    //     } catch (error) {
    //         console.error('Error fetching attendance:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const renderMonthTabs = () => (
        <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.monthTabs}
        >
            {months.map((month, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.monthButton}
                    onPress={() => setSelectedMonth(month)}
                >
                    <Text style={[styles.monthText, month === selectedMonth && styles.selectedMonthText]}>
                        {month}
                    </Text>
                    {month === selectedMonth && <View style={styles.underline} />}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderAttendanceCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.day}>{item.day}</Text>
            </View>
            <View style={styles.detailsContainer}>

                <View style={styles.row}>
                    <Text style={styles.label}>Punch In</Text>
                    <Text style={styles.value}>{item.punchIn}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Punch Out</Text>
                    <Text style={styles.value}>{item.punchOut}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={[styles.value, { color: '#D63333' }]}>{item.status}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E63665' }}>
                <View style={{ flex: 1, backgroundColor: '#E63665', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                    <StatusBar backgroundColor="#E63665" barStyle="dark-content" />
                    {loading && <Loader />}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../asset/back-icon.png')} style={styles.headerIcon}></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Attendance Report</Text>
                        <TouchableOpacity onPress={()=>navigation.replace('DashboardScreen')}>
                            <Image source={require('../../asset/home-icon.png')} style={styles.headerIcon}></Image>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.container}>
                        {renderMonthTabs()}
                        <FlatList
                            data={attendanceData}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.listContainer}
                            renderItem={renderAttendanceCard}
                            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: '#131212ff' }}>No attendance data available.</Text>}
                        />
                    </View>
                </View>
            </SafeAreaView>

        </SafeAreaProvider>


    );
};

export default AttendanceReport;

// =====================
// 💅 STYLES
// =====================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#E63665',
        height: 60,
    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF'
    },
    monthTabs: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 0,
        paddingBottom: 0,

    },
    monthButton: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    monthText: {
        fontSize: 18,
        color: '#888',
    },
    selectedMonthText: {
        color: '#D63333',
        fontWeight: '600',
    },
    underline: {
        height: 2,
        backgroundColor: '#D63333',
        width: 20,
        marginTop: 2,
        borderRadius: 1,
    },
    listContainer: {
        paddingTop: 0,
        paddingBottom: 5,
        marginTop: 0,

    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 16,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        flexDirection: 'row',
        elevation: 2,
    },
    dateContainer: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        elevation: 2,
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    day: {
        fontSize: 12,
        color: '#D63333',
    },
    detailsContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
    },
    row: {

        justifyContent: 'space-between',
        marginVertical: 2,
    },
    label: {
        color: '#888',
        fontSize: 13,
    },
    value: {
        fontSize: 13,
        fontWeight: '500',
        color: '#000',
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});