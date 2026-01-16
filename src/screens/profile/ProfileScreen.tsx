import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { ChevronRight, User, Phone, Mail, MapPin, BookOpen, Star, Award, TrendingUp, LogOut, Settings, Camera, Shield, GraduationCap } from 'lucide-react-native';
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
    const { user, logout } = useAuth();

    const siblings = [
        { id: '1', name: 'Aarav', class: 'Sr. KG', active: true, color: THEME.teal },
        { id: '2', name: 'Vihaan', class: 'Class 4', active: false, color: THEME.purple },
    ];

    // -- Sub Components --

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

    const MenuOption = ({ label, icon, value, color, isLast = false }: { label: string, icon: any, value?: string, color?: string, isLast?: boolean }) => (
        <TouchableOpacity style={[styles.menuOption, isLast && styles.menuOptionLast]} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
                <View style={[styles.menuIconBox, { backgroundColor: (color || THEME.textSub) + '15' }]}>
                    {React.cloneElement(icon, { size: 20, color: color || THEME.textSub })}
                </View>
                <View>
                    <Text style={styles.menuLabel}>{label}</Text>
                    {value && <Text style={styles.menuValueLabel}>{value}</Text>}
                </View>
            </View>
            <ChevronRight size={18} color="#D1D5DB" />
        </TouchableOpacity>
    );

    const Header = () => (
        <View style={styles.headerContainer}>
            {/* Gradient Background */}
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor={THEME.teal} stopOpacity="1" />
                        <Stop offset="1" stopColor={THEME.purple} stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>

            {/* Top Bar Actions */}
            <View style={[styles.topBar, { marginTop: insets.top }]}>
                <Text style={styles.screenTitle}>My Profile</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Settings size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Decorative Bottom Curve */}
            <Svg height="40" width="100%" style={styles.curve} preserveAspectRatio="none">
                <Path
                    d={`M0 0 Q${width / 2} 40 ${width} 0 L${width} 40 L0 40 Z`}
                    fill={THEME.background}
                />
            </Svg>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                {/* 1. Header is now part of the ScrollView flow */}
                <Header />

                {/* 2. Avatar Section (Overlapping Header) */}
                <View style={styles.profileMetaContainer}>
                    <View style={styles.siblingContainer}>
                        {siblings.map((sib) => (
                            <TouchableOpacity key={sib.id} style={[styles.siblingPill, sib.active && styles.siblingPillActive]} activeOpacity={0.8}>
                                <View style={[styles.siblingAvatar, { backgroundColor: sib.color }]}>
                                    <Text style={{ fontSize: 12 }}>👦</Text>
                                </View>
                                {sib.active && <Text style={styles.siblingName}>{sib.name}</Text>}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>👦</Text>
                        </View>
                        <View style={styles.cameraBadge}>
                            <Camera size={14} color="white" />
                        </View>
                    </View>

                    <Text style={styles.userName}>{user?.name}</Text>
                    <Text style={styles.userClass}>{user?.class} - {user?.division} • Roll No. {user?.rollNumber}</Text>
                </View>

                {/* 3. Stats Row */}
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
                        icon={<GraduationCap size={20} color={THEME.purple} />}
                        color={THEME.purple}
                    />
                    <View style={styles.statDivider} />
                    <StatItem
                        label="Points"
                        value="1,240"
                        icon={<Star size={20} color="#F59E0B" />}
                        color="#F59E0B"
                    />
                </View>

                {/* 4. Details Menu */}
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <View style={styles.menuContainer}>
                    <MenuOption
                        label="Father's Name"
                        value={user?.parentName}
                        icon={<User />}
                        color={THEME.indigo}
                    />
                    <MenuOption
                        label="Mobile Number"
                        value={user?.mobile}
                        icon={<Phone />}
                        color={THEME.teal}
                    />
                    <MenuOption
                        label="Email Address"
                        value="parent@school.com"
                        icon={<Mail />}
                        color={THEME.purple}
                    />
                    <MenuOption
                        label="Home Address"
                        value="Mumbai, India"
                        icon={<MapPin />}
                        color={THEME.danger}
                        isLast
                    />
                </View>

                {/* 5. Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
                    <LogOut size={20} color="white" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>v1.5.0</Text>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.background,
    },
    // Header
    headerContainer: {
        height: 240,
        width: '100%',
        position: 'relative',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        height: 50,
    },
    screenTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    settingsButton: {
        position: 'absolute',
        right: 20,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
    },
    curve: {
        position: 'absolute',
        bottom: -1,
    },

    // Scroll Content
    scrollContent: {
        paddingBottom: 100, // Enough space for tab bar
    },

    // Profile Meta
    profileMetaContainer: {
        alignItems: 'center',
        marginTop: -60, // Overlap effect
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    siblingContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 30,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    siblingPill: {
        padding: 4,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    siblingPillActive: {
        backgroundColor: '#F3F4F6',
        paddingRight: 12,
    },
    siblingAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    siblingName: {
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: 13,
        color: THEME.textMain,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    avatarText: {
        fontSize: 48,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        backgroundColor: THEME.purple,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
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

    // Stats
    statsCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    statLabel: {
        fontSize: 12,
        color: THEME.textSub,
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#F3F4F6',
    },

    // Menu
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginLeft: 24,
        marginBottom: 12,
    },
    menuContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 8,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuOptionLast: {
        borderBottomWidth: 0,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconBox: {
        width: 40,
        height: 40,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },
    menuValueLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.textMain,
    },

    // Logout
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.danger,
        marginHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 20,
        marginBottom: 20,
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
        marginBottom: 20,
    }
});
