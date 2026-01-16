import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Clock, User, MapPin, ChevronLeft, Calendar } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Theme Constants (Wellness Blend)
const THEME = {
    background: '#F5F7FA',
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    red: '#EF4444',
    orange: '#F59E0B',
};

export default function TimetableScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState('Mon');

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const schedule: Record<string, { startTime: string; endTime: string; subject: string; teacher: string; room: string; color: string; status: 'completed' | 'current' | 'upcoming' }[]> = {
        'Mon': [
            { startTime: '08:00', endTime: '08:45', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', color: THEME.purple, status: 'completed' },
            { startTime: '09:00', endTime: '09:45', subject: 'English', teacher: 'Ms. Verma', room: 'Room 102', color: THEME.teal, status: 'current' },
            { startTime: '10:00', endTime: '10:45', subject: 'Science', teacher: 'Mr. Gupta', room: 'Lab 2', color: THEME.indigo, status: 'upcoming' },
            { startTime: '11:15', endTime: '12:00', subject: 'History', teacher: 'Ms. Singh', room: 'Room 104', color: THEME.orange, status: 'upcoming' },
        ],
        'Tue': [
            { startTime: '09:00', endTime: '09:45', subject: 'English', teacher: 'Ms. Verma', room: 'Room 102', color: THEME.teal, status: 'upcoming' },
            { startTime: '10:00', endTime: '10:45', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', color: THEME.purple, status: 'upcoming' },
        ],
        'default': [
            { startTime: '09:00', endTime: '09:45', subject: 'Sports', teacher: 'Coach Khan', room: 'Ground', color: THEME.red, status: 'upcoming' },
        ]
    };

    const currentSchedule = schedule[selectedDay] || schedule['default'];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Class Timetable</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Day Selector */}
            <View style={styles.daySelectorContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelectorContent}>
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[styles.dayChip, selectedDay === day && styles.dayChipActive]}
                            onPress={() => setSelectedDay(day)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Timeline Layout */}
                <View style={styles.timelineContainer}>
                    {/* Vertical Line */}
                    <View style={styles.timelineLine} />

                    {currentSchedule.map((item, index) => (
                        <View key={index} style={styles.timelineItem}>
                            {/* Time Column */}
                            <View style={styles.timeColumn}>
                                <Text style={styles.startTime}>{item.startTime}</Text>
                                <Text style={styles.endTime}>{item.endTime}</Text>
                            </View>

                            {/* Timeline Dot/Connector */}
                            <View style={styles.connector}>
                                <View style={[styles.dot, { backgroundColor: item.status === 'current' ? THEME.teal : '#E5E7EB', borderColor: item.status === 'current' ? '#CCFBF1' : 'white', borderWidth: item.status === 'current' ? 4 : 2 }]} />
                            </View>

                            {/* Card Content */}
                            <View style={[
                                styles.card,
                                item.status === 'current' && styles.cardActive,
                                { borderLeftColor: item.color }
                            ]}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.subjectTag, { backgroundColor: item.color + '15' }]}>
                                        <Text style={[styles.subjectText, { color: item.color }]}>{item.subject}</Text>
                                    </View>
                                    {item.status === 'current' && (
                                        <View style={styles.liveBadge}>
                                            <Text style={styles.liveText}>NOW</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.cardDetails}>
                                    <View style={styles.detailRow}>
                                        <User size={14} color={THEME.textSub} />
                                        <Text style={styles.detailText}>{item.teacher}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <MapPin size={14} color={THEME.textSub} />
                                        <Text style={styles.detailText}>{item.room}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    daySelectorContainer: {
        marginBottom: 16,
    },
    daySelectorContent: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    dayChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        backgroundColor: 'white',
        marginRight: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    dayChipActive: {
        backgroundColor: THEME.teal,
        transform: [{ scale: 1.05 }],
    },
    dayText: {
        fontWeight: '600',
        color: THEME.textSub,
    },
    dayTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    timelineContainer: {
        position: 'relative',
        paddingLeft: 0,
    },
    timelineLine: {
        position: 'absolute',
        left: 60, // Align with dot center
        top: 20,
        bottom: 20,
        width: 2,
        backgroundColor: '#E5E7EB',
        zIndex: 0,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timeColumn: {
        width: 50,
        alignItems: 'flex-end',
        marginRight: 20,
        paddingTop: 4,
    },
    startTime: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    endTime: {
        fontSize: 12,
        color: THEME.textSub,
        marginTop: 2,
    },
    connector: {
        width: 20,
        alignItems: 'center',
        marginRight: 12,
        position: 'absolute', // Absolute position to align perfectly with line
        left: 50, // width of timeColumn + margin
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginTop: 6,
        zIndex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
        borderLeftWidth: 4,
        marginLeft: 40, // Space for time and line
    },
    cardActive: {
        shadowColor: THEME.teal,
        shadowOpacity: 0.2,
        elevation: 6,
        transform: [{ scale: 1.02 }],
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    subjectTag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    subjectText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    liveBadge: {
        backgroundColor: THEME.red,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    liveText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 13,
        color: THEME.textSub,
        marginLeft: 6,
        fontWeight: '500',
    },
});
