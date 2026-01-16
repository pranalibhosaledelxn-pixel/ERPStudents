import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Check, X, Minus } from 'lucide-react-native';
import { ScreenHeader } from '../../components/ScreenHeader';

const { width } = Dimensions.get('window');

const THEME = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    textMain: '#1E293B',
    textSub: '#64748B',
    border: '#E2E8F0',
    present: '#10B981', // Green
    absent: '#EF4444',  // Red
    holiday: '#F59E0B', // Amber
    weekend: '#E2E8F0', // Gray
};

export default function AttendanceScreen() {
    const insets = useSafeAreaInsets();
    const [currentMonth, setCurrentMonth] = useState('September 2026');

    // Calendar Generation
    const startOffset = 2; // Tue
    const daysInMonth = 30;
    const days = [];

    // Empty slots
    for (let i = 0; i < startOffset; i++) days.push({ id: `e-${i}`, empty: true });

    // Days with Mock Status
    for (let i = 1; i <= daysInMonth; i++) {
        const dayIdx = (i + startOffset - 1) % 7;
        let status = 'present';

        if (dayIdx === 0 || dayIdx === 6) status = 'weekend';
        else if ([4, 18, 25].includes(i)) status = 'absent';
        else if ([15].includes(i)) status = 'holiday';

        days.push({ id: i, day: i, status, empty: false });
    }

    const StatItem = ({ label, value, color, bg }: any) => (
        <View style={[styles.statItem, { backgroundColor: bg }]}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Attendance" showBack={true} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Stats Row */}
                <View style={styles.statsContainer}>
                    <StatItem label="Present" value="22" color={THEME.present} bg="#ECFDF5" />
                    <StatItem label="Absent" value="03" color={THEME.absent} bg="#FEF2F2" />
                    <StatItem label="Holidays" value="01" color={THEME.holiday} bg="#FFFBEB" />
                    <StatItem label="Working" value="26" color={THEME.textMain} bg="#F1F5F9" />
                </View>

                {/* Calendar Card */}
                <View style={styles.calendarCard}>
                    {/* Header */}
                    <View style={styles.calHeader}>
                        <TouchableOpacity style={styles.navBtn}>
                            <ChevronLeft size={20} color={THEME.textMain} />
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>{currentMonth}</Text>
                        <TouchableOpacity style={styles.navBtn}>
                            <ChevronRight size={20} color={THEME.textMain} />
                        </TouchableOpacity>
                    </View>

                    {/* Week Days */}
                    <View style={styles.weekRow}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <Text key={i} style={[styles.weekText, (i === 0 || i === 6) && { color: '#EF4444' }]}>{d}</Text>
                        ))}
                    </View>

                    {/* Days Grid */}
                    <View style={styles.grid}>
                        {days.map((item) => {
                            if (item.empty) return <View key={item.id} style={styles.dayCell} />;

                            return (
                                <View key={item.id} style={styles.dayCell}>
                                    <View style={[
                                        styles.dayCircle,
                                        item.status === 'present' && { backgroundColor: '#ECFDF5' },
                                        item.status === 'absent' && { backgroundColor: '#FEF2F2' },
                                        item.status === 'holiday' && { backgroundColor: '#FFFBEB' },
                                        item.status === 'weekend' && { backgroundColor: 'transparent' },
                                        item.day === 24 && { borderColor: THEME.textMain, borderWidth: 1 } // Today
                                    ]}>
                                        <Text style={[
                                            styles.dayNum,
                                            item.status === 'present' && { color: THEME.present },
                                            item.status === 'absent' && { color: THEME.absent },
                                            item.status === 'holiday' && { color: THEME.holiday },
                                            item.status === 'weekend' && { color: '#CBD5E1' }
                                        ]}>{item.day}</Text>

                                        {/* Status Dot */}
                                        {item.status !== 'weekend' && (
                                            <View style={[
                                                styles.dot,
                                                item.status === 'present' && { backgroundColor: THEME.present },
                                                item.status === 'absent' && { backgroundColor: THEME.absent },
                                                item.status === 'holiday' && { backgroundColor: THEME.holiday },
                                            ]} />
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {/* Simple Legend */}
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: THEME.present }]} />
                            <Text style={styles.legendText}>Present</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: THEME.absent }]} />
                            <Text style={styles.legendText}>Absent</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: THEME.holiday }]} />
                            <Text style={styles.legendText}>Holiday</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.bg,
    },
    scrollContent: {
        padding: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12,
    },
    statItem: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 11,
        color: THEME.textSub,
        fontWeight: '500',
    },

    // Calendar
    calendarCard: {
        backgroundColor: THEME.card,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: THEME.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    calHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    navBtn: {
        padding: 8,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
    monthTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.textMain,
    },
    weekRow: {
        flexDirection: 'row',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingBottom: 8,
    },
    weekText: {
        width: '14.28%',
        textAlign: 'center',
        fontSize: 12,
        color: THEME.textSub,
        fontWeight: '600',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    dayCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    dayNum: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.textMain,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        position: 'absolute',
        bottom: 4,
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 12,
        color: THEME.textSub,
    }
});
