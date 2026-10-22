import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Image,
} from 'react-native';


const WORK_TYPES = ['Delivery', 'Driver', 'Trades', 'Events', 'Cleaning', 'Security'];

const QUALIFICATIONS = [
    'Below 10th',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate',
    'Post Graduate',
];

const Registration = () => {
    // Form state (UI only)
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [workType, setWorkType] = useState('');
    const [dob, setDob] = useState('');
    const [qualification, setQualification] = useState('');

    // Dropdown open flags
    const [showQualifications, setShowQualifications] = useState(false);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* ============ HERO ============ */}
                <View style={styles.hero}>
                    <View style={styles.heroOverlay} />

                    <View style={styles.heroContent}>
                        <View style={styles.logoBadge}>


                            <Image
                                source={require('../../assets/genlogo.png')}
                                style={{ height: 30, width: 30 }}
                                resizeMode="contain"
                            />
                        </View>

                        <Text style={styles.heroTitle}>Create your account</Text>
                        <Text style={styles.heroSubtitle}>
                            Join thousands of gig workers near you
                        </Text>
                    </View>
                </View>

                {/* ============ FORM CARD ============ */}
                <View style={styles.formCard}>
                    {/* Full Name */}
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputRow}>

                        <Image
                            source={require('../../assets/person-outline.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            placeholderTextColor="#A7B4B6"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Mobile */}
                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputRow}>
                        <Text style={styles.countryCode}>+91</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter 10-digit mobile"
                            placeholderTextColor="#A7B4B6"
                            keyboardType="number-pad"
                            maxLength={10}
                            value={mobile}
                            onChangeText={setMobile}
                        />
                    </View>

                    {/* Email */}
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputRow}>

                        <Image
                            source={require('../../assets/mail.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            placeholderTextColor="#A7B4B6"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Location */}
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.inputRow}>

                        <Image
                            source={require('../../assets/location.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Select your city"
                            placeholderTextColor="#A7B4B6"
                            value={location}
                            onChangeText={setLocation}
                        />
                    </View>

                    {/* Work Type */}
                    <Text style={styles.label}>Work Type</Text>
                    <View style={styles.chipWrap}>
                        {WORK_TYPES.map((type) => {
                            const selected = workType === type;
                            return (
                                <TouchableOpacity
                                    key={type}
                                    style={[styles.chip, selected && styles.chipSelected]}
                                    onPress={() => setWorkType(type)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Date of Birth */}
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity style={styles.inputRow} activeOpacity={0.7}>

                        <Image
                            source={require('../../assets/schedule.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                        <Text style={[styles.input, !dob && { color: '#A7B4B6' }]}>
                            {dob || 'DD / MM / YYYY'}
                        </Text>

                        <Image
                            source={require('../../assets/chevron-down.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />

                       
                    </TouchableOpacity>

                    {/* Highest Qualification */}
                    <Text style={styles.label}>Highest Qualification</Text>
                    <TouchableOpacity
                        style={styles.inputRow}
                        activeOpacity={0.8}
                        onPress={() => setShowQualifications(!showQualifications)}
                    >

                        <Image
                            source={require('../../assets/school-outline.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />

                        <Text style={[styles.input, !qualification && { color: '#A7B4B6' }]}>
                            {qualification || 'Select qualification'}
                        </Text>
                        <Image
                            source={require('../../assets/chevron-down.png')}
                            style={[styles.inputIcon, { tintColor: '#8A9698' }]}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* Qualification dropdown (inline) */}


                    {/* CTA */}
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
                        <Text style={styles.primaryButtonText}>Create Account</Text>
                    </TouchableOpacity>

                    {/* Sign in link */}
                    <View style={styles.signinRow}>
                        <Text style={styles.signinText}>Already have an account?</Text>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={styles.signinLink}> Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#047282',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 0,
    },

    /* Hero */
    hero: {
        height: 210,
        backgroundColor: '#047282',
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(4,114,130,1)',
    },
    heroContent: {
        paddingHorizontal: 28,
        paddingBottom: 40,
    },
    logoBadge: {
        width: 58,
        height: 58,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    heroTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 6,
    },

    /* Form card */
    formCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -28,
        paddingHorizontal: 28,
        paddingTop: 28,
        paddingBottom: 40,
    },

    /* Labels */
    label: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#0A2E33',
        marginBottom: 8,
        marginTop: 16,
    },

    /* Input rows */
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        paddingHorizontal: 14,
        height: 54,
    },
    inputIcon: {
        marginRight: 10,
        height: 18,
        width: 18
    },
    countryCode: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '600',
        color: '#0A2E33',
        marginRight: 10,
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: '#E4ECEE',
    },
    input: {
        flex: 1,
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 15,
        color: '#0A2E33',
        paddingVertical: 0,
    },

    /* Chips */
    chipWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: '#F2F9FA',
        borderWidth: 1,
        borderColor: '#E4ECEE',
        marginHorizontal: 4,
        marginBottom: 8,
    },
    chipSelected: {
        backgroundColor: '#047282',
        borderColor: '#047282',
    },
    chipText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7A7C',
    },
    chipTextSelected: {
        color: '#FFFFFF',
    },

    /* Dropdown */
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        marginTop: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    dropdownItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F2F9FA',
    },
    dropdownText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#0A2E33',
    },
    dropdownTextSelected: {
        fontFamily: 'InstrumentSans-Bold',
        fontWeight: '700',
        color: '#047282',
    },

    /* CTA */
    primaryButton: {
        height: 54,
        borderRadius: 14,
        backgroundColor: '#FEA92F',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },

    /* Sign in */
    signinRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#6B7A7C',
    },
    signinLink: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#047282',
    },
});

export default Registration;