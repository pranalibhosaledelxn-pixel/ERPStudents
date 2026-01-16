import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import TabNavigator from './TabNavigator';

import HomeworkScreen from '../screens/homework/HomeworkScreen';
import NoticeBoardScreen from '../screens/notice/NoticeBoardScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import LearningScreen from '../screens/learning/LearningScreen';
import FeesScreen from '../screens/fees/FeesScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import TimetableScreen from '../screens/timetable/TimetableScreen';
import LeaveApplicationScreen from '../screens/leaves/LeaveApplicationScreen';
import LibraryScreen from '../screens/library/LibraryScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF6B6B" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Main" component={TabNavigator} />
                        <Stack.Screen name="Homework" component={HomeworkScreen} />
                        <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} />
                        <Stack.Screen name="Progress" component={ProgressScreen} />
                        <Stack.Screen name="Learning" component={LearningScreen} />
                        <Stack.Screen name="Fees" component={FeesScreen} />
                        <Stack.Screen name="Notifications" component={NotificationsScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="Timetable" component={TimetableScreen} />
                        <Stack.Screen name="Leaves" component={LeaveApplicationScreen} />
                        <Stack.Screen name="Library" component={LibraryScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
