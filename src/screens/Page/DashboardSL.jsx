import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

const serviceLines = [
    { id: "1", title: "Software Engineer", company: "Tcs, kolkata", vacancy: 5 },
    { id: "2", title: "Sound Engineer", company: "Tcs, kolkata", vacancy: 5 },
    { id: "3", title: "Sound Engineer", company: "Tcs, kolkata", vacancy: 5 },
    { id: "4", title: "Sound Engineer", company: "Tcs, kolkata", vacancy: 5 },
];

const DashboardSL = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>

            <View style={{ flexDirection: 'row', }}>
                <View style={styles.imagecard}>
                    <Image source={require('../../asset/temporary.png')} style={styles.jobicon}></Image>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={[styles.title]}>{item.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.vacancy}>vacancy</Text>
                            <Text style={styles.vacancycount}>{item.vacancy}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                        <Text style={styles.company}>{item.company}</Text>
                        <Image source={require('../../asset/right.png')} style={styles.jobicon}></Image>
                    </View>
                </View>


            </View>




        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}


            {/* List */}
            <Text style={styles.sectionTitle}>Available Service Lines</Text>
            <FlatList
                data={serviceLines}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />

            <TouchableOpacity style={{ alignItems: "center", marginVertical: 20,flexDirection:'row',justifyContent:'center' }}>
                <Text style={styles.viewmoretext}>View More</Text>
                <Image source={require('../../asset/viewmore.png')} style={{marginLeft:5,tintColor:'#E63665',height:16,width:16}}></Image>
            </TouchableOpacity>

            {/* Buttons */}
            <TouchableOpacity style={styles.outlineBtn}>
                 <Image source={require('../../asset/profile-complete.png')} style={{marginRight:5,tintColor:'#E63665',height:30,width:30}}></Image>
                <Text style={styles.outlineBtnText}>Profile View Completion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fillBtn}>
                 <Image source={require('../../asset/correct.png')} style={{marginRight:5,tintColor:'#FFFFFF',height:30,width:30}}></Image>
                <Text style={styles.fillBtnText}>Applied SL</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DashboardSL;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: {
        backgroundColor: "#E91E63",
        padding: 16,
        alignItems: "center",
        marginBottom: 10,
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
    outlineBtn: {
        borderWidth: 1,
        borderColor: "#E91E63",
        padding: 12,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 10,
        flexDirection:'row',
        justifyContent:'center'
    },
    outlineBtnText: { color: "#E91E63", fontWeight: "600" },
    fillBtn: {
        backgroundColor: "#E91E63",
        padding: 12,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 16,
        flexDirection:'row',
        justifyContent:'center'
    },
    fillBtnText: { color: "#fff", fontWeight: "600" },
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
        color:'#665F5F'
    }
});
