import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgessBar';
import { User } from '../../type/User'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderHome = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const checkUserUpdate = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('lastUser');
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                if (JSON.stringify(parsedUser) !== JSON.stringify(user)) { 
                    setUser(parsedUser); 
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur", error);
        }
    };

    const interval = setInterval(checkUserUpdate, 0);

    return () => clearInterval(interval); 
}, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bonjour {user?.username} !</Text>
      <ProgressBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 'auto',
    width: '100%',
    rowGap: 18,
    paddingVertical: 16,
  },
  title: {
    color: '#002467',
    fontSize: 20,
    fontWeight: 'semibold',
  },
});

export default HeaderHome;
