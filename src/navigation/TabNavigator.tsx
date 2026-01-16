import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, Images } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AttendanceScreen from '../screens/attendance/AttendanceScreen';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// THEME
const THEME = {
    primary: '#6366F1',   // Indigo 500
    background: '#FFFFFF',
    inactive: '#9CA3AF',  // Gray 400
    text: '#1F2937',      // Dark Gray
};

// Minimalist Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabContainer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const Icon = options.tabBarIcon;

                // Simple Fade/Scale Animation
                const anim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

                useEffect(() => {
                    Animated.timing(anim, {
                        toValue: isFocused ? 1 : 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }, [isFocused]);

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconWrapper}>
                            {/* Safer Icon Rendering */}
                            {typeof Icon === 'function' ? Icon({
                                color: isFocused ? THEME.primary : THEME.inactive,
                                size: 24
                            }) : <View style={{ width: 24, height: 24 }} />}

                            {/* Animated Dot Indicator */}
                            <Animated.View style={[
                                styles.activeDot,
                                {
                                    opacity: anim,
                                    transform: [{ scale: anim }]
                                }
                            ]} />
                        </View>

                        <Animated.Text style={[
                            styles.label,
                            {
                                color: isFocused ? THEME.primary : THEME.inactive,
                                fontWeight: isFocused ? '600' : '500'
                            }
                        ]}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color, size }: any) => <Home color={color} size={size} />,
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="Attendance"
                component={AttendanceScreen}
                options={{
                    tabBarIcon: ({ color, size }: any) => <Calendar color={color} size={size} />,
                    tabBarLabel: 'Calendar'
                }}
            />
            <Tab.Screen
                name="Gallery"
                component={GalleryScreen}
                options={{
                    tabBarIcon: ({ color, size }: any) => <Images color={color} size={size} />,
                    tabBarLabel: 'Gallery'
                }}
            />

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6', // Very subtle border
        paddingTop: 12,
        // Soft Shadow for "Lifted" feel without floating
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        alignItems: 'center',
        height: 32, // Fixed height to prevent jumping
        justifyContent: 'center',
        marginBottom: 4,
    },
    activeDot: {
        position: 'absolute',
        bottom: -6, // Place below icon
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: THEME.primary,
    },
    label: {
        fontSize: 10,
        marginBottom: 2,
    }
});
