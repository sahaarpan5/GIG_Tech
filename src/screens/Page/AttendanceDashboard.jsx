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









const AttendanceDashboard = () => {

    const navigation = useNavigation();




    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E63665' }}>
                <View style={{ flex: 1, backgroundColor: '#E63665', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                    <StatusBar backgroundColor="#E63665" barStyle="dark-content" />

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../assets/back-icon.png')} style={styles.headerIcon}></Image>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Check-In / Check-Out</Text>
                        <TouchableOpacity onPress={()=>navigation.replace('DashboardScreen')}>
                            <Image source={require('../../assets/home-icon.png')} style={styles.headerIcon}></Image>
                        </TouchableOpacity>

                    </View>

                    <ScrollView style={{ flex: 1,backgroundColor:'#FFF' }}>



                        <View style={{ flex: 1, justifyContent: 'center', padding: 20, alignContent: 'center', marginTop: 60 }}>

                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AttendanceManage')}>
                                    <Image source={require('../../assets/pointing-up.png')} style={styles.menuICon}></Image>
                                    <Text style={styles.menuTextText}>Manage</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AttendanceReport')}>
                                    <Image source={require('../../assets/document.png')} style={styles.menuICon}></Image>
                                    <Text style={styles.menuTextText}>Report</Text>
                                </TouchableOpacity>
                            </View>
                           
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>

        </SafeAreaProvider>


    );
};

export default AttendanceDashboard;

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



    headerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    card: {
        height: 150,
        width: 150,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10.5,
        elevation: 10,
        borderWidth: 1,
        borderColor: "#21212133",
        paddingHorizontal: 10,
        marginHorizontal: 15,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
     menuTextText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 400,
        textAlign: 'center',
        marginTop: 20,

    },
    menuICon: {
        width: 75,
        height: 75
    },
});