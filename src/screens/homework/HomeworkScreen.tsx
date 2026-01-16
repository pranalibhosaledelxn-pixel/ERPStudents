import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, Eye, ChevronLeft, Calendar, CheckCircle, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '../../components/ScreenHeader'; // Or Custom header to match others

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
    green: '#10B981',
};

export default function HomeworkScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [filter, setFilter] = useState('All');

    const homeworks = [
        { id: 1, subject: 'Mathematics', title: 'Calculus Problems: Ex 1.2', date: '20 Jan', status: 'Pending', color: THEME.purple },
        { id: 2, subject: 'English', title: 'Essay: Summer Vacation', date: '18 Jan', status: 'Submitted', color: THEME.teal },
        { id: 3, subject: 'Science', title: 'Lab Report: Photosynthesis', date: '15 Jan', status: 'Submitted', color: THEME.indigo },
        { id: 4, subject: 'History', title: 'Read Chapter 4', date: '21 Jan', status: 'Pending', color: THEME.orange },
    ];

    const FilterChip = ({ label }: { label: string }) => (
        <TouchableOpacity
            onPress={() => setFilter(label)}
            style={[
                styles.filterChip,
                filter === label ? styles.filterChipActive : styles.filterChipInactive
            ]}
            activeOpacity={0.8}
        >
            <Text style={[
                styles.filterText,
                filter === label ? styles.filterTextActive : styles.filterTextInactive
            ]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Homework</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Horizontal Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
                    <FilterChip label="All" />
                    <FilterChip label="Mathematics" />
                    <FilterChip label="English" />
                    <FilterChip label="Science" />
                    <FilterChip label="History" />
                </ScrollView>

                {/* Homework Cards */}
                {homeworks.filter(item => filter === 'All' || item.subject === filter).map((item) => (
                    <View key={item.id} style={[styles.card, { borderLeftColor: item.color }]}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.subjectBadge, { backgroundColor: item.color + '15' }]}>
                                <Text style={[styles.subjectText, { color: item.color }]}>{item.subject}</Text>
                            </View>
                            <View style={styles.dateBadge}>
                                <Calendar size={12} color={THEME.textSub} />
                                <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                        </View>

                        <Text style={styles.title}>{item.title}</Text>

                        <View style={styles.cardFooter}>
                            <View style={[styles.statusBadge, item.status === 'Submitted' ? styles.statusSuccess : styles.statusPending]}>
                                {item.status === 'Submitted' ? (
                                    <CheckCircle size={14} color={THEME.green} />
                                ) : (
                                    <Clock size={14} color={THEME.orange} />
                                )}
                                <Text style={[styles.statusText, { color: item.status === 'Submitted' ? THEME.green : THEME.orange }]}>
                                    {item.status}
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.actionButton}>
                                <Eye size={16} color="white" />
                                <Text style={styles.actionText}>View</Text>
                            </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    filterScroll: {
        marginBottom: 24,
        flexGrow: 0,
    },
    filterContainer: {
        paddingVertical: 4, // Space for shadow
        paddingRight: 20,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        marginRight: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    filterChipActive: {
        backgroundColor: THEME.teal,
    },
    filterChipInactive: {
        backgroundColor: 'white',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    filterTextActive: {
        color: 'white',
    },
    filterTextInactive: {
        color: THEME.textSub,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
        borderLeftWidth: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    subjectBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    subjectText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    dateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.textSub,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 16,
        lineHeight: 22,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusSuccess: {
        backgroundColor: '#ECFDF5',
    },
    statusPending: {
        backgroundColor: '#FFF7ED',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: THEME.textMain, // Dark button for contrast
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
    },
    actionText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
});
