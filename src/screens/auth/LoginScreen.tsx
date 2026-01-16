import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const { login } = useAuth();

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSendOtp = () => {
        if (mobile.length !== 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
            Alert.alert('OTP Sent', 'Your OTP is 1234');
        }, 1000);
    };

    const handleLogin = async () => {
        if (otp.length !== 4) {
            Alert.alert('Invalid OTP', 'Please enter the 4-digit OTP');
            return;
        }
        setLoading(true);
        try {
            await login(mobile, otp);
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid OTP or Network Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={{ fontSize: 40 }}>⭐</Text>
                    </View>
                    <Text style={styles.title}>Little Stars</Text>
                    <Text style={styles.subtitle}>Pre-Primary School</Text>
                </View>

                {/* Login Form */}
                <View style={styles.card}>
                    {!otpSent ? (
                        <>
                            <Text style={styles.cardTitle}>Welcome Parent!</Text>
                            <Text style={styles.cardSubtitle}>Login with your registered number</Text>

                            <View style={styles.inputContainer}>
                                <Text>Phone: </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mobile Number"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    value={mobile}
                                    onChangeText={setMobile}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleSendOtp}
                                disabled={loading}
                                style={[styles.button, loading && styles.buttonDisabled]}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.buttonText}>Get OTP</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.cardTitle}>Verify OTP</Text>
                            <Text style={styles.cardSubtitle}>Enter OTP sent to +91 {mobile}</Text>

                            <View style={styles.inputContainer}>
                                <Text>OTP: </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="1234"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    value={otp}
                                    onChangeText={setOtp}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleLogin}
                                disabled={loading}
                                style={[styles.button, styles.buttonSuccess, loading && styles.buttonDisabled]}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.buttonText}>Verify & Login</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setOtpSent(false); setOtp(''); }}>
                                <Text style={styles.linkText}>Change Number</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
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
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 96,
        height: 96,
        backgroundColor: 'white',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        elevation: 2,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
    subtitle: {
        fontSize: 18,
        color: '#6B7280',
    },
    card: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 24,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        backgroundColor: '#F9FAFB',
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#1F2937',
    },
    button: {
        backgroundColor: '#FF6B6B',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSuccess: {
        backgroundColor: '#10B981',
        marginBottom: 16,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#FF6B6B',
        textAlign: 'center',
        fontWeight: '500',
    },
});
