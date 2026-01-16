import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, Image as ImageIcon, Settings } from 'lucide-react-native';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FF6B6B',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarStyle: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    position: 'absolute',
                    bottom: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                }
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color }) => <Home color={color} size={24} />,
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="Attendance"
                component={AttendanceScreen}
                options={{
                    tabBarIcon: ({ color }) => <Calendar color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="Gallery"
                component={GalleryScreen}
                options={{
                    tabBarIcon: ({ color }) => <ImageIcon color={color} size={24} />
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color }) => <Settings color={color} size={24} />
                }}
            />
        </Tab.Navigator>
    );
}
