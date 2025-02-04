import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Settings from '../img/ImgSettings';
import ContainerProfil from './components/ContainerProfil';
import ContainerChoice from './components/ContainerChoice';
import Stats from './components/Stats';
import Ordonnance from './components/Ordonnance';
import Effets from './components/Effets';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SettingsPage from './components/Settings';

export type typeRoute = {
  Profile: undefined;
  SettingsPage: { handleLogout: () => void }; 
};

const Stack = createStackNavigator<typeRoute>();

const ProfileScreen = ({ handleLogout }: { handleLogout: () => void }) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);
  const handleChoiceChange = (choice: number | null) => {
    setSelectedButton(choice);
  };

  const navigation = useNavigation<NavigationProp<typeRoute>>();

  const handlePress = () => {
    navigation.navigate('SettingsPage', { handleLogout }); 
  };

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
      >
        {() => (
          <View style={styles.container}>
            <LinearGradient
              colors={['#4D82F3', '#C9E0F8']}
              style={styles.linearGradient}
              start={{ x: 0.9, y: 0 }}
            >
              <TouchableOpacity onPress={handlePress}>
                <View style={styles.logo}>
                  <Settings size={34} />
                </View>
              </TouchableOpacity>
              <ContainerProfil />
            </LinearGradient>

            <ContainerChoice onChoiceChange={handleChoiceChange} />

            <View style={styles.dynamicContent}>
              {selectedButton === 0 && <Stats />}
              {selectedButton === 1 && <Effets />}
              {selectedButton === 2 && <Ordonnance />}
            </View>
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="SettingsPage"
        component={SettingsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    height: 250,
    width: '100%',
    alignItems: 'flex-end',
  },
  logo: {
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
  },
  dynamicContent: {
    flex: 1,
  },
});

export default ProfileScreen;
