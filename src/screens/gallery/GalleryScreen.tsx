import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Image as ImageIcon, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40 - 15) / 2; // (Screen width - padding - gap) / 2

// Theme Constants
const THEME = {
    background: '#F5F7FA',
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    indigo: '#6366F1',
};

export default function GalleryScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Events', 'Sports', 'Campus', 'Art'];

    const albums = [
        { id: 1, title: 'Annual Day 2025', date: '12 Dec 2025', count: 45, category: 'Events', cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400' },
        { id: 2, title: 'Sports Meet', date: '10 Nov 2025', count: 128, category: 'Sports', cover: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=400' },
        { id: 3, title: 'Science Fair', date: '05 Oct 2025', count: 32, category: 'Events', cover: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=400' },
        { id: 4, title: 'Art Exhibition', date: '20 Sep 2025', count: 18, category: 'Art', cover: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400' },
        { id: 5, title: 'Campus Tour', date: '15 Aug 2025', count: 24, category: 'Campus', cover: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400' },
        { id: 6, title: 'Music Fest', date: '01 Aug 2025', count: 56, category: 'Events', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=400' },
    ];

    const filteredAlbums = activeCategory === 'All'
        ? albums
        : albums.filter(a => a.category === activeCategory);

    const GradientOverlay = () => (
        <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0.5" x2="0" y2="1">
                        <Stop offset="0" stopColor="transparent" stopOpacity="0" />
                        <Stop offset="1" stopColor="#000000" stopOpacity="0.8" />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gallery</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.filterChip, activeCategory === cat ? styles.filterChipActive : styles.filterChipInactive]}
                            onPress={() => setActiveCategory(cat)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.filterText, activeCategory === cat ? styles.filterTextActive : styles.filterTextInactive]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Grid */}
                <View style={styles.grid}>
                    {filteredAlbums.map((album) => (
                        <TouchableOpacity key={album.id} style={styles.card} activeOpacity={0.9}>
                            <Image source={{ uri: album.cover }} style={styles.cardImage} resizeMode="cover" />
                            <GradientOverlay />

                            <View style={styles.cardContent}>
                                <Text style={styles.albumDate}>{album.date}</Text>
                                <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
                                <View style={styles.countBadge}>
                                    <ImageIcon size={10} color="white" />
                                    <Text style={styles.countText}>{album.count}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.likeButton}>
                                <Heart size={14} color="white" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
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
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    filterScroll: {
        marginBottom: 24,
        flexGrow: 0,
    },
    filterContainer: {
        paddingVertical: 4,
        paddingRight: 20,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
        marginRight: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    filterChipActive: {
        backgroundColor: THEME.teal,
    },
    filterChipInactive: {
        backgroundColor: 'white',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    filterTextActive: {
        color: 'white',
    },
    filterTextInactive: {
        color: THEME.textSub,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.3, // Aspect ratio 1:1.3
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        paddingBottom: 16,
    },
    albumDate: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    albumTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    countBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        gap: 4,
    },
    countText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    likeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        // backdropFilter: 'blur(10px)', // Note: backdropFilter not supported in basic RN, but rgba works
    }
});
