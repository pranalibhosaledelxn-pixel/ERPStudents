import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { BookOpen, Calendar, CreditCard, Bell, Search, Clock, ArrowRight, User, Bus } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Theme Colors from "Wellness Blend" Image
const THEME = {
    background: '#F5F7FA', // Extremely light gray/white
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',

    // Accents
    teal: '#00E0C6',   // Bright Minty Teal
    purple: '#8B5CF6', // Soft Violet
    indigo: '#6366F1',
    green: '#10B981',
    red: '#EF4444',

    // Gradient approximations
    gradientStart: '#818CF8',
    gradientEnd: '#C084FC',
    orange: '#F59E0B',
};

export default function DashboardScreen() {
    const { user } = useAuth();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    // Mock Data for "Next Class"
    const nextClass = {
        subject: 'Mathematics',
        time: '11:00 AM',
        room: 'Lab 3',
        teacher: 'Mr. Sharma'
    };

    const CircularProgress = ({ percentage }: { percentage: number }) => {
        const radius = 35;
        const strokeWidth = 8;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                <Svg height="80" width="80" viewBox="0 0 80 80">
                    <Defs>
                        <LinearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor={THEME.gradientStart} stopOpacity="1" />
                            <Stop offset="1" stopColor={THEME.gradientEnd} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    {/* Track */}
                    <Circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#F3F4F6"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Progress */}
                    <Circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="url(#progressGrad)"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        rotation="-90"
                        origin="40, 40"
                    />
                </Svg>
                <Text style={{ position: 'absolute', fontWeight: 'bold', fontSize: 16, color: THEME.textMain }}>
                    {percentage}%
                </Text>
            </View>
        );
    };

    const QuickPill = ({ icon, label, route, color }: { icon: any, label: string, route: string, color: string }) => (
        <TouchableOpacity
            style={styles.quickPill}
            onPress={() => navigation.navigate(route)}
            activeOpacity={0.7}
        >
            {/* Using a solid circle behind icon for that 'wellness' look */}
            <View style={[styles.pillIcon, { backgroundColor: color }]}>
                {React.cloneElement(icon, { size: 16, color: 'white' })}
            </View>
            <Text style={styles.pillText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.dateText}>Monday, 16 Jan</Text>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.name}>{user?.name?.split(' ')[0]}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profilePill}>
                        <View style={styles.avatar}>
                            <Text style={{ fontSize: 14 }}>👦</Text>
                        </View>
                        <Text style={styles.profilePillText}>Profile</Text>
                    </TouchableOpacity>

                </View>

                {/* Hero Bento Grid */}
                <View style={styles.bentoGrid}>
                    {/* Attendance - Large Square */}
                    <TouchableOpacity
                        style={[styles.bentoCard, styles.attendanceCard]}
                        onPress={() => navigation.navigate('Attendance')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Attendance</Text>
                            <ArrowRight size={16} color={THEME.textSub} />
                        </View>
                        <View style={styles.attendanceContent}>
                            <CircularProgress percentage={92} />
                            <View style={styles.attendanceStats}>
                                <Text style={styles.statDetail}>
                                    <Text style={{ fontWeight: 'bold', color: THEME.teal }}>21</Text> Present
                                </Text>
                                <Text style={styles.statDetail}>
                                    <Text style={{ fontWeight: 'bold', color: THEME.red }}>02</Text> Absent
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Next Class - Tall/Wide */}
                    <TouchableOpacity
                        style={[styles.bentoCard, styles.nextClassCard]}
                        onPress={() => navigation.navigate('Timetable')}
                        activeOpacity={0.9}
                    >
                        <View style={[styles.cardBadge, { backgroundColor: THEME.teal + '15' }]}>
                            <Text style={[styles.cardBadgeText, { color: THEME.teal }]}>Next Class</Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.subjectText}>{nextClass.subject}</Text>
                            <View style={styles.nextClassRow}>
                                <Clock size={14} color={THEME.textSub} />
                                <Text style={styles.classDetailText}>{nextClass.time}</Text>
                            </View>
                            <View style={styles.nextClassRow}>
                                <User size={14} color={THEME.textSub} />
                                <Text style={styles.classDetailText}>{nextClass.teacher}</Text>
                            </View>
                        </View>
                        <View style={styles.roomPill}>
                            <Text style={styles.roomText}>{nextClass.room}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions - Pills with Solid Circles */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
                    {/* Using specific theme colors for these pills */}
                    <QuickPill icon={<BookOpen />} label="Daily Diary" route="DailyDiary" color={THEME.orange} />
                    <QuickPill icon={<BookOpen />} label="Homework" route="Homework" color={THEME.teal} />
                    <QuickPill icon={<Calendar />} label="Timetable" route="Timetable" color={THEME.indigo} />
                    <QuickPill icon={<Calendar />} label="Events" route="Events" color="#E11D48" />
                    <QuickPill icon={<Bus />} label="Transport" route="Transport" color={THEME.red} />
                    {/* <QuickPill icon={<ImageIcon />} label="Gallery" route="Gallery" color="#F472B6" /> */}
                    <QuickPill icon={<BookOpen />} label="Library" route="Library" color="#22D3EE" />
                    <QuickPill icon={<CreditCard />} label="Pay Fees" route="Fees" color={THEME.purple} />
                </ScrollView>

                {/* Notices Section - Dark Card with Gradient Hint? No, Keep it Solid Dark for Contrast vs Light Theme */}
                <Text style={styles.sectionTitle}>Updates</Text>
                <TouchableOpacity
                    style={[styles.bentoCard, styles.noticeCard]}
                    onPress={() => navigation.navigate('NoticeBoard')}
                >
                    <View style={styles.noticeIcon}>
                        <Bell size={20} color="white" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.noticeDate}>Today, 9:00 AM</Text>
                        <Text style={styles.noticeText} numberOfLines={2}>School will remain closed tomorrow due to heavy rainfall warning.</Text>
                    </View>
                </TouchableOpacity>

                {/* Learning Continue Section */}
                <TouchableOpacity
                    style={[styles.bentoCard, styles.learningCard]}
                    onPress={() => navigation.navigate('Learning')}
                >
                    <View style={styles.learningContent}>
                        <View>
                            <Text style={styles.learningLabel}>Continue Learning</Text>
                            <Text style={styles.learningTitle}>Chapter 3: Thermodynamics</Text>
                        </View>
                        <View style={[styles.playButton, { backgroundColor: THEME.gradientStart }]}>
                            <ArrowRight size={20} color="white" />
                        </View>
                    </View>
                    <View style={styles.progressBar}>
                        <Svg height="6" width="100%">
                            <Defs>
                                <LinearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                                    <Stop offset="0" stopColor={THEME.gradientStart} stopOpacity="1" />
                                    <Stop offset="1" stopColor={THEME.teal} stopOpacity="1" />
                                </LinearGradient>
                            </Defs>
                            <View style={{ height: 6, borderRadius: 3, backgroundColor: '#F3F4F6', width: '100%' }}>
                                <View style={{ height: 6, borderRadius: 3, width: '45%', overflow: 'hidden' }}>
                                    <Svg height="6" width="100%">
                                        <Defs>
                                            <LinearGradient id="fillGrad" x1="0" y1="0" x2="1" y2="0">
                                                <Stop offset="0" stopColor={THEME.gradientStart} stopOpacity="1" />
                                                <Stop offset="1" stopColor={THEME.teal} stopOpacity="1" />
                                            </LinearGradient>
                                        </Defs>
                                        <Circle r={200} cx={-10} cy={3} fill="url(#fillGrad)" />
                                        {/* Hacky fill for gradient bar using rect */}
                                        <View style={{ flex: 1, backgroundColor: THEME.gradientStart }} />
                                    </Svg>
                                </View>
                                {/* Simpler Approach for Bar: Just Solid for now to ensure reliability */}
                                <View style={[styles.progressFill, { width: '45%', backgroundColor: THEME.teal }]} />
                            </View>
                        </Svg>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    dateText: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.textSub,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    greeting: {
        fontSize: 24,
        fontWeight: '400',
        color: THEME.textMain,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    profilePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 4,
        paddingRight: 12,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: THEME.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    profilePillText: {
        fontWeight: '600',
        color: THEME.textMain,
        fontSize: 13,
    },
    bentoGrid: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 16, // Increased gap for airy feel
        marginBottom: 32,
    },
    bentoCard: {
        backgroundColor: 'white',
        borderRadius: 28, // Rounder corners like image
        padding: 20,
        shadowColor: "#6B7280", // Softer shadow color
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 4,
    },
    attendanceCard: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'space-between',
    },
    nextClassCard: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textMain,
        letterSpacing: 0.5,
    },
    attendanceContent: {
        alignItems: 'center',
        marginTop: 8,
    },
    attendanceStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 12,
    },
    statDetail: {
        fontSize: 11,
        color: THEME.textSub,
        fontWeight: '600',
    },
    cardBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    cardBadgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    subjectText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 8,
    },
    nextClassRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    classDetailText: {
        fontSize: 13,
        color: THEME.textSub,
        marginLeft: 6,
    },
    roomPill: {
        backgroundColor: THEME.background,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    roomText: {
        fontSize: 11,
        fontWeight: '600',
        color: THEME.textSub,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginLeft: 24,
        marginBottom: 16,
    },
    pillScroll: {
        marginBottom: 32,
        flexGrow: 0,
    },
    quickPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        shadowColor: "#6B7280",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 0,
    },
    pillIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    pillText: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textMain,
    },
    noticeCard: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 16,
        backgroundColor: '#1F2937', // Kept dark for contrast, but could use THEME.purple
        shadowColor: "#000",
        shadowOpacity: 0.2,
    },
    noticeIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    noticeDate: {
        color: THEME.textSub,
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    noticeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    learningCard: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 24,
    },
    learningContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    learningLabel: {
        fontSize: 12,
        color: THEME.textSub,
        fontWeight: '600',
        marginBottom: 4,
    },
    learningTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    playButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative' // Ensure relative pos for absolute fill
    },
    progressFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        borderRadius: 3,
    }
});
