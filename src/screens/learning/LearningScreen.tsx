import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Play, FileText, ChevronLeft, Clock, Award, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Theme Constants
const THEME = {
    background: '#F5F7FA',
    cardBg: '#FFFFFF',
    textMain: '#1F2937',
    textSub: '#9CA3AF',
    teal: '#00E0C6',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    orange: '#F59E0B',
    red: '#EF4444',
};

export default function LearningScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const continueLearning = {
        id: 101,
        title: 'Basic Mathematics',
        chapter: 'Chapter 3: Addition & Subtraction',
        progress: 65,
        color: THEME.purple,
        thumb: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600'
    };

    const courses = [
        { id: 1, title: 'Learn Alphabets', duration: '12 Mins', thumb: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=300', color: THEME.teal },
        { id: 2, title: 'Counting 1-100', duration: '8 Mins', thumb: 'https://images.unsplash.com/photo-1596464716127-f9a0639b936f?auto=format&fit=crop&q=80&w=300', color: THEME.indigo },
        { id: 3, title: 'Animal Sounds', duration: '15 Mins', thumb: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=300', color: THEME.orange },
    ];

    const worksheets = [
        { id: 4, title: 'Color the Apple', size: '1.2 MB', color: THEME.red },
        { id: 5, title: 'Trace lines', size: '800 KB', color: THEME.teal },
        { id: 6, title: 'Match Shapes', size: '2.5 MB', color: THEME.purple },
    ];

    const GradientProgress = ({ progress, color }: { progress: number, color: string }) => (
        <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={24} color={THEME.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Learning Zone 🎓</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Hero: Continue Learning */}
                <Text style={styles.sectionTitle}>Continue Learning</Text>
                <TouchableOpacity style={styles.heroCard} activeOpacity={0.9}>
                    <Image source={{ uri: continueLearning.thumb }} style={styles.heroImage} resizeMode="cover" />
                    <View style={styles.heroOverlay}>
                        <View style={styles.heroContent}>
                            <View style={styles.playButtonLarge}>
                                <Play size={24} color={THEME.purple} fill={THEME.purple} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.heroSubtitle}>{continueLearning.title}</Text>
                                <Text style={styles.heroTitle}>{continueLearning.chapter}</Text>
                            </View>
                        </View>
                        <View style={styles.heroFooter}>
                            <Text style={styles.progressText}>{continueLearning.progress}% Completed</Text>
                            <GradientProgress progress={continueLearning.progress} color={THEME.teal} />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Video Lessons */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Video Lessons</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    {courses.map((course) => (
                        <TouchableOpacity key={course.id} style={styles.videoCard} activeOpacity={0.8}>
                            <View style={styles.videoThumbContainer}>
                                <Image source={{ uri: course.thumb }} style={styles.videoThumb} resizeMode="cover" />
                                <View style={styles.playOverlay}>
                                    <View style={styles.playButtonSmall}>
                                        <Play size={12} color="white" fill="white" />
                                    </View>
                                </View>
                                <View style={styles.durationBadge}>
                                    <Clock size={10} color="white" />
                                    <Text style={styles.durationText}>{course.duration}</Text>
                                </View>
                            </View>
                            <Text style={styles.videoTitle} numberOfLines={2}>{course.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Worksheets */}
                <Text style={styles.sectionTitle}>Fun Worksheets 📝</Text>
                <View style={styles.worksheetList}>
                    {worksheets.map((sheet) => (
                        <TouchableOpacity key={sheet.id} style={styles.worksheetCard} activeOpacity={0.7}>
                            <View style={[styles.iconBox, { backgroundColor: sheet.color + '15' }]}>
                                <FileText size={20} color={sheet.color} />
                            </View>
                            <View style={styles.worksheetInfo}>
                                <Text style={styles.worksheetTitle}>{sheet.title}</Text>
                                <Text style={styles.worksheetSize}>{sheet.size}</Text>
                            </View>
                            <View style={styles.downloadBtn}>
                                <Text style={styles.downloadText}>Download</Text>
                            </View>
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
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800', // Bolder for playful feel
        color: THEME.textMain,
        paddingHorizontal: 20,
        marginBottom: 12,
        marginTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 12,
        marginTop: 16,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: THEME.teal,
    },
    heroCard: {
        marginHorizontal: 20,
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay for text
        justifyContent: 'flex-end',
        padding: 20,
    },
    heroContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    playButtonLarge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    heroSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    heroTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    heroFooter: {
        width: '100%',
    },
    progressText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 6,
        alignSelf: 'flex-end',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    horizontalScroll: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    videoCard: {
        width: 140,
        marginRight: 16,
    },
    videoThumbContainer: {
        width: 140,
        height: 100,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 8,
        position: 'relative',
        backgroundColor: '#E5E7EB',
    },
    videoThumb: {
        width: '100%',
        height: '100%',
    },
    playOverlay: {
        position: 'absolute',
        inset: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    playButtonSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
    },
    durationBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    durationText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
    },
    videoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.textMain,
    },
    worksheetList: {
        paddingHorizontal: 20,
    },
    worksheetCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    worksheetInfo: {
        flex: 1,
    },
    worksheetTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: THEME.textMain,
        marginBottom: 2,
    },
    worksheetSize: {
        fontSize: 12,
        color: THEME.textSub,
    },
    downloadBtn: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    downloadText: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.textMain,
    },
});
