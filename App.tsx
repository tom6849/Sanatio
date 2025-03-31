import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MedicationProvider } from './src/context/MedicationContext';
import { User } from './src/type/User';
import TabsNavigator from './src/Navigation/TabsNavigator';
import OnBoarding from './src/screenOnBoarding/OnBoarding';
import RegisterScreen from './src/screenOnBoarding/RegisterScreen';
import Connect from './src/screenOnBoarding/Connect';
import Loader from './src/screenOnBoarding/Loader';

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
          setOnBoarding(false);
          setUser(JSON.parse(savedUser));
        }else{
          setOnBoarding(true)
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
        setOnBoarding(false); 
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'utilisateur', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('lastUser');
      setUser(null);
      setOnBoarding(true);
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  if (loading) return <Loader />;

  if (onBoarding == true) {
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
            initialParams={{ setUser: handleSetUser }}
          />
          <Stack.Screen
            name="Connect"
            component={Connect}
            options={{ headerShown: false }}
            initialParams={{ setUser: handleSetUser }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <MedicationProvider>
      <NavigationContainer>
        <TabsNavigator handleLogout={handleLogout} />
      </NavigationContainer>
    </MedicationProvider>
  );
};

export default App;
