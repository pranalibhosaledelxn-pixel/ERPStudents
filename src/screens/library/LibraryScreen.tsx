import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, ChevronLeft, Star, Heart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Theme Constants
const THEME = {
    background: '#F5F7FA',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    orange: '#F59E0B',
    pink: '#EC4899',
    blue: '#3B82F6',
};

export default function LibraryScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    // Pre-Primary "Magic Library" Data
    const storyOfTheDay = {
        id: 1,
        title: 'The Very Hungry Caterpillar',
        author: 'Eric Carle',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', // Wide image
        color: '#FFB547', // Orange
    };

    const adventureWorlds = [
        { id: 1, name: 'Animals', icon: '🦁', bg: '#FEF9C3', border: '#FACC15' }, // Yellow
        { id: 2, name: 'Space', icon: '🚀', bg: '#DBEAFE', border: '#60A5FA' },   // Blue
        { id: 3, name: 'Fairies', icon: '🧚', bg: '#FCE7F3', border: '#F472B6' }, // Pink
        { id: 4, name: 'Dinos', icon: '🦖', bg: '#DCFCE7', border: '#4ADE80' },   // Green
    ];

    const listenAlong = [
        { id: 1, title: 'Peppa Pig', duration: '5m', color: '#F472B6' },
        { id: 2, title: 'Baby Shark', duration: '2m', color: '#60A5FA' },
        { id: 3, title: 'Paw Patrol', duration: '8m', color: '#EF4444' },
    ];

    // -- Components --

    const HeroStory = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
            <Image source={{ uri: item.cover }} style={styles.heroImage} resizeMode="cover" />
            <View style={styles.heroOverlay}>
                <View style={styles.heroTag}>
                    <Star size={14} color="white" fill="white" />
                    <Text style={styles.heroTagText}>Story of the Day</Text>
                </View>
                <Text style={styles.heroTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const WorldCard = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.worldCard, { backgroundColor: item.bg, borderColor: item.border }]}
            activeOpacity={0.8}
        >
            <Text style={styles.worldIcon}>{item.icon}</Text>
            <Text style={styles.worldName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const AudioTrack = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.audioTrack} activeOpacity={0.7}>
            <View style={[styles.playCircle, { backgroundColor: item.color }]}>
                <Text style={{ fontSize: 14 }}>▶️</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackDuration}>{item.duration} • Watch & Listen</Text>
            </View>
            <Heart size={20} color="#E5E7EB" />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={28} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>✨ Magic Library</Text>
                <View style={[styles.avatarContainer, { backgroundColor: '#FCD34D' }]}>
                    <Text style={{ fontSize: 20 }}>👦</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Search */}
                <View style={styles.searchBar}>
                    <Search size={24} color="#9CA3AF" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Look for books..."
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Hero Section */}
                <Text style={styles.sectionTitle}>Start Here 🌟</Text>
                <HeroStory item={storyOfTheDay} />

                {/* Worlds Grid */}
                <Text style={styles.sectionTitle}>Pick a World 🌍</Text>
                <View style={styles.worldsGrid}>
                    {adventureWorlds.map(world => <WorldCard key={world.id} item={world} />)}
                </View>

                {/* Listen Along */}
                <Text style={styles.sectionTitle}>Listen & Dance 🎵</Text>
                <View style={styles.audioList}>
                    {listenAlong.map(track => <AudioTrack key={track.id} item={track} />)}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBF7', // Creamy warm background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1F2937',
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 24,
        padding: 16,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1F2937',
        marginLeft: 20,
        marginBottom: 16,
    },
    // Hero
    heroCard: {
        marginHorizontal: 20,
        height: 200,
        borderRadius: 30,
        marginBottom: 32,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'white',
        elevation: 8,
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)', // Slight tint for readability
    },
    heroTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F59E0B',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    heroTagText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 4,
    },
    heroTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '900',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    // Worlds
    worldsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 16,
        marginBottom: 32,
    },
    worldCard: {
        width: (width - 56) / 2,
        aspectRatio: 1,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomWidth: 6, // 3D Pop
    },
    worldIcon: {
        fontSize: 40,
        marginBottom: 8,
    },
    worldName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#374151',
    },
    // Audio
    audioList: {
        paddingHorizontal: 20,
        gap: 16,
    },
    audioTrack: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        elevation: 1,
    },
    playCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    trackTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    trackDuration: {
        fontSize: 13,
        color: '#9CA3AF',
        fontWeight: '600',
        marginTop: 2,
    },
});
