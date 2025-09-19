import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const AppliedJobDetails = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#E63665" barStyle="dark-content" />
            <View style={styles.toolBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../asset/back-icon.png')} style={styles.headerIcon}></Image>
                </TouchableOpacity>
                <Text style={styles.tooltext}>Job Details</Text>
                <TouchableOpacity onPress={() => navigation.replace('DashboardScreen')}>
                    <Image source={require('../../asset/home-icon.png')} style={styles.headerIcon}></Image>
                </TouchableOpacity>

            </View>
            <ScrollView style={{ paddingBottom: 30,backgroundColor:'#FFF' }}>
                {/* Job Header */}
                <View style={styles.header}>
                    <View style={styles.iconBox}>
                        <Image source={require('../../asset/temporary.png')} style={styles.jobicon}></Image>
                    </View>
                    <Text style={styles.jobTitle}>Software Engineer</Text>
                </View>

                {/* Info Row */}
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>📍 Location: Andhra Pradesh</Text>
                    <Text style={styles.infoText}>💰 Salary: 20K</Text>
                    <Text style={styles.infoText}>⏳ Experience: 2 yr.</Text>
                </View>

                {/* Dates */}
                <View style={styles.dateRow}>
                    <Text style={styles.dateText}>Start Date: 08/15/2025 12:00 AM</Text>
                    <Text style={styles.dateText}>End Date: 08/19/2025 12:00 AM</Text>
                </View>

                {/* Job Details */}
                <View style={styles.section}>
                    <Text style={styles.label}>Qualification:</Text>
                    <Text style={styles.value}>M.Tech / B.Tech</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Job Type:</Text>
                    <Text style={styles.value}>Full Time</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.value}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text...
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Responsibilities:</Text>
                    <Text style={styles.value}>
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                        It has roots in a piece of classical Latin literature from 45 BC,
                        making it over 2000 years old...
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Benefits:</Text>
                    <Text style={styles.value}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text...
                    </Text>
                </View>

                {/* Apply Button */}
              
            </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
      
    );
};

export default AppliedJobDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        backgroundColor: '#E63665'
    },
    header: {
        alignItems: "center",
        marginVertical: 20,
    },
    iconBox: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        padding: 10,
        elevation: 4, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginRight: 20,
        width: 80,
        height: 80
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginTop: 10
    },
    infoRow: {
        backgroundColor: "#3467BB",
        padding: 10,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    infoText: {
        color: "#fff",
        fontSize: 12,
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        backgroundColor: '#fff4f4ff',
        padding: 16
    },
    dateText: {
        fontSize: 12,
        color: "#444",
    },
    section: {
        marginHorizontal: 15,
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
        color: "#3467BB",
    },
    value: {
        fontSize: 13,
        color: "#555",
    },
    applyBtn: {
        backgroundColor: "#3467BB",
        paddingVertical: 14,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20,
    },
    applyBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    jobicon: {
        height: 40,
        width: 40
    },
    toolBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#E63665',
        height: 60,
    },
    tooltext: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF'
    },
});
