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
} from 'react-native';

const transactions = [
    { id: '1', title: 'Warehouse Helper', amount: 700 },
    { id: '2', title: 'Attendant', amount: 700 },
    { id: '3', title: 'Delivery Boy', amount: 700 },
    { id: '4', title: 'Plumber', amount: 600 },
];

const WalletScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.transactionRow}>
            <View style={styles.iconCircle}>
                <Image
                    source={require('../../assets/worker.png')}
                    style={[styles.profile, { width: 25, height: 25 }]}
                />
            </View>

            <Text style={styles.transactionTitle}>{item.title}</Text>

            <Text style={styles.amount}>₹ {item.amount}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.backArrow}>←</Text>
                <Text style={styles.headerTitle}>Wallet</Text>

                <View style={styles.profileWrapper}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100' }}
                        style={styles.profile}
                    />
                </View>
            </View>

            {/* Total Earn Card */}
            <ImageBackground source={require('../../assets/wallet-bg.png')} style={styles.earnCard_bg}>
                <View style={styles.earnCard}>
                    <View>
                        <Text style={styles.earnLabel}>Total Earn</Text>
                        <Text style={styles.earnAmount}>₹ 2,350</Text>

                        <TouchableOpacity style={styles.viewButton}>
                            <Text style={styles.viewText}>View</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ImageBackground>


            {/* Transaction Card */}
            <View style={styles.transactionCard}>
                <View style={styles.transactionHeader}>
                    <Text style={styles.transactionHeading}>Transaction History</Text>
                    <Text style={styles.arrow}>→</Text>
                </View>

                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

export default WalletScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6F9',
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
    },

    backArrow: {
        fontSize: 22,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },

    profileWrapper: {
        backgroundColor: '#E5E5E5',
        padding: 5,
        borderRadius: 12,
    },

    profile: {
        width: 35,
        height: 35,
        borderRadius: 8,
    },

    earnCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 20,
        alignItems: 'center',
        marginBottom: 25,


    },

    earnCard_bg: {
        height: 150,
        width: '100%',



    },


    earnLabel: {
        color: '#fff',
        fontFamily: 'InstrumentSans-Medium',
        fontSize: 26,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center'
    },

    earnAmount: {
        color: '#fff',
        fontFamily: 'InstrumentSans-Medium',
        fontSize: 23,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,
        marginTop: 10
    },

    viewButton: {
        backgroundColor: '#FEA92F',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 8,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    viewText: {
        color: '#fff',
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        letterSpacing: 0,
    },

    coinImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },

    transactionCard: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,

        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 4,
    },

    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    transactionHeading: {
        fontFamily: 'InstrumentSans-Medium',
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000',
    },

    arrow: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '700'
    },

    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 19,
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    transactionTitle: {
        flex: 1,
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0,
        color: '#000000',
    },

    amount: {
        fontFamily: 'InstrumentSans-SemiBold',
        fontSize: 11,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: 0,
        color:'#000000',
    },
});