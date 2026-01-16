import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Calendar, AlertCircle, Info, Clock, Pin } from 'lucide-react-native';

const THEME = {
    bg: '#F8FAFC',
    textMain: '#1E293B',
    textSub: '#64748B',
    card: '#FFFFFF',
    border: '#E2E8F0',
    primary: '#0F766E', // Teal
    secondary: '#7C3AED', // Purple
    urgent: '#E11D48', // Rose
};

export default function NoticeBoardScreen() {
    const insets = useSafeAreaInsets();

    const notices = [
        {
            id: 1,
            title: 'Independence Day Celebration',
            day: '14',
            month: 'Aug',
            type: 'Event',
            message: 'All students are requested to wear traditional dress tomorrow for the flag hoisting ceremony.',
            urgent: false
        },
        {
            id: 2,
            title: 'School Holiday',
            day: '10',
            month: 'Aug',
            type: 'Holiday',
            message: 'School will remain closed on account of heavy rain forecast in the district.',
            urgent: true
        },
        {
            id: 3,
            title: 'Parent Teacher Meeting',
            day: '05',
            month: 'Aug',
            type: 'Meeting',
            message: 'PTM for Sr. KG will be held on Saturday. Slots have been mailed to parents.',
            urgent: false
        },
        {
            id: 4,
            title: 'Exam Schedule Released',
            day: '01',
            month: 'Aug',
            type: 'Academic',
            message: 'The mid-term examination schedule for classes 5-10 has been published.',
            urgent: false
        },
    ];

    const getIcon = (type: string, size = 16) => {
        if (type === 'Holiday') return <AlertCircle size={size} color={THEME.urgent} />;
        if (type === 'Event') return <Calendar size={size} color={THEME.secondary} />;
        return <Info size={size} color={THEME.primary} />;
    };

    const getTypeColor = (type: string, urgent?: boolean) => {
        if (urgent) return { bg: '#FFF1F2', text: THEME.urgent };
        if (type === 'Event') return { bg: '#F5F3FF', text: THEME.secondary };
        return { bg: '#CCFBF1', text: THEME.primary };
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Notice Board" showBack={true} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Pinned/Important Header (Optional) - skipped for list focus */}

                {notices.map((item) => {
                    const typeStyle = getTypeColor(item.type, item.urgent);

                    return (
                        <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
                            {/* Date Badge */}
                            <View style={styles.dateBadge}>
                                <Text style={styles.monthText}>{item.month}</Text>
                                <Text style={styles.dayText}>{item.day}</Text>
                            </View>

                            {/* Content */}
                            <View style={styles.contentContainer}>
                                <View style={styles.headerRow}>
                                    <View style={[styles.typePill, { backgroundColor: typeStyle.bg }]}>
                                        {getIcon(item.type, 12)}
                                        <Text style={[styles.typeText, { color: typeStyle.text }]}>{item.type}</Text>
                                    </View>
                                    {item.urgent && <Pin size={14} color={THEME.urgent} style={{ transform: [{ rotate: '45deg' }] }} />}
                                </View>

                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.message} numberOfLines={3}>{item.message}</Text>

                                <View style={styles.footerRow}>
                                    <Clock size={12} color={THEME.textSub} />
                                    <Text style={styles.timeText}>Posted 10:30 AM</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
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
        padding: 20,
    },
    card: {
        backgroundColor: THEME.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: THEME.border,
    },
    dateBadge: {
        width: 50,
        height: 56,
        backgroundColor: '#F1F5F9', // slate-100
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    monthText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: THEME.textSub,
        marginBottom: 2,
    },
    dayText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 6,
    },
    typeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 6,
    },
    message: {
        fontSize: 13,
        color: '#475569',
        lineHeight: 18,
        marginBottom: 10,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 11,
        color: THEME.textSub,
    }
});
