import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Download, CheckCircle, Clock, ChevronLeft, CreditCard } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Theme Constants (matching Dashboard)
const THEME = {
    background: '#F5F7FA',
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    red: '#EF4444',
    green: '#10B981',
    gradientStart: '#818CF8',
    gradientEnd: '#C084FC',
};

export default function FeesScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const history = [
        { id: 1, title: 'Term 1 Fees', amount: '₹15,000', date: '05 Jun 2026', status: 'Paid' },
        { id: 2, title: 'Bus Fees (Q1)', amount: '₹3,000', date: '05 Jun 2026', status: 'Paid' },
    ];

    const pending = [
        { id: 3, title: 'Term 2 Fees', amount: '₹15,000', dueDate: '15 Aug 2026' },
        { id: 4, title: 'Bus Fees (Q2)', amount: '₹3,000', dueDate: '15 Aug 2026' },
    ];

    const GradientCard = ({ children, style }: { children: React.ReactNode, style?: any }) => (
        <View style={[styles.gradientCardContainer, style]}>
            <View style={StyleSheet.absoluteFill}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor={THEME.gradientStart} stopOpacity="1" />
                            <Stop offset="1" stopColor={THEME.gradientEnd} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" rx={24} fill="url(#grad)" />
                </Svg>
            </View>
            <View style={styles.gradientCardContent}>
                {children}
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fees & Payments</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Hero / Total Outstanding */}
                <GradientCard style={styles.heroCard}>
                    <View>
                        <Text style={styles.heroLabel}>Total Outstanding</Text>
                        <Text style={styles.heroAmount}>₹18,000</Text>
                    </View>
                    <TouchableOpacity style={styles.payNowButton} activeOpacity={0.8}>
                        <Text style={styles.payNowText}>Pay Now</Text>
                    </TouchableOpacity>
                </GradientCard>

                {/* Pending Dues Section */}
                <Text style={styles.sectionTitle}>Pending Dues</Text>
                {pending.map((item) => (
                    <View key={item.id} style={styles.dueCard}>
                        <View style={styles.dueLeftBorder} />
                        <View style={styles.dueContent}>
                            <View style={styles.dueHeader}>
                                <Text style={styles.dueTitle}>{item.title}</Text>
                                <Text style={styles.dueAmount}>{item.amount}</Text>
                            </View>
                            <View style={styles.dueFooter}>
                                <View style={styles.dueBadge}>
                                    <Clock size={12} color={THEME.red} />
                                    <Text style={styles.dueText}>Due: {item.dueDate}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Payment History Section */}
                <Text style={styles.sectionTitle}>Payment History</Text>
                {history.map((item) => (
                    <View key={item.id} style={styles.historyCard}>
                        <View style={styles.historyRow}>
                            <View style={styles.historyIconBg}>
                                <CheckCircle size={20} color={THEME.teal} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.historyTitle}>{item.title}</Text>
                                <Text style={styles.historyDate}>{item.date}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.historyAmount}>{item.amount}</Text>
                                <Text style={styles.statusPaid}>Paid</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.downloadRow}>
                            <Download size={14} color={THEME.textSub} />
                            <Text style={styles.downloadText}>Download Receipt</Text>
                        </TouchableOpacity>
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
        padding: 20,
        paddingTop: 10,
    },
    gradientCardContainer: {
        marginBottom: 24,
        borderRadius: 24, // Matches SVG rx
        shadowColor: THEME.purple,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },
    gradientCardContent: {
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heroCard: {
        minHeight: 120,
    },
    heroLabel: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    heroAmount: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    payNowButton: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    payNowText: {
        color: THEME.purple,
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 16,
        marginTop: 8,
    },
    dueCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    dueLeftBorder: {
        width: 6,
        backgroundColor: '#F59E0B', // Amber for Warning
    },
    dueContent: {
        flex: 1,
        padding: 16,
    },
    dueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dueTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    dueAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    dueFooter: {
        flexDirection: 'row',
    },
    dueBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2', // Light Red
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dueText: {
        fontSize: 12,
        color: THEME.red,
        fontWeight: '600',
        marginLeft: 4,
    },
    historyCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 1,
    },
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    historyIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#ECFDF5', // Light Green
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    historyTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 2,
    },
    historyDate: {
        fontSize: 12,
        color: THEME.textSub,
    },
    historyAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 2,
    },
    statusPaid: {
        fontSize: 12,
        fontWeight: 'bold',
        color: THEME.green,
    },
    downloadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    downloadText: {
        fontSize: 12,
        fontWeight: '500',
        color: THEME.textSub,
        marginLeft: 6,
    },
});
