import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

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

export default function EventsScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Mock Events
    const events = [
        { id: 1, day: 20, month: 'Jan', title: 'Fancy Dress Competition', time: '09:00 AM', location: 'School Auditorium', type: 'Activity', color: THEME.purple },
        { id: 2, day: 26, month: 'Jan', title: 'Republic Day Celebration', time: '08:00 AM', location: 'School Ground', type: 'Holiday', color: THEME.orange },
        { id: 3, day: 5, month: 'Feb', title: 'Annual Sports Day', time: '09:00 AM', location: 'Sports Complex', type: 'Sports', color: THEME.teal },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>School Events</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Month Navigator */}
                <View style={styles.monthNav}>
                    <TouchableOpacity>
                        <ChevronLeft size={20} color={THEME.textSub} />
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>January 2026</Text>
                    <TouchableOpacity>
                        <ChevronRight size={20} color={THEME.textMain} />
                    </TouchableOpacity>
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarCard}>
                    {/* Week Header */}
                    <View style={styles.weekRow}>
                        {weekDays.map((d, i) => (
                            <Text key={i} style={styles.weekDayText}>{d}</Text>
                        ))}
                    </View>

                    {/* Days Grid */}
                    <View style={styles.daysGrid}>
                        {/* Empty slots for start of month (e.g., Wed start) */}
                        {[1, 2, 3].map((_, i) => <View key={`empty-${i}`} style={styles.dayCell} />)}

                        {days.map((day) => {
                            const hasEvent = events.find(e => e.day === day && e.month === 'Jan');
                            const isToday = day === 16;

                            return (
                                <View key={day} style={styles.dayCell}>
                                    <TouchableOpacity
                                        style={[
                                            styles.dayBubble,
                                            isToday && styles.dayBubbleToday,
                                            hasEvent && { borderColor: hasEvent.color, borderWidth: 1 }
                                        ]}
                                    >
                                        <Text style={[styles.dayText, isToday && styles.dayTextToday]}>{day}</Text>
                                        {hasEvent && <View style={[styles.eventDot, { backgroundColor: hasEvent.color }]} />}
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Upcoming Events List */}
                <Text style={styles.sectionTitle}>Upcoming Events</Text>

                {events.map((event) => (
                    <View key={event.id} style={[styles.eventCard, { borderLeftColor: event.color }]}>
                        <View style={styles.dateBox}>
                            <Text style={styles.dateNum}>{event.day}</Text>
                            <Text style={styles.dateMonth}>{event.month}</Text>
                        </View>

                        <View style={styles.eventInfo}>
                            <View style={[styles.typeBadge, { backgroundColor: event.color + '15' }]}>
                                <Text style={[styles.typeText, { color: event.color }]}>{event.type}</Text>
                            </View>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <View style={styles.metaRow}>
                                <Clock size={12} color={THEME.textSub} />
                                <Text style={styles.metaText}>{event.time}</Text>
                                <View style={{ width: 8 }} />
                                <MapPin size={12} color={THEME.textSub} />
                                <Text style={styles.metaText}>{event.location}</Text>
                            </View>
                        </View>
                    </View>
                ))}

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
    scrollContent: {
        paddingBottom: 40,
    },
    monthNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    calendarCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    weekDayText: {
        width: 32,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: THEME.textSub,
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dayCell: {
        width: '14.28%', // 100/7
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    dayBubble: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    dayBubbleToday: {
        backgroundColor: THEME.textMain,
    },
    dayText: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textMain,
    },
    dayTextToday: {
        color: 'white',
    },
    eventDot: {
        position: 'absolute',
        bottom: 4,
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginHorizontal: 20,
        marginBottom: 16,
    },
    eventCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
        borderLeftWidth: 4,
    },
    dateBox: {
        alignItems: 'center',
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: '#F3F4F6',
        marginRight: 16,
        minWidth: 50,
    },
    dateNum: {
        fontSize: 20,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    dateMonth: {
        fontSize: 12,
        color: THEME.textSub,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    eventInfo: {
        flex: 1,
    },
    typeBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 6,
    },
    typeText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 6,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: 11,
        color: THEME.textSub,
        marginLeft: 4,
    },
});
