import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// npm install react-native-vector-icons
import DashboardSL from '../Page/DashboardSL';


const DashboardScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [slActive, setSLActive] = useState(0);
    const [slName, setSLName] = useState('');
    const [slLocation, setSLLocation] = useState('');

    const [slPosition, setSLPosition] = useState('');
    const [slWorkType, setSLWorkType] = useState('');
    const [slWorkStrtDate, setSLWorkStrtDate] = useState('');
    const [slWorkEndDate, setSLWorkEndDate] = useState('');
    const [slOffice, setSLOffice] = useState('');


    useEffect(() => {
        const loadData = async () => {
            try {
                const storedUserName = await AsyncStorage.getItem('UserName');
                setUsername(storedUserName);

                const storedSLActive = await AsyncStorage.getItem('SLIsActive');
                setSLActive(storedSLActive ? parseInt(storedSLActive, 10) : 0);


                const storedSLName = await AsyncStorage.getItem('ClientName');
                setSLName(storedSLName);

                const storedSLLocation = await AsyncStorage.getItem('ClientOfficeAddress');
                setSLLocation(storedSLLocation);

                const storedSLPosition = await AsyncStorage.getItem('SLPositionName');
                setSLPosition(storedSLPosition);


                 const storedSLWorkType = await AsyncStorage.getItem('SLWorkType');
                setSLWorkType(storedSLWorkType);

                 const storedStartDate= await AsyncStorage.getItem('SLStartDate');
                setSLWorkStrtDate(storedStartDate);

                const storedEndDate= await AsyncStorage.getItem('SLEndDate');
                setSLWorkEndDate(storedEndDate);

                const storedOffice= await AsyncStorage.getItem('ClientOfficeName');
                setSLOffice(storedOffice);






            } catch (error) {
                console.error('Error loading stored data:', error);
            }
        };

        loadData();
    }, []);

    console.log('slActive', slActive);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E63665' }}>
                <StatusBar backgroundColor="#E63665" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Hi! {username}</Text>
                        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                            <Image source={require('../../asset/turn-off.png')} ></Image>
                        </TouchableOpacity>

                    </View>

                    {slActive === 0 ? (
                        // <View style={styles.noSLBox}>
                        //     <Text style={styles.noSLText}>
                        //         You are not assigned to any SL
                        //     </Text>
                        // </View>
                        <View style={{flex:1}}>
                            <DashboardSL ></DashboardSL>
                        </View>
                    ) : (
                        <>


                            {/* Title */}
                            <Text style={styles.sectionTitle}>Your Assigned Service Line</Text>


                            <View style={styles.card}>
                                <View style={styles.cardRow}>
                                    <Image source={require('../../asset/slname-icon.png')} ></Image>
                                    <Text style={styles.label}>SL Name</Text>
                                    <Text style={styles.value}>{slName}</Text>
                                </View>

                                 <View style={styles.cardRow}>
                                    <Image source={require('../../asset/office-location.png')} ></Image>
                                    <Text style={styles.label}>SL Office</Text>
                                    <Text style={styles.value}>{slOffice}</Text>
                                </View>

                                <View style={styles.cardRow}>
                                    <Image source={require('../../asset/location-icon.png')} ></Image>
                                    <Text style={styles.label}>SL Location</Text>
                                    <Text style={styles.value}>{slLocation}</Text>
                                </View>

                                <View style={styles.cardRow}>
                                    <Image source={require('../../asset/manager.png')} ></Image>
                                    <Text style={styles.label}>Position</Text>
                                    <Text style={styles.value}>{slPosition}</Text>
                                </View>

                                 <View style={styles.cardRow}>
                                    <Image source={require('../../asset/suitcase.png')} ></Image>
                                    <Text style={styles.label}>Work Type</Text>
                                    <Text style={styles.value}>{slWorkType}</Text>
                                </View>

                                <View style={styles.cardRow}>
                                    <Image source={require('../../asset/date-icon.png')} ></Image>
                                    <Text style={styles.label}>Start Date</Text>
                                    <Text style={styles.value}>{slWorkStrtDate}</Text>
                                </View>

                                <View style={styles.cardRow}>
                                    <Image source={require('../../asset/date-icon.png')} ></Image>
                                    <Text style={styles.label}>End Date</Text>
                                    <Text style={styles.value}>{slWorkEndDate}</Text>
                                </View>
                            </View>

                            {/* Button */}
                            <TouchableOpacity style={styles.attendanceButton} onPress={() => navigation.navigate('AttendanceDashboard')}>
                                <Image source={require('../../asset/attendance-icon.png')} ></Image>
                                <Text style={styles.attendanceText}>Check-In / Check-Out</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {

        alignItems: "center",
        backgroundColor: "#f50057",
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: "space-between",
        flexDirection: 'row',
        height:70
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 16,
        textAlign: "center",
        color: "#333",
    },
    card: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 8,
        padding: 16,
        elevation: 4, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
    },
    label: {
        flex: 1,
        marginLeft: 8,
        color: "#666",
        fontSize: 16,
    },
    value: {
        flex: 1,
        textAlign: "right",
        color: "#000",
        fontSize: 14,
        fontWeight: "600",
    },
    attendanceButton: {
        borderWidth: 1,
        borderColor: "#f50057",
        borderRadius: 25,
        marginHorizontal: 40,
        marginTop: 20,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent:'center',
        flexDirection:'row'
    },
    attendanceText: {
        color: "#f50057",
        fontSize: 16,
        fontWeight: "600",
        marginLeft:5
    },
    headerIcon: {
        width: 20,
        height: 20,

    },
    noSLBox: {
        margin: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#ffe6e9",
        alignItems: "center",
    },
    noSLText: {
        color: "#d32f2f",
        fontSize: 16,
        fontWeight: "600",
    },
});
