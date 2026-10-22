import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
    ImageBackground,
    ScrollView,
} from 'react-native';

const transactions = [
    { id: '1', title: 'Warehouse Helper', amount: 700 },
    { id: '2', title: 'Attendant', amount: 700 },
    { id: '3', title: 'Delivery Boy', amount: 700 },
    { id: '4', title: 'Plumber', amount: 600 },
];

const Jobdetails = () => {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <ImageBackground
                source={require('../../assets/Welcome-bg.png')} // your top background image
                style={styles.topImage}
                resizeMode="cover"
            >
                <View style={styles.main_container}>
                    <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                        <Image
                            source={require("../../assets/back-icon.png")} // replace with your map image
                            style={styles.icon}
                        />

                        <Text style={styles.headerTitle}>Job Details</Text>


                    </TouchableOpacity>


                    <ScrollView showsVerticalScrollIndicator={false}>




                        {/* Map */}
                        <Image
                            source={require("../../assets/maps-img.png")} // replace with your map image
                            style={styles.map}
                        />

                        {/* Job Title */}
                        <View style={styles.section}>
                            <Text style={styles.jobTitle}>Delivery Boy</Text>

                            <View style={styles.companyRow}>
                                <Image
                                    source={require("../../assets/company-icon.png")} // replace with your map image
                                    style={styles.icon}
                                />
                                <Text style={styles.company}>Zomato Company</Text>
                            </View>
                        </View>

                        {/* Date & Time */}
                        <View style={styles.dateContainer}>
                            <View style={styles.dateRow}>
                                <Image
                                    source={require("../../assets/calendar-icon.png")} // replace with your map image
                                    style={styles.icon}
                                />
                                <Text style={styles.dateText}>11 - April - 2025</Text>
                            </View>

                            <View style={styles.dateRow}>
                                <Image
                                    source={require("../../assets/time-icon.png")} // replace with your map image
                                    style={styles.icon}
                                />
                                <Text style={styles.dateText}>11 am - 8 pm</Text>
                            </View>
                        </View>

                        {/* Job Location */}
                        <View style={[styles.section]}>
                            <View style={styles.row}>
                                <Image
                                    source={require("../../assets/maps.png")} // replace with your map image
                                    style={styles.icon}
                                />
                                <Text style={styles.sectionTitle}>Job Location</Text>
                            </View>

                            <Text style={styles.location}>
                                Newtown - 1.5 km from your location
                            </Text>
                        </View>

                        {/* Task Requirements */}
                        <View style={styles.section}>
                            <View style={styles.row}>
                                <Image
                                    source={require("../../assets/task-icon.png")} // replace with your map image
                                    style={styles.icon}
                                />
                                <Text style={styles.sectionTitle}>Task Requirements</Text>
                            </View>

                            <View style={styles.taskBox}>
                                <Text style={styles.task}>
                                    • Pick up food orders from restaurants or cloud kitchens on time
                                </Text>
                                <Text style={styles.task}>
                                    • Verify order items and ensure correct packaging before delivery
                                </Text>
                                <Text style={styles.task}>
                                    • Deliver food safely and promptly to customers
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Apply Now</Text>
                        </TouchableOpacity>

                    </ScrollView>







                </View>
            </ImageBackground>



        </SafeAreaView>
    );
};

export default Jobdetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6F9',

    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: 25

    },

    backArrow: {
        fontSize: 22,
    },

    headerTitle: {
        fontFamily: 'InstrumentSans-Medium',
        fontSize: 26,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,

        color: '#000000',

    },



    main_container: {
        flex: 1,
        marginHorizontal: 20
    },

    topImage: {
        flex: 1
    },

    map: {
        width: "100%",
        height: 190,
        borderRadius: 12,
        marginBottom: 15,
        marginTop: 20
    },

    section: {
        marginVertical: 10,
    },

    jobTitle: {
        fontFamily: 'InstrumentSans-Medium',
        fontWeight: '500',
        fontSize: 22,
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000',
        marginTop: 10
    },

    companyRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },

    companyIcon: {
        marginRight: 5,
    },

    company: {
        fontFamily: 'InstrumentSans-Regular',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 21,
        letterSpacing: 0,
        color: "#655E5E",
    },

    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F4F4F8",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        marginRight: 5,
    },

    dateText: {
        fontFamily: 'InstrumentSans-Regular',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000'
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    sectionIcon: {
        marginRight: 6,
    },

    sectionTitle: {
        fontFamily: 'InstrumentSans-Medium',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000'
    },

    location: {
        fontFamily: 'InstrumentSans-Regular',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 21,
        letterSpacing: 0,
        marginLeft: 22,
        color: '#000000'
    },

    taskBox: {
        backgroundColor: "#F4F4F8",
        padding: 10,
        borderRadius: 4,
        marginTop: 5,
    },

    task: {
        fontFamily: 'InstrumentSans-Regular',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 13,
        letterSpacing: 0,
        marginBottom: 8,
        color: '#000000'
    },

    button: {
        backgroundColor: "#FEA92F",
        padding: 14,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10,
        width: 200,
        alignSelf: 'center'
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    icon: {
        marginRight: 5,
        height: 20,
        width: 20,
    }
});