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

    const categories = [
        { id: 1, name: 'Animals', icon: '🦁', color: '#FCD34D', bg: '#FFFBEB' }, // Yellow
        { id: 2, name: 'Space', icon: '🚀', color: '#60A5FA', bg: '#EFF6FF' },   // Blue
        { id: 3, name: 'Fairy Tales', icon: '🧚', color: '#F472B6', bg: '#FDF2F8' }, // Pink
        { id: 4, name: 'Science', icon: '⚗️', color: '#34D399', bg: '#ECFDF5' }, // Green
    ];

    const newArrivals = [
        { id: 1, title: 'The Corduroy', author: 'Don Freeman', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300' },
        { id: 2, title: 'Space Jam', author: 'Warner Bros', cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300' },
        { id: 3, title: 'Jungle Book', author: 'Rudyard Kipling', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300' },
    ];

    const trending = [
        { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', cover: 'https://images.unsplash.com/photo-1626611792822-efad4867af7f?auto=format&fit=crop&q=80&w=300', color: THEME.purple },
        { id: 5, title: 'Peter Pan', author: 'J.M. Barrie', cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=300', color: THEME.teal },
    ];

    const CategoryCard = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: item.bg, borderColor: item.color }]}
            activeOpacity={0.8}
        >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={[styles.categoryName, { color: '#374151' }]}>{item.name}</Text>
        </TouchableOpacity>
    );

    const BookCard = ({ item, large = false }: { item: any, large?: boolean }) => (
        <TouchableOpacity style={[styles.bookCard, large && styles.bookCardLarge]} activeOpacity={0.9}>
            <View style={[styles.bookCoverContainer, large && styles.bookCoverLarge]}>
                <Image source={{ uri: item.cover }} style={styles.bookCover} resizeMode="cover" />
                {/* Shine effect overlay could go here */}
            </View>
            <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Playful Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Library 📚</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search size={20} color={THEME.textSub} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Find stories..."
                        placeholderTextColor={THEME.textSub}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Explore Categories */}
                <Text style={styles.sectionTitle}>Explore</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelfScroll}>
                    {categories.map(cat => <CategoryCard key={cat.id} item={cat} />)}
                </ScrollView>

                {/* New Arrivals Shelf */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>New Arrivals ✨</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelfScroll}>
                    {newArrivals.map(book => <BookCard key={book.id} item={book} />)}
                </ScrollView>

                {/* Trending */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending Now 🔥</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shelfScroll}>
                    {trending.map(book => <BookCard key={book.id} item={book} large />)}
                </ScrollView>

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
        fontSize: 22, // Larger and more fun
        fontWeight: '800', // Extra bold
        color: THEME.textMain,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 24,
        paddingHorizontal: 16,
        paddingVertical: 12, // Taller search bar
        borderRadius: 24, // Very rounded
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: THEME.textMain,
        fontWeight: '600',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.textMain,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME.teal,
    },
    shelfScroll: {
        paddingHorizontal: 20,
        paddingBottom: 24, // Space for shadows
    },
    categoryCard: {
        width: 100,
        height: 100,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    bookCard: {
        width: 120,
        marginRight: 20,
    },
    bookCardLarge: {
        width: 150,
    },
    bookCoverContainer: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        backgroundColor: 'white', // Fallback
    },
    bookCoverLarge: {
        height: 200,
    },
    bookCover: {
        width: '100%',
        height: '100%',
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 2,
    },
    bookAuthor: {
        fontSize: 12,
        color: THEME.textSub,
        fontWeight: '500',
    },
});
