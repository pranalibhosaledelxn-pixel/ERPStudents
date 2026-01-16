import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon } from 'lucide-react-native';

export default function AttendanceScreen() {
    const insets = useSafeAreaInsets();

    const days = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        status: Math.random() > 0.8 ? 'absent' : 'present', // Mock data
        isWeekend: (i + 1) % 7 === 0 || (i + 1) % 7 === 6
    }));

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Attendance" showBack={false} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.summaryCard}>
                    <View style={styles.iconContainer}>
                        <CalendarIcon size={32} color="#4ECDC4" />
                    </View>
                    <Text style={styles.monthText}>September 2026</Text>
                    <Text style={styles.statsText}>24/26</Text>
                    <Text style={styles.presentText}>Present Days</Text>
                </View>

                <Text style={styles.sectionTitle}>Daily Log</Text>

                <View style={styles.calendarGrid}>
                    {days.map((item) => (
                        <View
                            key={item.day}
                            style={[
                                styles.dayBox,
                                item.isWeekend ? styles.weekendBox :
                                    item.status === 'present' ? styles.presentBox : styles.absentBox
                            ]}
                        >
                            <Text style={[
                                styles.dayText,
                                item.isWeekend ? styles.weekendText :
                                    item.status === 'present' ? styles.presentTextInner : styles.absentText
                            ]}>
                                {item.day}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.presentDot]} />
                        <Text style={styles.legendText}>Present</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, styles.absentDot]} />
                        <Text style={styles.legendText}>Absent</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 24,
    },
    iconContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#E0F8F6', // blue-50 approx
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    monthText: {
        color: '#6B7280',
        fontWeight: '500',
        marginBottom: 4,
    },
    statsText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1F2937',
        marginTop: 8,
    },
    presentText: {
        color: '#10B981', // success
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dayBox: {
        width: '13%',
        aspectRatio: 1,
        marginBottom: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekendBox: {
        backgroundColor: '#F3F4F6', // gray-100
    },
    presentBox: {
        backgroundColor: '#DCFCE7', // green-100
        borderWidth: 1,
        borderColor: '#BBF7D0', // green-200
    },
    absentBox: {
        backgroundColor: '#FEE2E2', // red-100
        borderWidth: 1,
        borderColor: '#FECACA', // red-200
    },
    dayText: {
        fontWeight: 'bold',
    },
    weekendText: {
        color: '#9CA3AF',
    },
    presentTextInner: {
        color: '#15803D', // green-700
    },
    absentText: {
        color: '#B91C1C', // red-700
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    legendDot: {
        width: 16,
        height: 16,
        borderRadius: 6,
        marginRight: 8,
    },
    presentDot: {
        backgroundColor: '#DCFCE7',
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    absentDot: {
        backgroundColor: '#FEE2E2',
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    legendText: {
        color: '#4B5563',
    }
});
