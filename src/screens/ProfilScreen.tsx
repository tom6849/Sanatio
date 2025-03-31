import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Settings from '../img/ImgSettings';
import ContainerProfil from '../components/ContainerProfil';
import ContainerChoice from '../components/ContainerChoice';
import Ordonnance from '../components/Ordonnance';
import Effets from '../components/Effets';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';
import SettingsPage from './Settings.tsx';
import Stats from '../components/Stats';

export type typeRoute = {
  Profile: undefined;
  SettingsPage: { handleLogout: () => void }; 
};


const Stack = createStackNavigator<typeRoute>();

type ProfileScreenProps = {
  navigation: NavigationProp<typeRoute>;
  handleLogout: () => void;
};

const ProfileScreen = ({ handleLogout }: ProfileScreenProps) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);
  const handleChoiceChange = (choice: number | null) => {
    setSelectedButton(choice);
  };

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" options={{ headerShown: false }}>
        {({ navigation }) => (
          <View style={styles.container}>
            <LinearGradient
              colors={['#4D82F3', '#C9E0F8']}
              style={styles.linearGradient}
              start={{ x: 0.9, y: 0 }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('SettingsPage')}>
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
      <Stack.Screen name="SettingsPage" options={{ headerShown: false }}>
        {(props) => <SettingsPage {...props} handleLogout={handleLogout} />}
      </Stack.Screen>
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
