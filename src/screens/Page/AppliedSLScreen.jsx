import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const serviceLines = [

    { id: "1", title: "Software Engineer", company: "Tcs, kolkata", vacancy: 1 },
    { id: "2", title: "Software Engineer", company: "Tcs, kolkata", vacancy: 1 },
    { id: "3", title: "Software Engineer", company: "Tcs, kolkata", vacancy: 2 },
    { id: "4", title: "Software Engineer", company: "Tcs, Bangalore", vacancy: 3 },
    { id: "5", title: "Software Engineer", company: "Tcs, Bangalore", vacancy: 3 },
    { id: "6", title: "Software Engineer", company: "Tcs, Bangalore", vacancy: 3 },

];

const AppliedSLScreen = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AppliedJobDetails')}>

            <View style={{ flexDirection: 'row', }}>
                <View style={styles.imagecard}>
                    <Image source={require('../../asset/temporary.png')} style={styles.jobicon}></Image>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={[styles.title]}>{item.title}</Text>
                       
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                        <Text style={styles.company}>{item.company}</Text>
                        <View style={styles.applyBtn}>
                            <Text style={styles.applyBtnText}>Applied</Text>
                        </View>
                    </View>
                </View>


            </View>




        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E63665' }}>
                <StatusBar backgroundColor="#E63665" barStyle="dark-content" />
                <View style={styles.container}>
                    {/* Header */}


                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../asset/back-icon.png')} style={styles.headerIcon}></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Applied SL</Text>
                        <TouchableOpacity onPress={() => navigation.replace('DashboardScreen')}>
                            <Image source={require('../../asset/home-icon.png')} style={styles.headerIcon}></Image>
                        </TouchableOpacity>

                    </View>
                    <View style={{ padding: 10, flex: 1 }}>
                        <FlatList
                            data={serviceLines}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        />
                    </View>




                    {/* Buttons */}

                </View>
            </SafeAreaView>
        </SafeAreaProvider>



    );
};

export default AppliedSLScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#E63665',
        height: 60,
    },
    headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    sectionTitle: { fontSize: 16, fontWeight: "600", marginVertical: 12, color: '#595757', textAlign: 'center' },
    card: {
        backgroundColor: "#fff",
        margin: 14,
        borderRadius: 4,
        padding: 10,
        elevation: 4, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    imagecard: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        elevation: 4, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginRight: 20,
        width: 45,
        height: 45
    },
    title: {
        fontFamily: "Roboto",
        fontWeight: "700",     // "normal" weight
        fontStyle: "normal",   // "Regular" → normal
        fontSize: 14,       // 100% of font size = 12
        letterSpacing: 0,
    },
    company: {
        fontFamily: "Roboto",
        fontWeight: "400",     // "normal" weight
        fontStyle: "normal",   // "Regular" → normal
        fontSize: 12,       // 100% of font size = 12
        letterSpacing: 0,
        color: '#978F8F'
    },
    vacancy: {
        fontFamily: "Roboto",
        fontWeight: "400",   // normal
        fontStyle: "normal", // instead of "Regular"
        fontSize: 12,      // from your spec
        letterSpacing: 0,
        color: '#3467BB'
    },
    vacancycount: {
        fontFamily: "Roboto",
        fontWeight: "400",   // normal
        fontStyle: "normal", // instead of "Regular"
        fontSize: 12,       // from your spec
        letterSpacing: 0,
        color: '#978F8F',
        marginLeft: 10
    },

    jobicon: {
        height: 25,
        width: 25
    },
    viewmoretext: {
        fontFamily: "Inter",
        fontWeight: "600",     // Semi Bold
        fontStyle: "normal",   // "Semi Bold" handled by weight, style stays normal
        fontSize: 16,        // 100% of font size = 15
        letterSpacing: 0,
        color: '#665F5F'
    },
    headerIcon: {
        width: 24,
        height: 24,
        tintColor: '#FFFFFF'
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    applyBtn: {
        backgroundColor: "#3467BB",
        padding: 5,
        borderRadius: 4,
        alignItems: "center",
       
    },
    applyBtnText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "400",
    },
});
