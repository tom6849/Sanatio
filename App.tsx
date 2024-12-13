// App.tsx

import 'react-native-gesture-handler'; 
import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './src/components/screen/SettingsScreen';
import HomeScreen from './src/screenHome/HomeScreen';
import PillScreen from './src/components/OcrScanner';
import CalendarScreen from './src/screenCalendar/CalendarScreen';
import ImgHome from './src/img/ImgHome';
import ImgCalendar from './src/img/ImgCalendar';
import ImgPill from './src/img/ImgPill';
import ImgSettings from './src/img/ImgSettings';



const Tab = createBottomTabNavigator();

const App = () => {
    const homeBadgeCount = 0; 
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                tabBarStyle: { 
                    height: 60
                 },
                tabBarLabelStyle: {
                    marginBottom: 5, 
                    fontSize: 13, 
                },
                }}>
                <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
                            <ImgHome size={size} color={color} />
                        </View>
                    ),
                    tabBarBadge: homeBadgeCount > 0 ? homeBadgeCount : undefined, 
                }} 
                />

                <Tab.Screen 
                name="Calendar" 
                component={CalendarScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => 
                    <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
                        <ImgCalendar size={size} color={color} />
                    </View>
                }} 
                />

                <Tab.Screen name="Pill"
                 component={PillScreen} 
                 options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => 
                        <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
                            <ImgPill size={size} color={color} />
                        </View>
                    
                }} 
                />

                <Tab.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => 
                    <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
                        <ImgSettings size={size} color={color} />
                    </View>
                }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

// Styles
const styles = StyleSheet.create({
    iconContainer: {
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, 
    },
});

export default App;