import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilScrenn from './src/screenProfil/ProfilScreen';
import HomeScreen from './src/screenHome/HomeScreen';
import Pharmacy from './src/screenPharmarcie/PharmacieScreen';
import CalendarScreen from './src/screenCalendar/CalendarScreen';
import { MedicationProvider } from './src/context/MedicationContext';
import { useMedication, Medication } from './src/context/MedicationContext';
import ImgHome from './src/img/ImgHome';
import ImgCalendar from './src/img/ImgCalendar';
import ImgPill from './src/img/ImgPill';
import ImgProfil from './src/img/ImgProfil';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <MedicationProvider> 
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </MedicationProvider>
  );
};

const Tabs = () => {
  const { medToday } = useMedication();
  const [count, setCount] = useState(0);
  const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');

  useEffect(() => {
    const checkMedToTake = () => {
      if (medToday != null) {
        let medsToTake = 0;
        medToday.forEach((elem) => {
          const value = elem.date;
          value.forEach((entry) => {
            if (!entry.taken && entry.date ==todayIso ) {
              medsToTake += 1;
            }
          });
        });
        setCount(medsToTake);
      }
    };
    checkMedToTake();
  }, [medToday]);
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? '#C9E0F8' : 'transparent' },
              ]}
            >
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
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? '#C9E0F8' : 'transparent' },
              ]}
            >
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
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? '#C9E0F8' : 'transparent' },
              ]}
            >
              <ImgPill size={size} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="You"
        component={ProfilScrenn}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: focused ? '#C9E0F8' : 'transparent' },
              ]}
            >
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

export default App;
