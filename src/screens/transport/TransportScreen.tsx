import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Phone, MapPin, Bus, Clock, ShieldCheck } from 'lucide-react-native';
import Svg, { Circle, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const THEME = {
    textMain: '#1F2937',
    textSub: '#64748B',
    teal: '#0D9488',
    tealLight: '#CCFBF1',
    purple: '#7C3AED',
    indigo: '#4F46E5',
    white: '#FFFFFF',
    offWhite: '#F8FAFC',
};

export default function TransportScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Animation for Bus Pulse
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.5,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.ease),
                }),
            ])
        ).start();
    }, []);

    const timeline = [
        { id: 1, time: '02:30 PM', title: 'Departed School', status: 'completed' },
        { id: 2, time: '02:45 PM', title: 'Route Started', status: 'completed' },
        { id: 3, time: '03:10 PM', title: 'Arriving: Sunshine Apts', status: 'active' },
        { id: 4, time: '03:15 PM', title: 'Drop Off', status: 'pending' },
    ];

    return (
        <View style={styles.container}>
            {/* 1. IMMERSIVE MAP BACKGROUND (Top 55%) */}
            <View style={styles.mapHeader}>
                <Svg height="100%" width="100%" viewBox="0 0 375 400" preserveAspectRatio="xMidYMid slice">
                    <Defs>
                        <LinearGradient id="mapOverlay" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="white" stopOpacity="0" />
                            <Stop offset="0.8" stopColor="#F8FAFC" stopOpacity="0.8" />
                            <Stop offset="1" stopColor="#F8FAFC" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>

                    {/* Abstract Stylized Map Paths */}
                    <Rect x="0" y="0" width="100%" height="100%" fill="#E0F2FE" />

                    {/* Roads */}
                    <Path d="M-50 150 Q 80 50 180 150 T 450 150" fill="none" stroke="white" strokeWidth="25" />
                    <Path d="M-50 150 Q 80 50 180 150 T 450 150" fill="none" stroke="#94A3B8" strokeWidth="18" strokeOpacity={0.2} />
                    <Path d="M-50 150 Q 80 50 180 150 T 450 150" fill="none" stroke="white" strokeWidth="14" />

                    {/* Active Route */}
                    <Path d="M-50 150 Q 80 50 180 150" fill="none" stroke={THEME.teal} strokeWidth="6" strokeDasharray="8,8" />

                    {/* Locations */}
                    <Circle cx="180" cy="150" r="12" fill={THEME.teal} fillOpacity={0.2} />
                    <Circle cx="180" cy="150" r="6" fill={THEME.teal} />

                    {/* Gradient Overlay for Fade to Bottom */}
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#mapOverlay)" />
                </Svg>

                {/* Floating Bus Marker */}
                <View style={styles.busMarkerContainer}>
                    <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
                    <View style={styles.busIconBubble}>
                        <Bus size={22} color="white" />
                    </View>
                    <View style={styles.timeTag}>
                        <Text style={styles.timeTagText}>5 min</Text>
                    </View>
                </View>
            </View>

            {/* 2. TOP NAV (Transparent) */}
            <View style={[styles.topNav, { paddingTop: insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <View style={styles.liveTag}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveTagText}>LIVE TRACKING</Text>
                </View>
                <View style={{ width: 44 }} />
            </View>

            {/* 3. SCROLLABLE SHEET CONTENT */}
            <ScrollView
                style={styles.sheetContainer}
                contentContainerStyle={{ paddingBottom: 50, paddingTop: height * 0.35 }}
                showsVerticalScrollIndicator={false}
            >
                {/* STATUS CARD (Floating) */}
                <View style={styles.statusCard}>
                    <View style={styles.statusRow}>
                        <View>
                            <Text style={styles.statusLabel}>Current Status</Text>
                            <Text style={styles.statusBig}>En Route</Text>
                        </View>
                        <View style={styles.etaBox}>
                            <Text style={styles.etaNum}>05</Text>
                            <Text style={styles.etaUnit}>MINS</Text>
                        </View>
                    </View>
                    <View style={styles.statusDivider} />
                    <View style={styles.locationRow}>
                        <MapPin size={16} color={THEME.indigo} />
                        <Text style={styles.locationText}>Arriving at <Text style={{ fontWeight: 'bold' }}>Sunshine Apartments</Text></Text>
                    </View>
                </View>

                {/* TIMELINE */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Journey Timeline</Text>
                    <View style={styles.timelineBox}>
                        {timeline.map((item, index) => {
                            const isLast = index === timeline.length - 1;
                            const isCompleted = item.status === 'completed';
                            const isActive = item.status === 'active';

                            return (
                                <View key={item.id} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <Text style={styles.timelineTime}>{item.time}</Text>
                                    </View>
                                    <View style={styles.timelineCenter}>
                                        <View style={[
                                            styles.timelineLine,
                                            isLast && { height: 0 },
                                            isCompleted ? { backgroundColor: THEME.teal } : { backgroundColor: '#E2E8F0' }
                                        ]} />
                                        <View style={[
                                            styles.timelineDot,
                                            isCompleted && styles.dotCompleted,
                                            isActive && styles.dotActive,
                                        ]}>
                                            {isCompleted && <View style={styles.innerDot} />}
                                            {isActive && <View style={styles.activeDotInner} />}
                                        </View>
                                    </View>
                                    <View style={[styles.timelineRight, isActive && styles.activeContent]}>
                                        <Text style={[styles.timelineTitle, isActive && styles.activeTitle]}>{item.title}</Text>
                                        {isActive && <Text style={styles.activeSubtitle}>Bus is approaching your stop</Text>}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* DRIVER INFO */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Driver Details</Text>
                    <View style={styles.driverCard}>
                        <View style={styles.driverTop}>
                            <View style={styles.driverImagePlaceholder}>
                                <Text style={{ fontSize: 24 }}>👨‍✈️</Text>
                            </View>
                            <View style={styles.driverInfo}>
                                <Text style={styles.driverName}>Ramesh Kumar</Text>
                                <Text style={styles.busInfo}>Bus No. MH-12-AB-9988</Text>
                                <View style={styles.ratingRow}>
                                    <Text style={styles.ratingText}>4.8 Rating</Text>
                                    <Text style={{ fontSize: 12 }}>⭐</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.actionGrid}>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: THEME.teal }]}>
                                <Phone size={20} color="white" />
                                <Text style={styles.actionBtnText}>Call Driver</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: THEME.purple }]}>
                                <ShieldCheck size={20} color="white" />
                                <Text style={styles.actionBtnText}>Attendant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.offWhite,
    },
    // MAP HEADER
    mapHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.55,
        zIndex: 0,
    },
    busMarkerContainer: {
        position: 'absolute',
        top: '40%',
        left: '48%',
        alignItems: 'center',
    },
    busIconBubble: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: THEME.teal,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: THEME.teal,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
        zIndex: 2,
        borderWidth: 3,
        borderColor: 'white',
    },
    pulseCircle: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: THEME.tealLight,
        opacity: 0.6,
        top: -16,
        zIndex: 1,
    },
    timeTag: {
        position: 'absolute',
        top: -34,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    timeTagText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: THEME.textMain,
    },

    // TOP NAV
    topNav: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        zIndex: 10,
    },
    glassButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        // backdropFilter: 'blur(10px)', // Works on some platforms or disregarded
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    liveTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#EF4444',
    },
    liveTagText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#EF4444',
        letterSpacing: 0.5,
    },

    // SHEET
    sheetContainer: {
        flex: 1,
        zIndex: 5,
    },
    statusCard: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#4F46E5', // Indigo shadow
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 10,
        marginBottom: 32,
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    statusLabel: {
        fontSize: 14,
        color: THEME.textSub,
        fontWeight: '500',
        marginBottom: 4,
    },
    statusBig: {
        fontSize: 24,
        fontWeight: '800', // Extra bold
        color: THEME.textMain,
    },
    etaBox: {
        alignItems: 'center',
        backgroundColor: THEME.offWhite,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    etaNum: {
        fontSize: 20,
        fontWeight: '900',
        color: THEME.teal,
    },
    etaUnit: {
        fontSize: 10,
        fontWeight: 'bold',
        color: THEME.textSub,
    },
    statusDivider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 16,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        fontSize: 14,
        color: THEME.textMain,
    },

    // SECTIONS
    sectionContainer: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 16,
    },

    // TIMELINE
    timelineBox: {
        paddingLeft: 8,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 0,
        minHeight: 60,
    },
    timelineLeft: {
        width: 70,
        paddingTop: 0,
    },
    timelineTime: {
        fontSize: 12,
        color: THEME.textSub,
        fontWeight: '600',
        textAlign: 'right',
        paddingRight: 12,
    },
    timelineCenter: {
        alignItems: 'center',
        width: 20,
    },
    timelineLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: '#E2E8F0',
        zIndex: 0,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E2E8F0',
        marginTop: 2,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    dotCompleted: {
        backgroundColor: THEME.teal,
        borderColor: THEME.teal,
    },
    dotActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: THEME.teal,
        borderWidth: 2,
        marginLeft: 0,
    },
    innerDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'white'
    },
    activeDotInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: THEME.teal,
    },
    timelineRight: {
        flex: 1,
        paddingLeft: 16,
        paddingBottom: 24,
    },
    timelineTitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    activeContent: {

    },
    activeTitle: {
        color: THEME.textMain,
        fontWeight: 'bold',
        fontSize: 15,
    },
    activeSubtitle: {
        fontSize: 12,
        color: THEME.teal,
        marginTop: 2,
        fontWeight: '600',
    },

    // DRIVER
    driverCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    driverTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    driverImagePlaceholder: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.textMain,
    },
    busInfo: {
        fontSize: 13,
        color: THEME.textSub,
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#FFF7ED',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#EA580C',
    },
    actionGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 16,
        gap: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    actionBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
});
