import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screenHome/HomeScreen';
import Pharmacy from '../screenPharmarcie/PharmacieScreen';
import CalendarScreen from '../screenCalendar/CalendarScreen';
import ProfilScrenn from '../screenProfil/ProfilScreen';
import { useMedication } from '../context/MedicationContext';
import ImgHome from '../img/ImgHome';
import ImgCalendar from '../img/ImgCalendar';
import ImgPill from '../img/ImgPill';
import ImgProfil from '..//img/ImgProfil';
import { User } from '..//type/User';

const Tab = createBottomTabNavigator();

interface TabsNavigatorProps {
  user: User | null;
  handleLogout: () => void;
}

const TabsNavigator: React.FC<TabsNavigatorProps> = ({ user, handleLogout }) => {
  const { medToday } = useMedication();
  const [count, setCount] = useState(0);
  const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');

  useEffect(() => {
    if (medToday) {
      const medsToTake = medToday.reduce((acc, elem) => {
        return acc + elem.date.filter((entry) => !entry.taken && entry.date === todayIso).length;
      }, 0);
      setCount(medsToTake);
    }
  }, [medToday]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { marginBottom: 5, fontSize: 13 },
      }}
    >
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
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
              <ImgCalendar size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pharmacy"
        component={Pharmacy}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
              <ImgPill size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="You"
        children={() => <ProfilScrenn handleLogout={handleLogout} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.iconContainer, { backgroundColor: focused ? '#C9E0F8' : 'transparent' }]}>
              <ImgProfil size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default TabsNavigator;
