// App.tsx

import 'react-native-gesture-handler'; 
import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilScrenn from './src/screenProfil/ProfilScreen';
import HomeScreen from './src/screenHome/HomeScreen';
import Pharmacy from './src/screenPharmarcie/PharmacieScreen';
import CalendarScreen from './src/screenCalendar/CalendarScreen';

import ImgHome from './src/img/ImgHome';
import ImgCalendar from './src/img/ImgCalendar';
import ImgPill from './src/img/ImgPill';
import ImgSettings from './src/img/ImgSettings';
import ImgProfil from './src/img/ImgProfil';



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

                <Tab.Screen name="Pharmacy"
                 component={Pharmacy} 
                 options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => 
                        <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
                            <ImgPill size={size} color={color} />
                        </View>
                    
                }} 
                />

                <Tab.Screen 
                name="You" 
                component={ProfilScrenn} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => 
                    <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
                        <ImgProfil size={size} color={color} />
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