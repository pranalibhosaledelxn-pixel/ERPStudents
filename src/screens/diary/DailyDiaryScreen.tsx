import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Smile, Frown, Sun, Moon, Utensils, Activity, MessageSquare, Clock } from 'lucide-react-native';

const THEME = {
    background: '#F5F7FA',
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    orange: '#F59E0B',
    pink: '#F472B6',
    green: '#10B981',
};

export default function DailyDiaryScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState('Today');

    const timelineData = [
        {
            id: 1,
            time: '09:30 AM',
            title: 'Breakfast',
            category: 'Food',
            description: 'Ate all the poha. Drank full glass of milk.',
            icon: <Utensils size={18} color="white" />,
            color: THEME.orange,
            mood: 'Happy'
        },
        {
            id: 2,
            time: '11:00 AM',
            title: 'Activity Time',
            category: 'Play',
            description: 'Played with building blocks. Made a tall tower!',
            icon: <Activity size={18} color="white" />,
            color: THEME.indigo,
            mood: 'Excited'
        },
        {
            id: 3,
            time: '01:00 PM',
            title: 'Lunch',
            category: 'Food',
            description: 'Had roti and dal. Struggled a bit with veggies.',
            icon: <Utensils size={18} color="white" />,
            color: THEME.orange,
            mood: 'Normal'
        },
        {
            id: 4,
            time: '02:00 PM',
            title: 'Nap Time',
            category: 'Sleep',
            description: 'Slept for 45 mins. Woke up fresh.',
            icon: <Moon size={18} color="white" />,
            color: THEME.purple,
            mood: 'Sleepy'
        },
        {
            id: 5,
            time: '03:30 PM',
            title: 'Teacher Note',
            category: 'Note',
            description: 'Aarav was very helpful today. He helped clean up the play area.',
            icon: <MessageSquare size={18} color="white" />,
            color: THEME.teal,
            mood: 'Proud'
        }
    ];

    const DatePill = ({ label, active }: { label: string, active?: boolean }) => (
        <TouchableOpacity 
            onPress={() => setSelectedDate(label)}
            style={[
                styles.datePill, 
                active ? styles.datePillActive : styles.datePillInactive
            ]}
        >
            <Text style={[
                styles.dateText, 
                active ? styles.dateTextActive : styles.dateTextInactive
            ]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Daily Diary</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Date Selector */}
                <View style={styles.dateSelector}>
                    <DatePill label="Today" active={selectedDate === 'Today'} />
                    <DatePill label="Yesterday" active={selectedDate === 'Yesterday'} />
                    <DatePill label="14 Jan" active={selectedDate === '14 Jan'} />
                </View>

                {/* Mood Summary Card */}
                <View style={styles.moodCard}>
                    <Text style={styles.moodTitle}>Today's Mood</Text>
                    <View style={styles.moodContainer}>
                        <View style={styles.moodItem}>
                            <View style={[styles.moodIcon, { backgroundColor: '#ECFDF5' }]}>
                                <Smile size={32} color={THEME.green} />
                            </View>
                            <Text style={styles.moodLabel}>Happy</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>4h</Text>
                            <Text style={styles.statLabel}>Activity</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>45m</Text>
                            <Text style={styles.statLabel}>Nap</Text>
                        </View>
                    </View>
                </View>

                {/* Timeline */}
                <Text style={styles.sectionTitle}>Timeline</Text>
                <View style={styles.timelineContainer}>
                    {/* Vertical Line */}
                    <View style={styles.timelineLine} />

                    {timelineData.map((item, index) => (
                        <View key={item.id} style={styles.timelineItem}>
                            <View style={styles.timeColumn}>
                                <Text style={styles.timeText}>{item.time}</Text>
                            </View>
                            
                            <View style={styles.timelineDotContainer}>
                                <View style={[styles.timelineDot, { backgroundColor: item.color }]}>
                                    {item.icon}
                                </View>
                            </View>

                            <View style={styles.cardContainer}>
                                <View style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <Text style={[styles.cardTitle, { color: item.color }]}>{item.title}</Text>
                                        <Text style={styles.moodTag}>{item.mood}</Text>
                                    </View>
                                    <Text style={styles.cardDescription}>{item.description}</Text>
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
        backgroundColor: THEME.background,
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
    dateSelector: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    datePill: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    datePillActive: {
        backgroundColor: THEME.textMain,
        borderColor: THEME.textMain,
    },
    datePillInactive: {
        backgroundColor: 'transparent',
        borderColor: '#E5E7EB',
    },
    dateText: {
        fontWeight: '600',
        fontSize: 14,
    },
    dateTextActive: {
        color: 'white',
    },
    dateTextInactive: {
        color: THEME.textSub,
    },
    moodCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    moodTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textSub,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    moodIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moodLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    verticalDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#F3F4F6',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    statLabel: {
        fontSize: 12,
        color: THEME.textSub,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    timelineContainer: {
        paddingHorizontal: 20,
        position: 'relative',
    },
    timelineLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 20 + 64 + 11, // padding + timeWidth + half of line gap? roughly aligning
        width: 2,
        backgroundColor: '#E5E7EB',
        borderRadius: 1,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    timeColumn: {
        width: 64,
        paddingTop: 12,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.textSub,
    },
    timelineDotContainer: {
        width: 24,
        alignItems: 'center',
        marginRight: 16,
        zIndex: 1,
    },
    timelineDot: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: THEME.background, // creates a gap effect
    },
    cardContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    moodTag: {
        fontSize: 11,
        fontWeight: '600',
        color: THEME.textSub,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    cardDescription: {
        fontSize: 13,
        color: '#4B5563',
        lineHeight: 18,
    },
});
