import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogOut, User, Bell, Globe, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
    const { logout, user } = useAuth();
    const insets = useSafeAreaInsets();

    const SettingItem = ({ icon, title, value, onPress, isDestructive = false }: any) => (
        <TouchableOpacity
            onPress={onPress}
            style={styles.settingItem}
        >
            <View style={styles.itemLeft}>
                <View style={[
                    styles.iconContainer,
                    isDestructive ? styles.iconDestructive : styles.iconDefault
                ]}>
                    {icon}
                </View>
                <Text style={[
                    styles.itemTitle,
                    isDestructive ? styles.textDestructive : styles.textDefault
                ]}>
                    {title}
                </Text>
            </View>
            <View style={styles.itemRight}>
                {value && <Text style={styles.itemValue}>{value}</Text>}
                <ChevronRight size={18} color="#D1D5DB" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Settings" showBack={false} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Section */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={{ fontSize: 30 }}>👦</Text>
                    </View>
                    <Text style={styles.userName}>{user?.name}</Text>
                    <Text style={styles.userDetails}>Roll No: {user?.rollNumber} • {user?.class} {user?.division}</Text>
                </View>

                <Text style={styles.sectionHeader}>Account</Text>
                <View style={styles.sectionContainer}>
                    <SettingItem
                        icon={<User size={18} color="#4B5563" />}
                        title="Edit Profile"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={<Bell size={18} color="#4B5563" />}
                        title="Notifications"
                        value="On"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={<Globe size={18} color="#4B5563" />}
                        title="Language"
                        value="English"
                        onPress={() => { }}
                    />
                </View>

                <View style={[styles.sectionContainer, { marginTop: 24 }]}>
                    <SettingItem
                        icon={<LogOut size={18} color="#EF4444" />}
                        title="Logout"
                        isDestructive
                        onPress={logout}
                    />
                </View>

                <Text style={styles.versionText}>App Version 1.0.0</Text>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB', // gray-50
    },
    scrollContent: {
        paddingBottom: 100,
    },
    profileCard: {
        backgroundColor: 'white',
        padding: 24,
        marginBottom: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#FF8E8E', // primary-light
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    userDetails: {
        color: '#6B7280',
        marginTop: 4,
    },
    sectionHeader: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sectionContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    iconDefault: {
        backgroundColor: '#F9FAFB',
    },
    iconDestructive: {
        backgroundColor: '#FEF2F2',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    textDefault: {
        color: '#374151',
    },
    textDestructive: {
        color: '#EF4444',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemValue: {
        color: '#9CA3AF',
        marginRight: 8,
    },
    versionText: {
        textAlign: 'center',
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 32,
    }
});
