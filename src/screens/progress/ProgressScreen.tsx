import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';

export default function ProgressScreen() {
    const insets = useSafeAreaInsets();

    const subjects = [
        { name: 'Mathematics', score: 85, color: '#FF6B6B' }, // primary
        { name: 'English', score: 78, color: '#4ECDC4' }, // secondary
        { name: 'Arts & Craft', score: 92, color: '#FFE66D' }, // accent
        { name: 'General Knowledge', score: 88, color: '#55EFC4' }, // success
    ];

    const skills = [
        { name: 'Communication', rating: 4 },
        { name: 'Discipline', rating: 5 },
        { name: 'Creativity', rating: 5 },
        { name: 'Hygiene', rating: 4 },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Progress Report" showBack={true} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Academic Performance</Text>
                    {subjects.map((sub, index) => (
                        <View key={index} style={styles.subjectRow}>
                            <View style={styles.subjectHeader}>
                                <Text style={styles.subjectName}>{sub.name}</Text>
                                <Text style={styles.subjectScore}>{sub.score}%</Text>
                            </View>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { backgroundColor: sub.color, width: `${sub.score}%` }]} />
                            </View>
                        </View>
                    ))}
                </Card>

                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Skills Assessment</Text>
                    {skills.map((skill, index) => (
                        <View key={index} style={styles.skillRow}>
                            <Text style={styles.skillName}>{skill.name}</Text>
                            <View style={styles.starContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Text key={star} style={star <= skill.rating ? styles.starFilled : styles.starEmpty}>
                                        {star <= skill.rating ? '★' : '☆'}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </Card>

                <Card style={[styles.card, styles.remarksCard]}>
                    <Text style={styles.remarksTitle}>Teacher's Remarks</Text>
                    <Text style={styles.remarksText}>"Aarav is doing excellent in Arts but needs practice in English handwriting. Overall great progress!"</Text>
                </Card>

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
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    subjectRow: {
        marginBottom: 16,
    },
    subjectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    subjectName: {
        fontWeight: '500',
        color: '#374151',
    },
    subjectScore: {
        fontWeight: 'bold',
        color: '#1F2937',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    skillRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    skillName: {
        fontWeight: '500',
        color: '#374151',
    },
    starContainer: {
        flexDirection: 'row',
    },
    starFilled: {
        color: '#FACC15', // yellow-400
        fontSize: 20,
    },
    starEmpty: {
        color: '#FACC15',
        fontSize: 20,
        opacity: 0.3,
    },
    remarksCard: {
        backgroundColor: '#EFF6FF', // blue-50
        borderWidth: 1,
        borderColor: '#DBEAFE', // blue-100
        marginTop: 8,
    },
    remarksTitle: {
        fontWeight: 'bold',
        color: '#1E40AF', // blue-800
        marginBottom: 8,
    },
    remarksText: {
        color: '#1D4ED8', // blue-700
        fontStyle: 'italic',
    }
});
