import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Platform,
    Image,
} from 'react-native';


const QUALIFICATIONS = [
    'Below 10th',
    '10th Pass',
    '12th Pass',
    'Diploma',
    'Graduate',
    'Post Graduate',
];

const GENDERS = ['Male', 'Female', 'Other'];

const ProfileScreen = () => {
    /* ---- Personal ---- */
    const [name, setName] = useState('Rahul Sharma');
    const [mobile, setMobile] = useState('9876543210');
    const [email, setEmail] = useState('rahul@example.com');
    const [gender, setGender] = useState('Male');
    const [location, setLocation] = useState('Sector 18, Noida, UP');
    const [dob, setDob] = useState('15 Aug 1995');
    const [qualification, setQualification] = useState('Graduate');
    const [showQualDropdown, setShowQualDropdown] = useState(false);

    /* ---- Identity ---- */
    const [aadhaarNo, setAadhaarNo] = useState('1234 5678 9012');
    const [panNo, setPanNo] = useState('ABCDE1234F');

    /* ---- Bank ---- */
    const [bankName, setBankName] = useState('Rahul Sharma');
    const [accountNo, setAccountNo] = useState('1234567890');
    const [ifsc, setIfsc] = useState('SBIN0001234');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ============ HEADER ============ */}
                <View style={styles.header}>
                    <View style={styles.headerCircle1} />
                    <View style={styles.headerCircle2} />

                    <View style={styles.avatarWrap}>
                        <View style={styles.avatar}>

                            <Image
                                source={require('../../assets/profileone.png')}
                                style={{ height: 44, width: 44, tintColor: '#047282' }}
                                resizeMode="contain"
                            />
                        </View>
                        <TouchableOpacity style={styles.avatarEdit} activeOpacity={0.8}>

                            <Image
                                source={require('../../assets/camera.png')}
                                style={{ height: 14, width: 14, tintColor: '#FFFFFF' }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.profileName}>{name || 'Your Name'}</Text>
                    <Text style={styles.profileEmail}>{email || 'your@email.com'}</Text>
                </View>

                {/* ============ FORM CARD ============ */}
                <View style={styles.formCard}>
                    {/* ---------- SECTION: Personal ---------- */}
                    <SectionHeader icon={require('../../assets/person-outline.png')} title="Personal Information" iconBg="#F0EDFF" iconColor="#7B5CFF" />

                    <FieldLabel>Full Name</FieldLabel>
                    <InputRow  icon={require('../../assets/person-outline.png')} value={name} onChangeText={setName} placeholder="Enter your full name" />

                    <FieldLabel>Mobile Number</FieldLabel>
                    <View style={styles.inputRow}>
                        <Text style={styles.countryCode}>+91</Text>
                        <TextInput
                            style={styles.input}
                            value={mobile}
                            onChangeText={setMobile}
                            placeholder="Enter 10-digit mobile"
                            placeholderTextColor="#A7B4B6"
                            keyboardType="number-pad"
                            maxLength={10}
                        />
                    </View>

                    <FieldLabel>Email Address</FieldLabel>
                    <InputRow  icon={require('../../assets/mail.png')} value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />

                    <FieldLabel>Gender</FieldLabel>
                    <View style={styles.chipRow}>
                        {GENDERS.map((g) => {
                            const selected = gender === g;
                            return (
                                <TouchableOpacity
                                    key={g}
                                    style={[styles.chip, selected && styles.chipSelected]}
                                    onPress={() => setGender(g)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{g}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <FieldLabel>Location</FieldLabel>
                    <InputRow icon={require('../../assets/location.png')}value={location} onChangeText={setLocation} placeholder="Enter your city" />

                    <FieldLabel>Date of Birth</FieldLabel>
                    <TouchableOpacity style={styles.inputRow} activeOpacity={0.7}>

                        <Image
                            source={require('../../assets/calendar.png')}
                            style={{ height: 18, width: 18, tintColor: '#8A9698', marginRight: 10 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.inputText}>{dob}</Text>

                        <Image
                            source={require('../../assets/chevron-down.png')}
                            style={{ height: 18, width: 18, tintColor: '#8A9698', marginRight: 10 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <FieldLabel>Highest Qualification</FieldLabel>
                    <TouchableOpacity
                        style={styles.inputRow}
                        activeOpacity={0.8}
                        onPress={() => setShowQualDropdown(!showQualDropdown)}
                    >

                        <Image
                            source={require('../../assets/school-outline.png')}
                            style={{ height: 18, width: 18, tintColor: '#8A9698', marginRight: 10 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.inputText}>{qualification}</Text>
                        <Image
                            source={require('../../assets/chevron-down.png')}
                            style={{
                                width: 18,
                                height: 18,
                                resizeMode: 'contain',
                                tintColor: '#8A9698',
                                transform: [
                                    { rotate: showQualDropdown ? '180deg' : '0deg' },
                                ],
                            }}
                        />
                    </TouchableOpacity>

                    {showQualDropdown && (
                        <View style={styles.dropdown}>
                            {QUALIFICATIONS.map((q, i) => (
                                <TouchableOpacity
                                    key={q}
                                    style={[styles.dropdownItem, i !== QUALIFICATIONS.length - 1 && styles.dropdownItemBorder]}
                                    onPress={() => { setQualification(q); setShowQualDropdown(false); }}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.dropdownText, qualification === q && styles.dropdownTextSelected]}>{q}</Text>
                                    {qualification === q && (
                                        <Image
                                            source={require('../../assets/checkmark.png')}
                                            style={{
                                                width: 18,
                                                height: 18,
                                                resizeMode: 'contain',
                                                tintColor: '#047282',
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* ---------- SECTION: Identity ---------- */}
                    <SectionHeader icon={require('../../assets/security.png')} title="Identity Documents" iconBg="#E8F4FF" iconColor="#2C7BE5" />

                    <FieldLabel>Aadhaar Number</FieldLabel>
                    <InputRow  icon={require('../../assets/card-outline.png')} value={aadhaarNo} onChangeText={setAadhaarNo} placeholder="XXXX XXXX XXXX" keyboardType="number-pad" />

                    <FieldLabel>Aadhaar File</FieldLabel>
                    <UploadRow label="Upload Aadhaar" />

                    <FieldLabel>PAN Number</FieldLabel>
                    <InputRow icon={require('../../assets/card-outline.png')} value={panNo} onChangeText={setPanNo} placeholder="ABCDE1234F" autoCapitalize="characters" />

                    <FieldLabel>PAN File</FieldLabel>
                    <UploadRow label="Upload PAN" />

                    {/* ---------- SECTION: Bank ---------- */}
                    <SectionHeader icon={require('../../assets/bank.png')} title="Bank Details" iconBg="#E4F9EC" iconColor="#22A06B" />

                    <FieldLabel>Name as per Bank</FieldLabel>
                    <InputRow icon={require('../../assets/person-outline.png')} value={bankName} onChangeText={setBankName} placeholder="Name on bank account" />

                    <FieldLabel>Account Number</FieldLabel>
                    <InputRow  icon={require('../../assets/keypad-outline.png')} value={accountNo} onChangeText={setAccountNo} placeholder="Enter account number" keyboardType="number-pad" />

                    <FieldLabel>IFSC Code</FieldLabel>
                    <InputRow  icon={require('../../assets/bank.png')} value={ifsc} onChangeText={setIfsc} placeholder="e.g. SBIN0001234" autoCapitalize="characters" />

                    <FieldLabel>Bank File (Cancelled Cheque / Passbook)</FieldLabel>
                    <UploadRow label="Upload bank document" />

                    {/* ---------- SAVE ---------- */}
                    <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
                        <Text style={styles.saveBtnText}>Save Changes</Text>

                        <Image
                            source={require('../../assets/checked.png')}
                            style={{
                                width: 18,
                                height: 18,
                                resizeMode: 'contain',
                                tintColor: '#FFFFFF',
                                marginLeft: 6
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    );
};

/* ---------- Reusable components ---------- */

const SectionHeader = ({ icon, title, iconBg, iconColor }) => (
    <View style={styles.sectionHeader}>
        <View style={[styles.sectionIconBox, { backgroundColor: iconBg }]}>
            <Image
                source={icon}
                style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: iconColor,
                }}
            />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

const FieldLabel = ({ children }) => (
    <Text style={styles.fieldLabel}>{children}</Text>
);

const InputRow = ({ icon, value, onChangeText, placeholder, ...rest }) => (
    <View style={styles.inputRow}>
        {icon && (
            <Image
                source={icon}
                style={[
                    styles.inputIcon,
                    {
                        width: 18,
                        height: 18,
                        tintColor: '#8A9698',
                        resizeMode: 'contain',
                    },
                ]}
            />
        )}
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#A7B4B6"
            {...rest}
        />
    </View>
);

const UploadRow = ({ label }) => (
    <TouchableOpacity style={styles.uploadRow} activeOpacity={0.8}>
        <View style={styles.uploadIconBox}>

            <Image
                source={require('../../assets/cloud-upload-outline.png')}
                style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'contain',
                    tintColor: '#047282',

                }}
            />
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.uploadLabel}>{label}</Text>
            <Text style={styles.uploadHint}>JPG, PNG, PDF • Max 5 MB</Text>
        </View>
        <View style={styles.uploadBtn}>

            <Image
                source={require('../../assets/add.png')}
                style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: '#FFFFFF',

                }}
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F9FA' },
    scrollContent: { paddingBottom: 30 },

    /* Header */
    header: {
        backgroundColor: '#047282',
        paddingTop: Platform.OS === 'ios' ? 62 : 44,
        paddingBottom: 70,
        alignItems: 'center',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
        position: 'relative',
    },
    headerCircle1: {
        position: 'absolute', top: -80, right: -80,
        width: 220, height: 220, borderRadius: 110,
        backgroundColor: 'rgba(254,169,47,0.18)',
    },
    headerCircle2: {
        position: 'absolute', bottom: -100, left: -60,
        width: 200, height: 200, borderRadius: 100,
        backgroundColor: 'rgba(123,92,255,0.16)',
    },
    avatarWrap: { position: 'relative', marginBottom: 14 },
    avatar: {
        width: 92, height: 92, borderRadius: 46,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    },
    avatarEdit: {
        position: 'absolute', bottom: 0, right: 0,
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: '#FEA92F',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#FFFFFF',
    },
    profileName: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 22, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: -0.3,
    },
    profileEmail: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 13,
        color: 'rgba(255,255,255,0.82)', marginTop: 3,
    },

    /* Form card */
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginHorizontal: 20,
        marginTop: -46,
        padding: 20,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 10,
    },

    /* Section header */
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 4,
    },
    sectionIconBox: {
        width: 34, height: 34, borderRadius: 11,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 10,
    },
    sectionTitle: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 15, fontWeight: '700',
        color: '#0A2E33', letterSpacing: -0.2,
    },

    /* Field label */
    fieldLabel: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 12, fontWeight: '600',
        color: '#0A2E33', marginBottom: 6, marginTop: 16,
    },

    /* Inputs */
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E4ECEE',
        paddingHorizontal: 14,
        height: 52,
    },
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1, fontFamily: 'InstrumentSans-Regular',
        fontSize: 14, color: '#0A2E33', paddingVertical: 0,
    },
    inputText: {
        flex: 1, fontFamily: 'InstrumentSans-Regular',
        fontSize: 14, color: '#0A2E33',
    },
    countryCode: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 14, fontWeight: '600',
        color: '#0A2E33', marginRight: 10, paddingRight: 10,
        borderRightWidth: 1, borderRightColor: '#E4ECEE',
    },

    /* Gender chips */
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    chip: {
        paddingHorizontal: 18, paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: '#F2F9FA',
        borderWidth: 1, borderColor: '#E4ECEE',
        marginHorizontal: 4, marginBottom: 8,
    },
    chipSelected: {
        backgroundColor: '#047282', borderColor: '#047282',
    },
    chipText: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '600', color: '#6B7A7C',
    },
    chipTextSelected: { color: '#FFFFFF' },

    /* Dropdown */
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1, borderColor: '#E4ECEE',
        marginTop: 8, overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08, shadowRadius: 10, elevation: 4,
    },
    dropdownItem: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 13,
    },
    dropdownItemBorder: {
        borderBottomWidth: 1, borderBottomColor: '#F2F9FA',
    },
    dropdownText: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 14, color: '#0A2E33',
    },
    dropdownTextSelected: {
        fontFamily: 'InstrumentSans-Bold', fontWeight: '700', color: '#047282',
    },

    /* Upload row */
    uploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFB',
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#D4E9EC',
        borderStyle: 'dashed',
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    uploadIconBox: {
        width: 40, height: 40, borderRadius: 12,
        backgroundColor: '#EAF5F6',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12,
    },
    uploadLabel: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '700',
        color: '#0A2E33',
    },
    uploadHint: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 11,
        color: '#8A9698', marginTop: 2,
    },
    uploadBtn: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: '#047282',
        justifyContent: 'center', alignItems: 'center',
    },

    /* Save button */
    saveBtn: {
        flexDirection: 'row',
        height: 54, borderRadius: 14,
        backgroundColor: '#FEA92F',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 28,
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35, shadowRadius: 12, elevation: 6,
    },
    saveBtnText: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: 0.2,
    },
});

export default ProfileScreen;