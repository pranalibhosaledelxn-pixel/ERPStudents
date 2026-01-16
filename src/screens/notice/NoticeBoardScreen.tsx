import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Bell } from 'lucide-react-native';

export default function NoticeBoardScreen() {
    const insets = useSafeAreaInsets();

    const notices = [
        { id: 1, title: 'Independence Day Celebration', date: '14 Aug', type: 'Event', message: 'All students are requested to wear traditional dress tomorrow.' },
        { id: 2, title: 'School Holiday', date: '10 Aug', type: 'Holiday', message: 'School will remain closed on account of heavy rain.' },
        { id: 3, title: 'Parent Teacher Meeting', date: '05 Aug', type: 'Meeting', message: 'PTM for Sr. KG will be held on Saturday, 9 AM to 12 PM.' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Notice Board" showBack={true} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {notices.map((item) => (
                    <Card key={item.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                <Bell size={20} color="#FFF" />
                            </View>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.dateText}>{item.date} • {item.type}</Text>
                            </View>
                        </View>
                        <Text style={styles.message}>{item.message}</Text>
                    </Card>
                ))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    scrollContent: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#FF8E8E', // primary-light
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    dateText: {
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 2,
    },
    message: {
        color: '#4B5563',
        lineHeight: 20,
    }
});
