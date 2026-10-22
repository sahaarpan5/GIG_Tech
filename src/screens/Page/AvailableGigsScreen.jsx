import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar,
    SafeAreaView,
    ImageBackground,
} from 'react-native';



const DATA = [
    {
        id: '1',
        title: 'Delivery Boy',
        company: 'Zomato Company',
        location: '55 km | Newtown',
        time: '2 pm-11 pm',
        price: 600,
        image: require('../../assets/worker.png'),
    },
    {
        id: '2',
        title: 'Technician',
        company: 'Bigbazar',
        location: '55 km | Newtown',
        time: '2 pm-11 pm',
        price: 400,
        image: require('../../assets/worker.png'),
    },
    {
        id: '3',
        title: 'Attendant',
        company: 'Hospital',
        location: '85 km | Sector v',
        time: '2 pm-11 pm',
        price: 700,
        image: require('../../assets/worker.png'),
    },
    {
        id: '4',
        title: 'Warehouse Helper',
        company: 'Logistic Company',
        location: '85 km | Sector v',
        time: '2 pm-11 pm',
        price: 700,
        image: require('../../assets/worker.png'),
    },
];

const AvailableGigsScreen = () => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Jobdetails')}>
            <Image source={item.image} style={styles.cardImage} />

            <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>₹ {item.price}</Text>
                    
                </View>

                <Text style={styles.company}>{item.company}</Text>

                <View style={styles.rowBetween}>
                    <View style={styles.row}>
                        {/* <MaterialIcon name="location-on" size={14} color="red" /> */}
                        <Text style={styles.metaText}>{item.location}</Text>
                    </View>

                    <View style={styles.row}>
                        {/* <MaterialIcon name="access-time" size={14} color="#999" /> */}
                        <Text style={styles.metaText}>{item.time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ImageBackground
                source={require('../../assets/Welcome-bg.png')} // your top background image
                style={styles.topImage}
                resizeMode="cover"
            >
                <View style={styles.main_container}>
                    <View style={styles.header}>

                        <Text style={styles.headerTitle}>Available Gigs</Text>


                    </View>

                    {/* Filter Row */}
                    <View style={styles.filterRow}>


                        <Text style={styles.filterText}>Filter | Sort</Text>
                    </View>

                    {/* Gig List */}
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ImageBackground>

            {/* Top Background Curve */}


            {/* Header */}

        </SafeAreaView>
    );
};

export default AvailableGigsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F3F6',

    },

    headerBackground: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 250,
        height: 250,
        backgroundColor: '#1CA7B6',
        borderRadius: 125,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 40,
    },

    headerTitle: {
        fontFamily: 'InstrumentSans-Medium',
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#000000',


    },

    profileWrapper: {
        backgroundColor: '#E0E0E0',
        padding: 6,
        borderRadius: 10,
    },

    profileImage: {
        width: 28,
        height: 28,
        borderRadius: 6,
    },

    filterRow: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 20,
    },

    nearbyText: {
        fontSize: 14,
        fontWeight: '500',
    },

    filterText: {
        fontSize: 13,
        color: '#333',
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    cardImage: {
        width: 40,
        height: 40,
        marginRight: 12,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },

    title: {
        fontFamily: 'InstrumentSans-SemiBold',
        fontSize: 19,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000',
    },

    price: {
        fontFamily: 'InstrumentSans-SemiBold',
        fontSize: 19,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#F5A623',
    },

    company: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0,
        marginTop: 2,
        color: '#777575F0'
    },

    metaText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 11,
        fontWeight: '400',
        letterSpacing: 0,
        marginLeft: 3,
        color:'#000000'
    },
    main_container: {
        flex: 1,
        marginHorizontal: 20
    },

    topImage: {
        flex: 1
    },
});