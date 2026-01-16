import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut, User, Bell, Globe, Moon, Shield, HelpCircle, ChevronRight, Lock } from 'lucide-react-native';

const THEME = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    textMain: '#1E293B',
    textSub: '#64748B',
    border: '#E2E8F0',
    primary: '#0F766E',
    secondary: '#7C3AED',
    danger: '#EF4444',
};

export default function SettingsScreen() {
    const { logout, user } = useAuth();
    const insets = useSafeAreaInsets();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);

    // -- Components --
    const SectionTitle = ({ title }: { title: string }) => (
        <Text style={styles.sectionTitle}>{title}</Text>
    );

    const SettingItem = ({ icon, label, value, type = 'link', color, onPress, isLast }: any) => (
        <TouchableOpacity
            style={[styles.itemContainer, isLast && styles.itemLast]}
            onPress={type !== 'switch' ? onPress : () => { }}
            activeOpacity={type === 'switch' ? 1 : 0.7}
        >
            <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
                    {React.cloneElement(icon, { size: 18, color: color })}
                </View>
                <Text style={styles.itemLabel}>{label}</Text>
            </View>

            <View style={styles.itemRight}>
                {type === 'value' && <Text style={styles.valueText}>{value}</Text>}
                {type === 'switch' && (
                    <Switch
                        value={value}
                        onValueChange={onPress}
                        trackColor={{ false: '#E2E8F0', true: THEME.primary }}
                        thumbColor={'white'}
                    />
                )}
                {type === 'link' && <ChevronRight size={18} color="#CBD5E1" />}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Settings" showBack={false} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* User Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileLeft}>
                        <View style={styles.avatar}>
                            <Text style={{ fontSize: 24 }}>👦</Text>
                        </View>
                        <View>
                            <Text style={styles.userName}>{user?.name || 'Student Name'}</Text>
                            <Text style={styles.userRole}>Class {user?.class || 'X'} - {user?.division || 'A'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editBtn}>
                        <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* Account Settings */}
                <SectionTitle title="Account" />
                <View style={styles.cardContainer}>
                    <SettingItem
                        label="Personal Details"
                        icon={<User />}
                        color={THEME.primary}
                        type="link"
                    />
                    <SettingItem
                        label="Change Password"
                        icon={<Lock />}
                        color={THEME.secondary}
                        type="link"
                        isLast
                    />
                </View>

                {/* Preferences */}
                <SectionTitle title="Preferences" />
                <View style={styles.cardContainer}>
                    <SettingItem
                        label="Notifications"
                        icon={<Bell />}
                        color="#F59E0B"
                        type="switch"
                        value={notificationsEnabled}
                        onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <SettingItem
                        label="Dark Mode"
                        icon={<Moon />}
                        color="#6366F1"
                        type="switch"
                        value={darkMode}
                        onPress={() => setDarkMode(!darkMode)}
                    />
                    <SettingItem
                        label="Language"
                        icon={<Globe />}
                        color="#EC4899"
                        type="value"
                        value="English"
                        isLast
                    />
                </View>

                {/* Support */}
                <SectionTitle title="Support" />
                <View style={styles.cardContainer}>
                    <SettingItem
                        label="Help & FAQ"
                        icon={<HelpCircle />}
                        color={THEME.primary}
                        type="link"
                    />
                    <SettingItem
                        label="Privacy Policy"
                        icon={<Shield />}
                        color={THEME.secondary}
                        type="link"
                        isLast
                    />
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <LogOut size={18} color={THEME.danger} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.2.0 • Build 2026</Text>

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
        paddingBottom: 40,
    },

    // Profile Card
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: THEME.border,
    },
    profileLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F0FDFA', // teal-50
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCFBF1',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    userRole: {
        fontSize: 13,
        color: THEME.textSub,
    },
    editBtn: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    editBtnText: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.textMain,
    },

    // Sections
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textSub,
        marginBottom: 12,
        marginLeft: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: THEME.border,
        overflow: 'hidden', // for children border radius
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        backgroundColor: 'white',
    },
    itemLast: {
        borderBottomWidth: 0,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: THEME.textMain,
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 14,
        color: THEME.textSub,
        marginRight: 4,
    },

    // Logout
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEF2F2', // red-50
        padding: 16,
        borderRadius: 20,
        gap: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: THEME.danger,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#94A3B8',
    },
});
