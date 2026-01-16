import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Calendar, Plus } from 'lucide-react-native';

export default function LeaveApplicationScreen() {
    const insets = useSafeAreaInsets();
    const [showForm, setShowForm] = useState(false);

    const leaves = [
        { id: 1, type: 'Medical', date: '10 Aug - 12 Aug', days: '3 Days', status: 'Approved', color: 'green' },
        { id: 2, type: 'Family Function', date: '01 Sep', days: '1 Day', status: 'Pending', color: 'orange' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScreenHeader title="Leave Application" showBack={true} />

            <View style={{ flex: 1 }}>
                {showForm ? (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Card style={styles.formCard}>
                            <Text style={styles.formTitle}>New Application</Text>

                            <Text style={styles.label}>Leave Type</Text>
                            <TextInput style={styles.input} placeholder="e.g. Medical, Family" placeholderTextColor="#9CA3AF" />

                            <Text style={styles.label}>From Date</Text>
                            <TextInput style={styles.input} placeholder="DD/MM/YYYY" placeholderTextColor="#9CA3AF" />

                            <Text style={styles.label}>To Date</Text>
                            <TextInput style={styles.input} placeholder="DD/MM/YYYY" placeholderTextColor="#9CA3AF" />

                            <Text style={styles.label}>Reason</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Details..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={4}
                            />

                            <View style={styles.formActions}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowForm(false)}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitButton} onPress={() => setShowForm(false)}>
                                    <Text style={styles.submitText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </ScrollView>
                ) : (
                    <>
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.sectionTitle}>History</Text>
                            {leaves.map((leave) => (
                                <Card key={leave.id} style={styles.leaveCard}>
                                    <View style={styles.leaveHeader}>
                                        <View style={styles.typeBadge}>
                                            <Text style={styles.typeText}>{leave.type}</Text>
                                        </View>
                                        <View style={[styles.statusBadge, { backgroundColor: leave.color === 'green' ? '#DCFCE7' : '#FFEDD5' }]}>
                                            <Text style={[styles.statusText, { color: leave.color === 'green' ? '#15803D' : '#C2410C' }]}>
                                                {leave.status}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.dateRow}>
                                        <Calendar size={16} color="#6B7280" />
                                        <Text style={styles.dateText}>{leave.date}</Text>
                                        <Text style={styles.daysText}>({leave.days})</Text>
                                    </View>
                                </Card>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.fab, { bottom: 20 + insets.bottom }]}
                            onPress={() => setShowForm(true)}
                        >
                            <Plus color="white" size={24} />
                            <Text style={styles.fabText}>Apply Leave</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
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
        paddingBottom: 80,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    leaveCard: {
        marginBottom: 16,
    },
    leaveHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    typeBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    typeText: {
        color: '#374151',
        fontWeight: '600',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        marginLeft: 8,
        color: '#4B5563',
        fontWeight: '500',
    },
    daysText: {
        marginLeft: 8,
        color: '#9CA3AF',
    },
    fab: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#FF6B6B',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    fabText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
    formCard: {
        padding: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4B5563',
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        color: '#1F2937',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 12,
    },
    cancelText: {
        color: '#6B7280',
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    submitText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
