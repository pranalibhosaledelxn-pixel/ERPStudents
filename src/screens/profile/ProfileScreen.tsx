import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { ChevronRight, User, Phone, Mail, MapPin, BookOpen, Star, Award, TrendingUp, LogOut } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Theme Constants
const THEME = {
    background: '#F5F7FA',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    cardBg: '#FFFFFF',
    danger: '#EF4444',
};

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const { user, logout } = useAuth(); // Assuming logout is available in context

    const StatItem = ({ label, value, icon, color }: any) => (
        <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
                {icon}
            </View>
            <View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
        </View>
    );

    const InfoRow = ({ label, value, icon, color }: { label: string, value: string | undefined, icon?: any, color?: string }) => (
        <View style={styles.infoRow}>
            <View style={styles.infoLabelContainer}>
                {icon && (
                    <View style={[styles.infoIcon, { backgroundColor: (color || THEME.textSub) + '15' }]}>
                        {React.cloneElement(icon, { size: 18, color: color || THEME.textSub })}
                    </View>
                )}
                <Text style={styles.infoLabel}>{label}</Text>
            </View>
            <Text style={styles.infoValue}>{value || '-'}</Text>
        </View>
    );

    const GradientHeader = () => (
        <View style={styles.headerContainer}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor={THEME.teal} stopOpacity="1" />
                        <Stop offset="1" stopColor={THEME.purple} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>
            {/* Decorative Curve */}
            <Svg height="40" width="100%" style={styles.curve}>
                <Path
                    d={`M0 0 Q${width / 2} 40 ${width} 0 L${width} 40 L0 40 Z`}
                    fill={THEME.background}
                />
            </Svg>
        </View>
    );

    return (
        <View style={[styles.container]}>
            <GradientHeader />

            <View style={[styles.topNav, { marginTop: insets.top }]}>
                {/* Placeholder for custom back button if needed, or simplified header */}
                <Text style={styles.screenTitle}>My Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Space */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>👦</Text>
                        <View style={styles.onlineBadge} />
                    </View>
                    <Text style={styles.userName}>{user?.name}</Text>
                    <Text style={styles.userClass}>{user?.class} - {user?.division} | Roll No. {user?.rollNumber}</Text>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsCard}>
                    <StatItem
                        label="Attendance"
                        value="92%"
                        icon={<TrendingUp size={20} color={THEME.teal} />}
                        color={THEME.teal}
                    />
                    <View style={styles.statDivider} />
                    <StatItem
                        label="Grade"
                        value="A+"
                        icon={<Award size={20} color={THEME.purple} />}
                        color={THEME.purple}
                    />
                    <View style={styles.statDivider} />
                    <StatItem
                        label="Points"
                        value="1,250"
                        icon={<Star size={20} color="#F59E0B" />}
                        color="#F59E0B"
                    />
                </View>

                {/* Info Sections */}
                <Text style={styles.sectionHeader}>Personal Information</Text>

                <Card style={styles.infoCard}>
                    <InfoRow
                        label="Father's Name"
                        value={user?.parentName}
                        icon={<User />}
                        color={THEME.indigo}
                    />
                    <InfoRow
                        label="Mobile Number"
                        value={user?.mobile}
                        icon={<Phone />}
                        color={THEME.indigo}
                    />
                    <InfoRow
                        label="Email Address"
                        value="parent@school.com"
                        icon={<Mail />}
                        color={THEME.indigo}
                    />
                    <InfoRow
                        label="Home Address"
                        value="123, Sunshine Apts, Mumbai"
                        icon={<MapPin />}
                        color={THEME.indigo}
                    />
                </Card>

                <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
                    <LogOut size={20} color="white" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>v1.0.2 • School ERP</Text>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    headerContainer: {
        height: 220,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    curve: {
        position: 'absolute',
        bottom: -1, // Overlap slightly to avoid gaps
    },
    topNav: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    scrollContent: {
        paddingTop: 60, // Space for avatar overlap
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        position: 'relative',
    },
    avatarText: {
        fontSize: 48,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: THEME.teal,
        borderWidth: 3,
        borderColor: 'white',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 4,
    },
    userClass: {
        fontSize: 14,
        color: THEME.textSub,
        fontWeight: '600',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        textAlign: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: THEME.textSub,
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#F3F4F6',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 12,
        marginLeft: 4,
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
    },
    infoIcon: {
        width: 32,
        height: 32,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        color: THEME.textMain,
        fontWeight: '600',
        textAlign: 'right',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.danger,
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: THEME.danger,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    versionText: {
        textAlign: 'center',
        color: '#D1D5DB',
        fontSize: 12,
        marginTop: 24,
    }
});
