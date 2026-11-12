import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Platform,
    Image,
    TextInput,
    Modal,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import API from '../../util/API';

/* ------- Sample disbursement data (replace with API) ------- */


const EARNINGS_TRANSLATIONS = {
    English: {
        title: 'My Earnings',
        totalEarned: 'Total Earned',
        paymentHistory: 'Payment History',
        noEarnings: 'No earnings yet',
        emptyMessage: 'Your disbursements will appear here',
        startDate: 'Start Date',
        endDate: 'End Date',
        show: 'Show',
        enterStart: 'YYYY-MM-DD',
        enterEnd: 'YYYY-MM-DD',
        dateRequired: 'Please select both dates',
        invalidRange: 'Start date must be before end date',
        ok: 'OK',
        disbursementAmount: 'Payment Amount',
        transactionMode: 'Transaction Mode',
        disbursementDate: 'Payment Date',
        transactions: 'Transactions',
    },
    Hindi: {
        title: 'मेरी कमाई',
        totalEarned: 'कुल कमाई',
        paymentHistory: 'भुगतान इतिहास',
        noEarnings: 'अभी तक कोई कमाई नहीं',
        emptyMessage: 'आपके भुगतान यहाँ दिखाई देंगे',
        startDate: 'शुरू होने की तिथि',
        endDate: 'समाप्ति तिथि',
        show: 'दिखाएँ',
        enterStart: 'YYYY-MM-DD',
        enterEnd: 'YYYY-MM-DD',
        dateRequired: 'कृपया दोनों तिथियाँ दर्ज करें',
        invalidRange: 'प्रारंभ तिथि समाप्ति से पहले होनी चाहिए',
        ok: 'ठीक है',
        disbursementAmount: 'भुगतान राशि',
        transactionMode: 'लेन-देन का तरीका',
        disbursementDate: 'भुगतान तिथि',
        transactions: 'लेन-देन',
    },
    Bengali: {
        title: 'আমার উপার্জন',
        totalEarned: 'মোট উপার্জন',
        paymentHistory: 'পেমেন্টের ইতিহাস',
        noEarnings: 'এখনও কোনো উপার্জন নেই',
        emptyMessage: 'আপনার পেমেন্ট এখানে দেখা যাবে',
        startDate: 'শুরুর তারিখ',
        endDate: 'শেষ তারিখ',
        show: 'দেখান',
        enterStart: 'YYYY-MM-DD',
        enterEnd: 'YYYY-MM-DD',
        dateRequired: 'অনুগ্রহ করে উভয় তারিখ দিন',
        invalidRange: 'শুরুর তারিখ শেষের আগে হতে হবে',
        ok: 'ঠিক আছে',
        disbursementAmount: 'অর্থপ্রদানের পরিমাণ',
        transactionMode: 'লেনদেনের ধরন',
        disbursementDate: 'পরিশোধের তারিখ',
        transactions: 'লেনদেন',
    },
};

/* Format ISO date to DD MMM YYYY */
const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

/* Format ISO to HH:MM AM/PM */
const formatTime = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
};

const MyEarningsScreen = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const [showStartDateModal, setShowStartDateModal] = useState(false);
    const [showEndDateModal, setShowEndDateModal] = useState(false);

    const [calendarMonth, setCalendarMonth] = useState(new Date());
    const [activeDateField, setActiveDateField] = useState('start');

    const [showData, setShowData] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [disbursementsData, setDisbursementsData] = useState([]);
    const [loading, setLoading] = useState(false);


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


    const t = (key) =>
        EARNINGS_TRANSLATIONS[selectedLanguage]?.[key] ??
        EARNINGS_TRANSLATIONS.English[key] ??
        key;

    /* Filter data by selected date range */
    const filteredData = showData
        ? disbursementsData.filter((item) => {
            if (!startDate || !endDate) return true;

            const transactionDate = new Date(item.Disbursement_Date).getTime();
            const start = new Date(`${startDate}T00:00:00`).getTime();
            const end = new Date(`${endDate}T00:00:00`).getTime();

            return transactionDate >= start &&
                transactionDate <= end + 86399999;
        })
        : [];

    const totalEarned = filteredData.reduce(
        (sum, item) => sum + (Number(item.DisbursementAmount) || 0),
        0
    );

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (savedLanguage && EARNINGS_TRANSLATIONS[savedLanguage]) {
                    setSelectedLanguage(savedLanguage);
                }
            } catch (error) {
                console.log('Error loading language:', error);
            }
        };
        fetchDisbursements();
        loadLanguage();
    }, []);



    const fetchDisbursements = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem('accessToken');
            const payrollCode = await AsyncStorage.getItem('workerPayrollCode');

            if (!token || !payrollCode) {
                setDisbursementsData([]);
                setShowData(false);
                setAlertMessage('Login token or worker payroll code not found.');
                setAlertVisible(true);
                return;
            }

            const payload = {
                Op: 2,
                Worker_PayrollCode: payrollCode,
                FromDate: startDate,
                ToDate: endDate,
                Sl: '',
            };

            const response = await axios.post(
                API.WORKER_DETAILS,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    timeout: 30000,
                }
            );
            console.log('Disbursement API Response:', response.data);

            if (response.data?.Status === true) {
                const apiData = response.data.Data;

                const records = Array.isArray(apiData)
                    ? apiData
                    : apiData
                        ? [apiData]
                        : [];

                const mappedData = records.map((item, index) => ({
                    ...item,
                    id: String(item.DisPaymentMasterId || index + 1),
                    DisbursementAmount: Number(item.DisbursementAmount) || 0,
                }));

                setDisbursementsData(mappedData);
                setShowData(true);
            } else {
                setDisbursementsData([]);
                setShowData(true);
                setAlertMessage(
                    response.data?.Message || 'Unable to fetch payment details.'
                );
                setAlertVisible(true);
            }

        } catch (error) {
            console.log(
                'Disbursement API Error:',
                error.response?.data || error.message
            );

            setDisbursementsData([]);
            setShowData(false);

            setAlertMessage(
                error.response?.data?.Message ||
                'Something went wrong while fetching payment details.'
            );
            setAlertVisible(true);

        } finally {
            setLoading(false);
        }
    };

    const handleShow = () => {
        if (!startDate || !endDate) {
            setAlertMessage(t('dateRequired'));
            setAlertVisible(true);
            return;
        }

        const s = new Date(`${startDate}T00:00:00`).getTime();
        const e = new Date(`${endDate}T00:00:00`).getTime();

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

        fetchDisbursements();
    };

    /* ---------- Mode icon meta ---------- */
    const getModeMeta = (mode) => {
        const m = (mode || '').toLowerCase();
        if (m.includes('bank')) return { bg: '#E8F4FF', color: '#2C7BE5' };
        if (m.includes('upi')) return { bg: '#F0EDFF', color: '#7B5CFF' };
        if (m.includes('cash')) return { bg: '#E4F9EC', color: '#22A06B' };
        if (m.includes('cheque')) return { bg: '#FFF4E5', color: '#F5A623' };
        return { bg: '#F2F9FA', color: '#6B7A7C' };
    };

    /* ---------- Card renderer ---------- */
    const renderItem = ({ item }) => {
        const modeMeta = getModeMeta(item.Transaction_Mode);
        return (
            <View style={styles.card}>
                {/* Header: Mode chip + Amount */}
                <View style={styles.cardHeaderRow}>
                    <View style={[styles.modeChip, { backgroundColor: modeMeta.bg }]}>
                        <Image
                            source={require('../../assets/bank.png')}
                            style={{
                                width: 11,
                                height: 11,
                                tintColor: modeMeta.color,
                                marginRight: 4,
                            }}
                            resizeMode="contain"
                        />
                        <Text style={[styles.modeChipText, { color: modeMeta.color }]}>
                            {item.Transaction_Mode || '—'}
                        </Text>
                    </View>

                    <Text style={styles.amountValue}>
                        ₹ {Number(item.DisbursementAmount || 0).toLocaleString()}
                    </Text>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('disbursementAmount')}</Text>
                    <Text style={[styles.detailValue, styles.detailAmount]}>
                        ₹ {Number(item.DisbursementAmount || 0).toFixed(2)}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('transactionMode')}</Text>
                    <Text style={styles.detailValue}>{item.Transaction_Mode || '—'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{t('disbursementDate')}</Text>
                    <Text style={styles.detailValue}>
                        {formatDate(item.Disbursement_Date)}
                    </Text>
                </View>

                <View style={styles.utrDetailsContainer}>
                    <Text style={styles.detailLabel}>UTR Details</Text>

                    <Text style={styles.utrDetailsValue}>
                        {String(item.UTR_Data || '—').trim()}
                    </Text>
                </View>

                {/* Time */}
                <View style={styles.timeRow}>
                    <View style={styles.timeDot} />
                    <Text style={styles.timeText}>{formatTime(item.Disbursement_Date)}</Text>
                </View>
            </View>
        );
    };

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

                {/* Date filter */}
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

                {/* Summary card — only after show with data */}
                {showData && filteredData.length > 0 && (
                    <View style={styles.summaryCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.summaryLabel}>{t('totalEarned')}</Text>
                            <Text style={styles.summaryValue}>
                                ₹ {totalEarned.toLocaleString()}
                            </Text>
                            <Text style={styles.summarySub}>
                                {filteredData.length} {t('transactions')}
                            </Text>
                        </View>

                        <View style={styles.summaryIconWrap}>
                            <Image
                                source={require('../../assets/wallet.png')}
                                style={{ height: 32, width: 32, tintColor: '#FEA92F' }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                )}
            </View>

            {/* ============ CONTENT ============ */}
            {showData ? (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        filteredData.length > 0 ? (
                            <Text style={styles.sectionLabel}>{t('paymentHistory')}</Text>
                        ) : null
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyWrap}>
                            <Image
                                source={require('../../assets/wallet.png')}
                                style={{ height: 52, width: 52, tintColor: '#D4E9EC' }}
                                resizeMode="contain"
                            />
                            <Text style={styles.emptyTitle}>{t('noEarnings')}</Text>
                            <Text style={styles.emptySubtitle}>{t('emptyMessage')}</Text>
                        </View>
                    }
                />
            ) : (
                <View style={styles.placeholderWrap}>
                    <Image
                        source={require('../../assets/wallet.png')}
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
                            <Text style={styles.alertBtnText}>{t('ok')}</Text>
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


            {loading && (
                <View style={styles.loaderOverlay}>
                    <View style={styles.loaderBox}>
                        <ActivityIndicator size="large" color="#047282" />
                        <Text style={styles.loaderText}>
                            Loading payment details...
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F9FA' },

    /* Header */
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

    /* Filter */
    filterCard: {
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        marginBottom: 14,
    },
    filterRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
    filterInputWrap: { flex: 1 },
    filterLabel: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 10, fontWeight: '700',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: 0.4, textTransform: 'uppercase',
        marginBottom: 5,
    },
    filterInputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 10, paddingHorizontal: 10, height: 40,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    filterInput: {
        flex: 1,
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13, color: '#FFFFFF', paddingVertical: 0,
    },
    showBtn: {
        flexDirection: 'row', height: 44, borderRadius: 12,
        backgroundColor: '#FEA92F',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#FEA92F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4, shadowRadius: 10, elevation: 5,
    },
    showBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 15, fontWeight: '700',
        color: '#047282', letterSpacing: 0.3,
    },

    /* Summary */
    summaryCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 18, paddingVertical: 18, paddingHorizontal: 18,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    summaryLabel: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 12,
        color: 'rgba(255,255,255,0.78)',
        letterSpacing: 0.3, textTransform: 'uppercase',
    },
    summaryValue: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 30, fontWeight: '700',
        color: '#FFFFFF', letterSpacing: -0.6, marginTop: 4,
    },
    summarySub: {
        fontFamily: 'InstrumentSans-Regular', fontSize: 11,
        color: 'rgba(255,255,255,0.7)', marginTop: 3,
    },
    summaryIconWrap: {
        width: 56, height: 56, borderRadius: 18,
        backgroundColor: 'rgba(254,169,47,0.18)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(254,169,47,0.3)',
    },

    /* List */
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 30,
    },
    sectionLabel: {
        fontFamily: 'InstrumentSans-Bold', fontSize: 13, fontWeight: '700',
        color: '#0A2E33', letterSpacing: -0.2, marginBottom: 12,
    },

    /* Card */
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#047282',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
    },
    cardHeaderRow: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    modeChip: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 10, paddingVertical: 5,
        borderRadius: 10,
    },
    modeChipText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 11, fontWeight: '700',
        letterSpacing: 0.3,
    },
    amountValue: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 18, fontWeight: '700',
        color: '#047282',
        letterSpacing: -0.3,
    },
    cardDivider: {
        height: 1, backgroundColor: '#F2F5F6',
        marginBottom: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    detailLabel: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#6B7A7C',
        flex: 1,
    },
    detailValue: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13, fontWeight: '600',
        color: '#0A2E33',
        textAlign: 'right',
        flexShrink: 1,
        marginLeft: 12,
    },
    detailAmount: {
        color: '#047282',
        fontSize: 14,
    },

    /* Time chip */
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F2F5F6',
    },
    timeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22C55E',
        marginRight: 6,
    },
    timeText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 11,
        color: '#8A9698',
    },

    /* Placeholder */
    placeholderWrap: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        paddingHorizontal: 40,
    },
    placeholderTitle: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 16, fontWeight: '700',
        color: '#0A2E33', marginTop: 14,
    },
    placeholderSubtitle: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 13, color: '#8A9698',
        marginTop: 6, textAlign: 'center',
    },

    /* Empty */
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

    /* Alert */
    alertBackdrop: {
        flex: 1, backgroundColor: 'rgba(10,46,51,0.6)',
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 30,
    },
    alertBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18, padding: 22,
        width: '100%', maxWidth: 340,
    },
    alertText: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 14, color: '#0A2E33',
        textAlign: 'center', lineHeight: 20,
        marginBottom: 18,
    },
    alertBtn: {
        height: 44, borderRadius: 12,
        backgroundColor: '#047282',
        justifyContent: 'center', alignItems: 'center',
    },
    alertBtnText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 14, fontWeight: '700', color: '#FFFFFF',
    },

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

    loaderOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10,46,51,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 20,
    },

    loaderBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 24,
        alignItems: 'center',
        minWidth: 160,
    },

    loaderText: {
        fontFamily: 'InstrumentSans-Bold',
        fontSize: 13,
        color: '#0A2E33',
        marginTop: 12,
    },
    utrDetailsContainer: {
        paddingVertical: 8,
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: '#F2F5F6',
    },

    utrDetailsValue: {
        fontFamily: 'InstrumentSans-Regular',
        fontSize: 12,
        color: '#0A2E33',
        lineHeight: 19,
        marginTop: 6,
        textAlign: 'left',
    },
});

export default MyEarningsScreen;