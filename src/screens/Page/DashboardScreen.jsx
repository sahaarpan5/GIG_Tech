import { useNavigation } from "@react-navigation/native";
import React from "react";
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

const DashboardScreen = () => {
    const navigation=useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E63665' }}>
                <StatusBar backgroundColor="#E63665" barStyle="dark-content" />
                <ScrollView style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Hi! Arpan Saha</Text>




                    </View>

                    {/* Title */}
                    <Text style={styles.sectionTitle}>Your Assigned Service Line</Text>


                    <View style={styles.card}>
                        <View style={styles.cardRow}>
                            <Image source={require('../../asset/slname-icon.png')} ></Image>
                            <Text style={styles.label}>SL Name</Text>
                            <Text style={styles.value}>Software Engineer</Text>
                        </View>

                        <View style={styles.cardRow}>
                            <Image source={require('../../asset/location-icon.png')} ></Image>
                            <Text style={styles.label}>SL Location</Text>
                            <Text style={styles.value}>Kolkata</Text>
                        </View>

                        <View style={styles.cardRow}>
                            <Image source={require('../../asset/date-icon.png')} ></Image>
                            <Text style={styles.label}>Start Date</Text>
                            <Text style={styles.value}>01 Aug 2025</Text>
                        </View>

                        <View style={styles.cardRow}>
                            <Image source={require('../../asset/date-icon.png')} ></Image>
                            <Text style={styles.label}>End Date</Text>
                            <Text style={styles.value}>11 Aug 2025</Text>
                        </View>
                    </View>

                    {/* Button */}
                    <TouchableOpacity style={styles.attendanceButton} onPress={()=>navigation.navigate('AttendanceDashboard')}>
                        <Text style={styles.attendanceText}>Mark Attendance</Text>
                    </TouchableOpacity>
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
        justifyContent: "center",
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
    },
    attendanceText: {
        color: "#f50057",
        fontSize: 16,
        fontWeight: "600",
    },
    headerIcon: {
        width: 20,
        height: 20,

    },
});
