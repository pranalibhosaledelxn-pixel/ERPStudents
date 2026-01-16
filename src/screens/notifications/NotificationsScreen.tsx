import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Bell, Calendar, CreditCard, ImageIcon } from 'lucide-react-native';

const THEME = {
    background: '#F5F7FA',
    textMain: '#1F2937',
    textSub: '#6B7280',
    primary: '#00E0C6', // Teal
    secondary: '#8B5CF6', // Purple
    unreadBg: '#F0FDFA', // Light Teal/Cyan bg for unread
    unreadBorder: '#CCFBF1',
};

export default function NotificationsScreen() {
    const insets = useSafeAreaInsets();

    // Enhanced mock data with types for icons
    const notifications = [
        { id: 1, type: 'homework', title: 'Homework Assigned', time: '2 hours ago', message: 'New math homework has been assigned.', read: false },
        { id: 2, type: 'fees', title: 'Fees Reminder', time: '1 day ago', message: 'Term 2 fees are due next week.', read: true },
        { id: 3, type: 'gallery', title: 'Event Photo Uploaded', time: '2 days ago', message: 'New photos from Sports Day are available in Gallery.', read: true },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'homework': return <Bell size={20} color={THEME.secondary} />;
            case 'fees': return <CreditCard size={20} color="#F59E0B" />;
            case 'gallery': return <ImageIcon size={20} color={THEME.primary} />;
            default: return <Bell size={20} color={THEME.textSub} />;
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Notifications" showBack={true} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {notifications.map((item) => (
                    <Card
                        key={item.id}
                        style={[
                            styles.card,
                            !item.read && styles.unreadCard
                        ]}
                    >
                        <View style={styles.cardContent}>
                            <View style={[styles.iconContainer, !item.read && styles.unreadIconContainer]}>
                                {getIcon(item.type)}
                                {!item.read && <View style={styles.dot} />}
                            </View>

                            <View style={styles.textContainer}>
                                <View style={styles.headerRow}>
                                    <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
                                    <Text style={styles.time}>{item.time}</Text>
                                </View>
                                <Text style={styles.message}>{item.message}</Text>
                            </View>
                        </View>
                    </Card>
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
    scrollContent: {
        padding: 16,
    },
    card: {
        marginBottom: 12,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    unreadCard: {
        backgroundColor: THEME.unreadBg,
        borderColor: THEME.unreadBorder,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        position: 'relative',
    },
    unreadIconContainer: {
        backgroundColor: 'white',
    },
    dot: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: THEME.primary,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    textContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: THEME.textMain,
        flex: 1,
        marginRight: 8,
    },
    unreadTitle: {
        fontWeight: '700',
        color: '#111827',
    },
    time: {
        fontSize: 12,
        color: THEME.textSub,
    },
    message: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
});
