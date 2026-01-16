import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Phone, MapPin, Navigation, Bus, Clock, ShieldCheck } from 'lucide-react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const THEME = {
    background: '#F5F7FA',
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    green: '#10B981',
    red: '#EF4444',
    orange: '#F59E0B',
};

export default function TransportScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Mock Status
    const currentStatus = 'En Route';
    const subtitle = 'Arriving at Pickup Point in 5 mins';

    // Timeline Data
    const timeline = [
        { id: 1, time: '02:30 PM', title: 'Bus Left School', status: 'Completed' },
        { id: 2, time: '02:45 PM', title: 'Route Started', status: 'Completed' },
        { id: 3, time: '03:10 PM', title: 'Arriving at Sunshine Apts', status: 'active' },
        { id: 4, time: '03:15 PM', title: 'Drop Complete', status: 'pending' },
    ];

    const ActionButton = ({ icon, label, color, onPress }: any) => (
        <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: color + '15' }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.actionIcon, { backgroundColor: color }]}>
                {icon}
            </View>
            <Text style={[styles.actionLabel, { color: THEME.textMain }]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transport Tracking</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Visual Map Mockup */}
                <View style={styles.mapContainer}>
                    {/* Placeholder Map Background - Just a generic path graphic */}
                    <View style={styles.mapBackground}>
                        <Svg height="100%" width="100%" viewBox="0 0 300 200">
                            <Path
                                d="M-20 100 Q 80 20 150 100 T 320 100"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="15"
                            />
                            <Path
                                d="M-20 100 Q 80 20 150 100 T 320 100"
                                fill="none"
                                stroke="white"
                                strokeWidth="11"
                            />
                            {/* Route Progress */}
                            <Path
                                d="M-20 100 Q 80 20 150 100"
                                fill="none"
                                stroke={THEME.teal}
                                strokeWidth="4"
                                strokeDasharray="5,5"
                            />
                            {/* School Icon */}
                            <Circle cx="20" cy="80" r="8" fill={THEME.purple} />
                            {/* Home Icon */}
                            <Circle cx="280" cy="110" r="8" fill={THEME.red} />
                        </Svg>

                        {/* Bus Icon Overlay */}
                        <View style={styles.busOverlay}>
                            <View style={styles.pulseRing} />
                            <View style={styles.busIconContainer}>
                                <Bus size={20} color="white" />
                            </View>
                            <View style={styles.busTooltip}>
                                <Text style={styles.busTooltipText}>5 mins away</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <View>
                            <Text style={styles.statusTitle}>{currentStatus}</Text>
                            <Text style={styles.statusSubtitle}>{subtitle}</Text>
                        </View>
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>LIVE</Text>
                        </View>
                    </View>

                    {/* Timeline */}
                    <View style={styles.timelineContainer}>
                        {timeline.map((item, index) => (
                            <View key={item.id} style={styles.timelineRow}>
                                {/* Line Connector */}
                                {index !== timeline.length - 1 && (
                                    <View style={[
                                        styles.timelineLine,
                                        { backgroundColor: item.status === 'Completed' ? THEME.teal : '#E5E7EB' }
                                    ]} />
                                )}

                                {/* Dot */}
                                <View style={[
                                    styles.timelineDot,
                                    item.status === 'Completed' ? { backgroundColor: THEME.teal, borderColor: THEME.teal } :
                                        item.status === 'active' ? { backgroundColor: 'white', borderColor: THEME.teal, borderWidth: 4 } :
                                            { backgroundColor: '#E5E7EB', borderColor: '#E5E7EB' }
                                ]} />

                                {/* Content */}
                                <View style={[styles.timelineContent, { opacity: item.status === 'pending' ? 0.5 : 1 }]}>
                                    <Text style={styles.timelineTitle}>{item.title}</Text>
                                    <Text style={styles.timelineTime}>{item.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Driver & Bus Info */}
                <Text style={styles.sectionTitle}>Bus Details</Text>
                <View style={styles.detailsCard}>
                    <View style={styles.driverRow}>
                        <View style={styles.driverAvatar}>
                            <Text style={{ fontSize: 20 }}>👨‍✈️</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.driverName}>Ramesh Kumar</Text>
                            <Text style={styles.busNumber}>Bus No. MH-12-AB-9988</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>4.8</Text>
                            <Text style={{ fontSize: 10 }}>⭐</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.actionsRow}>
                        <ActionButton
                            icon={<Phone size={18} color="white" />}
                            label="Call Driver"
                            color={THEME.teal}
                            onPress={() => { }}
                        />
                        <ActionButton
                            icon={<ShieldCheck size={18} color="white" />}
                            label="Attendant"
                            color={THEME.purple}
                            onPress={() => { }}
                        />
                    </View>
                </View>

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
        paddingBottom: 40,
    },
    mapContainer: {
        height: 220,
        marginHorizontal: 20,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#E0F2FE', // Light blue map water color
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    mapBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busOverlay: {
        position: 'absolute',
        top: '40%',
        left: '45%',
        alignItems: 'center',
    },
    busIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: THEME.teal,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'white',
        zIndex: 2,
    },
    busTooltip: {
        position: 'absolute',
        top: -30,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    busTooltipText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    pulseRing: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: THEME.teal,
        opacity: 0.2,
        top: -10,
        left: -10,
    },
    statusCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 4,
    },
    statusSubtitle: {
        fontSize: 13,
        color: THEME.teal,
        fontWeight: '600',
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: THEME.red,
        marginRight: 6,
    },
    liveText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: THEME.red,
    },
    timelineContainer: {
        paddingLeft: 8,
    },
    timelineRow: {
        flexDirection: 'row',
        paddingBottom: 24,
        position: 'relative',
    },
    timelineLine: {
        position: 'absolute',
        left: 5, // Center of dot (10px / 2)
        top: 10,
        bottom: -10, // Extend to next dot
        width: 2,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 16,
        zIndex: 1,
    },
    timelineContent: {
        marginTop: -4, // Align text with dot
    },
    timelineTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textMain,
        marginBottom: 2,
    },
    timelineTime: {
        fontSize: 12,
        color: THEME.textSub,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginHorizontal: 20,
        marginBottom: 16,
    },
    detailsCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    driverRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 2,
    },
    busNumber: {
        fontSize: 13,
        color: THEME.textSub,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#D97706',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 16,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 16,
        gap: 8,
    },
    actionIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
});
