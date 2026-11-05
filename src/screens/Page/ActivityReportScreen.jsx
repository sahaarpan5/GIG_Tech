import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    StatusBar,
    Platform,
    TextInput,
    Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ------- Sample data (replace with API) ------- */
const ACTIVITY_DATA = [
    {
        id: '1',
        ClientName: 'SHYAMOLI PARIBAHAN PRIVATE LIMITED',
        ClientOfficeName: 'SHYAMOLI - KOLKATA',
        PositionName: 'DRIVER',
        ProductName: 'TRIP',
        Product_UnitName: 'Unite',
        Unite_Rate: 500.0,
        Unit_Value: 1.0,
        Total_Amount: 500.0,
        ActivityDate: '2026-11-02T00:00:00',
        CreatedDate: '2026-11-05T13:21:23.817',
    },
    {
        id: '2',
        ClientName: 'SHYAMOLI PARIBAHAN PRIVATE LIMITED',
        ClientOfficeName: 'SHYAMOLI - KOLKATA',
        PositionName: 'DRIVER',
        ProductName: 'TRIP',
        Product_UnitName: 'Unite',
        Unite_Rate: 500.0,
        Unit_Value: 3.0,
        Total_Amount: 1500.0,
        ActivityDate: '2026-11-01T00:00:00',
        CreatedDate: '2026-11-04T10:15:12.123',
    },
    {
        id: '3',
        ClientName: 'SHYAMOLI PARIBAHAN PRIVATE LIMITED',
        ClientOfficeName: 'SHYAMOLI - KOLKATA',
        PositionName: 'HELPER',
        ProductName: 'TRIP',
        Product_UnitName: 'Unite',
        Unite_Rate: 350.0,
        Unit_Value: 2.0,
        Total_Amount: 700.0,
        ActivityDate: '2026-10-31T00:00:00',
        CreatedDate: '2026-11-03T08:45:33.456',
    },
    {
        id: '4',
        ClientName: 'SHYAMOLI PARIBAHAN PRIVATE LIMITED',
        ClientOfficeName: 'SHYAMOLI - KOLKATA',
        PositionName: 'DRIVER',
        ProductName: 'TRIP',
        Product_UnitName: 'Unite',
        Unite_Rate: 500.0,
        Unit_Value: 2.0,
        Total_Amount: 1000.0,
        ActivityDate: '2026-10-30T00:00:00',
        CreatedDate: '2026-11-02T14:22:07.789',
    },
    {
        id: '5',
        ClientName: 'SHYAMOLI PARIBAHAN PRIVATE LIMITED',
        ClientOfficeName: 'SHYAMOLI - KOLKATA',
        PositionName: 'HELPER',
        ProductName: 'TRIP',
        Product_UnitName: 'Unite',
        Unite_Rate: 350.0,
        Unit_Value: 4.0,
        Total_Amount: 1400.0,
        ActivityDate: '2026-10-29T00:00:00',
        CreatedDate: '2026-11-01T09:11:50.234',
    },
];

const REPORT_TRANSLATIONS = {
    English: {
        title: 'Activity Report',
        activities: 'Activities',
        totalRate: 'Total Amount',
        totalQty: 'Total Units',
        qty: 'Qty',
        rate: 'Rate',
        noActivities: 'No activities yet',
        emptyMessage: 'Your completed activities will appear here',
        startDate: 'Start Date',
        endDate: 'End Date',
        show: 'Show',
        productName: 'Product',
        clientName: 'Client',
        positionName: 'Position',
        unitRate: 'Unit Rate',
        unitValue: 'Unit Value',
        totalAmount: 'Total',
        activityDate: 'Activity Date',
        enterStart: 'YYYY-MM-DD',
        enterEnd: 'YYYY-MM-DD',
        dateRequired: 'Please select both dates',
        invalidRange: 'Start date must be before end date',
    },
    Bengali: {
        title: 'কাজের রিপোর্ট',
        activities: 'কাজের সংখ্যা',
        totalRate: 'মোট পরিমাণ',
        totalQty: 'মোট একক',
        qty: 'পরিমাণ',
        rate: 'দর',
        noActivities: 'এখনও কোনো কাজ নেই',
        emptyMessage: 'আপনার সম্পন্ন করা কাজ এখানে দেখা যাবে',
        startDate: 'শুরুর তারিখ',
        endDate: 'শেষ তারিখ',
        show: 'দেখান',
        productName: 'পণ্য',
        clientName: 'ক্লায়েন্ট',
        positionName: 'পদ',
        unitRate: 'একক দর',
        unitValue: 'একক মূল্য',
        totalAmount: 'মোট',
        activityDate: 'কাজের তারিখ',
        enterStart: 'YYYY-MM-DD',
        enterEnd: 'YYYY-MM-DD',
        dateRequired: 'অনুগ্রহ করে উভয় তারিখ দিন',
        invalidRange: 'শুরুর তারিখ শেষের আগে হতে হবে',
    },
    Hindi: {
        title: 'कार्य रिपोर्ट',
        activities: 'कार्यों की संख्या',
        totalRate: 'कुल राशि',
        totalQty: 'कुल इकाइयां',
        qty: 'मात्रा',
        rate: 'दर',
        noActivities: 'अभी कोई कार्य नहीं है',
        emptyMessage: 'आपके पूरे किए गए कार्य यहाँ दिखाई देंगे',
        startDate: 'शुरू होने की तिथि',
        endDate: 'समाप्ति तिथि',
        show: 'दिखाएँ',
        productName: 'उत्पाद',
        clientName: 'ग्राहक',
        positionName: 'पद',
        unitRate: 'इकाई दर',
        unitValue: 'इकाई मूल्य',
        totalAmount: 'कुल',
        activityDate: 'कार्य तिथि',
        enterStart: 'YYYY-MM-DD',
        enterEnd: 'YYYY-MM-DD',
        dateRequired: 'कृपया दोनों तिथियाँ दर्ज करें',
        invalidRange: 'प्रारंभ तिथि समाप्ति से पहले होनी चाहिए',
    },
};

/* Format ISO date to readable DD MMM YYYY */
const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const ActivityReportScreen = ({ navigation }) => {

    const [showStartDateModal, setShowStartDateModal] = useState(false);
    const [showEndDateModal, setShowEndDateModal] = useState(false);

    const [calendarMonth, setCalendarMonth] = useState(new Date());
    const [activeDateField, setActiveDateField] = useState('start');
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const [showData, setShowData] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const t = (key) =>
        REPORT_TRANSLATIONS[selectedLanguage]?.[key] ??
        REPORT_TRANSLATIONS.English[key] ??
        key;

    /* Filtered data based on date range */
    const filteredData = showData
        ? ACTIVITY_DATA.filter((item) => {
            if (!startDate || !endDate) return true;
            const activity = new Date(item.ActivityDate).getTime();
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            return activity >= start && activity <= end + 86399999; // include full end day
        })
        : [];

    const totalAmount = filteredData.reduce((sum, item) => sum + item.Total_Amount, 0);
    const totalUnits = filteredData.reduce((sum, item) => sum + item.Unit_Value, 0);

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (savedLanguage && REPORT_TRANSLATIONS[savedLanguage]) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log('Error loading saved language:', error);
            }
        };
        loadLanguage();
    }, []);

    const getCurrentMonthDateRange = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = today.getMonth();

        const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;

        const lastDay = new Date(year, month + 1, 0).getDate();

        const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

        return {
            startDate,
            endDate,
        };
    };

    const [startDate, setStartDate] = useState(
        () => getCurrentMonthDateRange().startDate
    );

    const [endDate, setEndDate] = useState(
        () => getCurrentMonthDateRange().endDate
    );

    const handleShow = () => {
        if (!startDate || !endDate) {
            setAlertMessage(t('dateRequired'));
            setAlertVisible(true);
            return;
        }
        const s = new Date(startDate).getTime();
        const e = new Date(endDate).getTime();
        if (isNaN(s) || isNaN(e)) {
            setAlertMessage(t('dateRequired'));
            setAlertVisible(true);
            return;
        }
        if (s > e) {
            setAlertMessage(t('invalidRange'));
            setAlertVisible(true);
            return;
        }
        setShowData(true);
    };

    /* ---------- Card renderer ---------- */
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* Header row: Position chip + Activity date */}
            <View style={styles.cardDateRow}>
                <View style={styles.positionChip}>
                    <Text style={styles.positionChipText}>{item.PositionName}</Text>
                </View>
                <View style={styles.cardDateLeft}>
                    <Image
                        source={require('../../assets/calendar.png')}
                        style={{ height: 12, width: 12, tintColor: '#F5A623' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.cardDate}>{formatDate(item.ActivityDate)}</Text>
                </View>
            </View>

            {/* Product name */}
            <Text style={styles.productName} numberOfLines={2}>
                {item.ProductName}
            </Text>

            {/* Client row */}
            <View style={styles.clientRow}>
                <View style={styles.clientIconChip}>
                    <Image
                        source={require('../../assets/bank.png')}
                        style={{ height: 12, width: 12, tintColor: '#2C7BE5' }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.clientName} numberOfLines={1}>
                        {item.ClientName}
                    </Text>
                    <Text style={styles.clientOffice} numberOfLines={1}>
                        {item.ClientOfficeName}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.cardDivider} />

            {/* Meta grid: Unit Rate, Unit Value, Total */}
            <View style={styles.metaGrid}>
                <View style={styles.metaCell}>
                    <Text style={styles.metaCellLabel}>{t('unitRate')}</Text>
                    <Text style={styles.metaCellValue}>₹ {item.Unite_Rate.toFixed(2)}</Text>
                </View>
                <View style={styles.metaCellDivider} />
                <View style={styles.metaCell}>
                    <Text style={styles.metaCellLabel}>{t('unitValue')}</Text>
                    <Text style={styles.metaCellValue}>{item.Unit_Value.toFixed(2)}</Text>
                </View>
                <View style={styles.metaCellDivider} />
                <View style={styles.metaCell}>
                    <Text style={styles.metaCellLabel}>{t('totalAmount')}</Text>
                    <Text style={[styles.metaCellValue, styles.metaCellTotal]}>
                        ₹ {item.Total_Amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );


    const openDateCalendar = (field) => {
        const selectedDate = field === 'start' ? startDate : endDate;

        setActiveDateField(field);
        setCalendarMonth(
            selectedDate
                ? new Date(`${selectedDate}T00:00:00`)
                : new Date()
        );

        if (field === 'start') {
            setShowStartDateModal(true);
        } else {
            setShowEndDateModal(true);
        }
    };

    const closeDateCalendar = () => {
        setShowStartDateModal(false);
        setShowEndDateModal(false);
    };

    const getCalendarDays = () => {
        const year = calendarMonth.getFullYear();
        const month = calendarMonth.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        return [
            ...Array(firstDay).fill(null),
            ...Array.from(
                { length: totalDays },
                (_, i) => new Date(year, month, i + 1)
            ),
        ];
    };

    const changeCalendarMonth = (direction) => {
        setCalendarMonth(
            new Date(
                calendarMonth.getFullYear(),
                calendarMonth.getMonth() + direction,
                1
            )
        );
    };

    const selectCalendarDate = (date) => {
        const selectedDate = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
        ].join('-');

        if (activeDateField === 'start') {
            setStartDate(selectedDate);

            // Clear end date if it becomes earlier than start date
            if (endDate && new Date(`${endDate}T00:00:00`) < date) {
                setEndDate('');
            }
        } else {
            setEndDate(selectedDate);
        }

        setShowData(false);
        closeDateCalendar();
    };

    const monthYearLabel = calendarMonth.toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
    });

    const isDateDisabled = (date) => {
        if (!date) return true;

        if (activeDateField === 'end' && startDate) {
            return date < new Date(`${startDate}T00:00:00`);
        }

        if (activeDateField === 'start' && endDate) {
            return date > new Date(`${endDate}T00:00:00`);
        }

        return false;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* ============ HEADER ============ */}
            <View style={styles.header}>
                <View style={styles.headerCircle1} />
                <View style={styles.headerCircle2} />

                <View style={styles.headerTopRow}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation && navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={require('../../assets/arrow-back.png')}
                            style={{ height: 20, width: 20, tintColor: '#FFFFFF' }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>{t('title')}</Text>

                    <View style={{ width: 38 }} />
                </View>

                {/* Date range filter */}
                <View style={styles.filterCard}>
                    <View style={styles.filterRow}>


                        <TouchableOpacity style={styles.filterInputWrap} onPress={() => openDateCalendar('start')}>
                            <Text style={styles.filterLabel}>{t('startDate')}</Text>
                            <View style={styles.filterInputRow}>
                                <Image
                                    source={require('../../assets/calendar.png')}
                                    style={{ height: 14, width: 14, tintColor: '#F5A623', marginRight: 6 }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.filterInput}>
                                    {startDate ? formatDate(startDate) : t('enterStart')}
                                </Text>
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity style={styles.filterInputWrap} onPress={() => openDateCalendar('end')}>
                            <Text style={styles.filterLabel}>{t('endDate')}</Text>
                            <View style={styles.filterInputRow}>
                                <Image
                                    source={require('../../assets/calendar.png')}
                                    style={{ height: 14, width: 14, tintColor: '#F5A623', marginRight: 6 }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.filterInput}>
                                    {endDate ? formatDate(endDate) : t('enterEnd')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.showBtn}
                        onPress={handleShow}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.showBtnText}>{t('show')}</Text>
                        <Image
                            source={require('../../assets/arrow-forward.png')}
                            style={{ height: 16, width: 16, tintColor: '#047282', marginLeft: 6 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* Summary strip — only when data shown */}
                {showData && (
                    <View style={styles.summaryStrip}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{filteredData.length}</Text>
                            <Text style={styles.summaryLabel}>{t('activities')}</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>₹{totalAmount.toLocaleString()}</Text>
                            <Text style={styles.summaryLabel}>{t('totalRate')}</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryValue}>{totalUnits.toFixed(0)}</Text>
                            <Text style={styles.summaryLabel}>{t('totalQty')}</Text>
                        </View>
                    </View>
                )}
            </View>

            {/* ============ LIST ============ */}
            {showData ? (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyWrap}>
                            <Image
                                source={require('../../assets/google-docs.png')}
                                style={{ height: 52, width: 52, tintColor: '#D4E9EC' }}
                                resizeMode="contain"
                            />
                            <Text style={styles.emptyTitle}>{t('noActivities')}</Text>
                            <Text style={styles.emptySubtitle}>{t('emptyMessage')}</Text>
                        </View>
                    }
                />
            ) : (
                <View style={styles.placeholderWrap}>
                    <Image
                        source={require('../../assets/google-docs.png')}
                        style={{ height: 64, width: 64, tintColor: '#D4E9EC' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.placeholderTitle}>{t('title')}</Text>
                    <Text style={styles.placeholderSubtitle}>
                        {t('startDate')} / {t('endDate')} → {t('show')}
                    </Text>
                </View>
            )}

            {/* ============ ALERT MODAL ============ */}
            <Modal
                visible={alertVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setAlertVisible(false)}
            >
                <View style={styles.alertBackdrop}>
                    <View style={styles.alertBox}>
                        <Text style={styles.alertText}>{alertMessage}</Text>
                        <TouchableOpacity
                            style={styles.alertBtn}
                            onPress={() => setAlertVisible(false)}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.alertBtnText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showStartDateModal || showEndDateModal}
                transparent
                animationType="fade"
                onRequestClose={closeDateCalendar}
            >
                <View style={styles.calendarBackdrop}>
                    <View style={styles.calendarContainer}>

                        {/* Calendar Header */}
                        <View style={styles.calendarHeader}>
                            <Text style={styles.calendarTitle}>
                                {activeDateField === 'start'
                                    ? t('startDate')
                                    : t('endDate')}
                            </Text>

                            <TouchableOpacity onPress={closeDateCalendar}>
                                <Text style={styles.calendarClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Month Navigation */}
                        <View style={styles.monthNavigation}>
                            <TouchableOpacity
                                style={styles.monthArrow}
                                onPress={() => changeCalendarMonth(-1)}
                            >
                                <Text style={styles.monthArrowText}>‹</Text>
                            </TouchableOpacity>

                            <Text style={styles.monthYearText}>
                                {monthYearLabel}
                            </Text>

                            <TouchableOpacity
                                style={styles.monthArrow}
                                onPress={() => changeCalendarMonth(1)}
                            >
                                <Text style={styles.monthArrowText}>›</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Week Days */}
                        <View style={styles.weekDaysRow}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                                (day) => (
                                    <Text key={day} style={styles.weekDayText}>
                                        {day}
                                    </Text>
                                )
                            )}
                        </View>

                        {/* Calendar Dates */}
                        <View style={styles.calendarDaysGrid}>
                            {getCalendarDays().map((date, index) => {
                                if (!date) {
                                    return (
                                        <View
                                            key={`empty-${index}`}
                                            style={styles.calendarDayCell}
                                        />
                                    );
                                }

                                const selectedValue =
                                    activeDateField === 'start'
                                        ? startDate
                                        : endDate;

                                const dateValue = [
                                    date.getFullYear(),
                                    String(date.getMonth() + 1).padStart(2, '0'),
                                    String(date.getDate()).padStart(2, '0'),
                                ].join('-');

                                const isSelected = selectedValue === dateValue;
                                const disabled = isDateDisabled(date);

                                return (
                                    <TouchableOpacity
                                        key={dateValue}
                                        disabled={disabled}
                                        style={[
                                            styles.calendarDayCell,
                                            isSelected && styles.selectedCalendarDay,
                                        ]}
                                        onPress={() => selectCalendarDate(date)}
                                    >
                                        <Text
                                            style={[
                                                styles.calendarDayText,
                                                isSelected && styles.selectedCalendarDayText,
                                                disabled && styles.disabledCalendarDayText,
                                            ]}
                                        >
                                            {date.getDate()}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Cancel Button */}
                        <TouchableOpacity
                            style={styles.calendarCancelBtn}
                            onPress={closeDateCalendar}
                        >
                            <Text style={styles.calendarCancelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F9FA' },

    /* ============ HEADER ============ */
    header: {
        backgroundColor: '#047282',
        paddingTop: Platform.OS === 'ios' ? 58 : 42,
        paddingHorizontal: 20,
        paddingBottom: 24,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: 'hidden',
    },
    headerCircle1: {
        position: 'absolute', top: -60, right: -60,
        width: 180, height: 180, borderRadius: 90,
        backgroundColor: 'rgba(254,169,47,0.18)',
    },
    headerCircle2: {
        position: 'absolute', bottom: -80, left: -50,
        width: 160, height: 160, borderRadius: 80,
        backgroundColor: 'rgba(123,92,255,0.16)',
    },
    headerTopRow: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 16,
    },
    backBtn: {
        width: 38, height: 38, borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.16)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.24)',
    },
    headerTitle: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 17, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: -0.2,
    },

    /* Date filter */
    filterCard: {
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        marginBottom: 14,
    },
    filterRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    filterInputWrap: { flex: 1 },
    filterLabel: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    filterInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    filterInput: {
        flex: 1,
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#FFFFFF',
        paddingVertical: 0,
    },
    showBtn: {
        flexDirection: 'row',
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FEA92F',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },
    showBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15,
        fontWeight: '700',
        color: '#047282',
        letterSpacing: 0.3,
    },

    /* Summary strip */
    summaryStrip: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryValue: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 18, fontWeight: '700',
        color: '#FFFFFF',
    },
    summaryLabel: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 10,
        color: 'rgba(255,255,255,0.75)',
        marginTop: 3, letterSpacing: 0.4, textTransform: 'uppercase',
    },
    summaryDivider: {
        width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.22)',
        alignSelf: 'center',
    },

    /* ============ LIST ============ */
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },

    /* Card */
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
    },

    /* Date row */
    cardDateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardDateLeft: { flexDirection: 'row', alignItems: 'center' },
    cardDate: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 12, fontWeight: '600',
        color: '#0A2E33', marginLeft: 5,
    },
    positionChip: {
        backgroundColor: '#EAF5F6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D4E9EC',
    },
    positionChipText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 10,
        fontWeight: '700',
        color: '#047282',
        letterSpacing: 0.4,
    },

    /* Product */
    productName: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        fontWeight: '700',
        color: '#0A2E33',
        lineHeight: 20,
        marginBottom: 10,
    },

    /* Client row */
    clientRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F7FAFB',
        borderRadius: 10,
        padding: 10,
    },
    clientIconChip: {
        width: 24,
        height: 24,
        borderRadius: 7,
        backgroundColor: '#E8F4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    clientName: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 12,
        fontWeight: '600',
        color: '#0A2E33',
    },
    clientOffice: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 10,
        color: '#8A9698',
        marginTop: 1,
    },

    /* Divider */
    cardDivider: {
        height: 1,
        backgroundColor: '#F2F5F6',
        marginVertical: 10,
    },

    /* Meta grid */
    metaGrid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaCell: {
        flex: 1,
        alignItems: 'center',
    },
    metaCellDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#F2F5F6',
    },
    metaCellLabel: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 10,
        color: '#6B7A7C',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
        marginBottom: 3,
    },
    metaCellValue: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        fontWeight: '700',
        color: '#0A2E33',
    },
    metaCellTotal: {
        color: '#047282',
        fontSize: 14,
    },

    /* Placeholder */
    placeholderWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    placeholderTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        fontWeight: '700',
        color: '#0A2E33',
        marginTop: 14,
    },
    placeholderSubtitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#8A9698',
        marginTop: 6,
        textAlign: 'center',
    },

    /* Empty state */
    emptyWrap: {
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 16, fontWeight: '700',
        color: '#0A2E33', marginTop: 14,
    },
    emptySubtitle: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 13,
        color: '#8A9698', marginTop: 6, textAlign: 'center',
    },

    /* Alert modal */
    alertBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(10,46,51,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    alertBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 22,
        width: '100%',
        maxWidth: 340,
    },
    alertText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14,
        color: '#0A2E33',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 18,
    },
    alertBtn: {
        height: 44,
        borderRadius: 12,
        backgroundColor: '#047282',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    /* Custom Calendar Modal */
    calendarBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(10,46,51,0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },

    calendarContainer: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
    },

    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },

    calendarTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 17,
        color: '#0A2E33',
    },

    calendarClose: {
        fontSize: 20,
        color: '#6B7A7C',
        paddingHorizontal: 5,
    },

    monthNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },

    monthArrow: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#EAF5F6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    monthArrowText: {
        fontSize: 25,
        color: '#047282',
        lineHeight: 28,
    },

    monthYearText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16,
        color: '#0A2E33',
    },

    weekDaysRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    weekDayText: {
        width: '14.2857%',
        textAlign: 'center',
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 11,
        color: '#8A9698',
    },

    calendarDaysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    calendarDayCell: {
        width: '14.2857%',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    calendarDayText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13,
        color: '#0A2E33',
    },

    selectedCalendarDay: {
        backgroundColor: '#047282',
    },

    selectedCalendarDayText: {
        color: '#FFFFFF',
        fontFamily: 'InstrumentSans-Bold',
        fontWeight: '700',
    },

    disabledCalendarDayText: {
        color: '#D0D7D8',
    },

    calendarCancelBtn: {
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EAF5F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },

    calendarCancelText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14,
        color: '#047282',
    },
});

export default ActivityReportScreen;