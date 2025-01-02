import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Settings from '../img/ImgSettings';
import ContainerProfil from './components/ContainerProfil';
import ContainerChoice from './components/ContainerChoice';
import Stats from './components/Stats';

const ProfileScreen = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);

  const handleChoiceChange = (choice: number | null) => {
    setSelectedButton(choice);
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient 
        colors={['#4D82F3', '#C9E0F8']}
        style={styles.linearGradient}
        start={{ x: 0.9, y: 0 }}
      >
        <View style={styles.logo}>
          <Settings size={34} />
        </View>
        <ContainerProfil />
      </LinearGradient>

      <ContainerChoice onChoiceChange={handleChoiceChange} />

      <View style={styles.dynamicContent}>
        {selectedButton === 0 ? <Stats /> : null}
        {selectedButton === 1 ? <Text style={styles.text}>Historique sélectionné</Text> : null}
        {selectedButton === 2 ? <Text style={styles.text}>Ordonnance sélectionnée</Text> : null}
      </View>
    </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default ProfileScreen;
