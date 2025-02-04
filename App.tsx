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
import { useMedication } from './src/context/MedicationContext';
import ImgHome from './src/img/ImgHome';
import ImgCalendar from './src/img/ImgCalendar';
import ImgPill from './src/img/ImgPill';
import ImgProfil from './src/img/ImgProfil';
import OnBoarding from './src/OnBoarding';
import RegisterScreen from './src/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './src/type/User'
import Connect from './src/Connect'
import Loader from './src/Loader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {
  const [loading, setLoading] = useState(false);
  const [onBoarding, setOnBoarding] = useState(false);
  const [user, setUser] = useState<User | null>(null);



  useEffect(() => {
    const checkUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('lastUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
      } 
    };
    checkUser();
  }, []);
  
 

  const handleSetUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('lastUser', JSON.stringify(userData));
      setUser(userData);
      setLoading(true); 
      setTimeout(() => {
        setLoading(false); 
        setOnBoarding(true); 
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'utilisateur', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('lastUser');
      setUser(null);
      setOnBoarding(false); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  if (loading) return <Loader />;

  if (!onBoarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={RegisterScreen}
            options={{ headerShown: false }}
            initialParams={{
              setUser: handleSetUser,
              setOnBoarding: setOnBoarding,
            }}
          />
          <Stack.Screen
            name="Connect"
            component={Connect}
            options={{ headerShown: false }}
            initialParams={{
              setUser: handleSetUser,
              setOnBoarding: setOnBoarding,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <MedicationProvider>
      <NavigationContainer>
        <Tabs user={user} handleLogout={handleLogout} />
      </NavigationContainer>
    </MedicationProvider>
  );
};

const Tabs = ({ user, handleLogout }: { user: User | null, handleLogout: () => void }) => {
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
            if (!entry.taken && entry.date == todayIso) {
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
        children={() => <ProfilScrenn handleLogout={handleLogout} />}
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
