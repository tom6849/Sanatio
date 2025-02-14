import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgessBar';
import { User } from '../type/User';
import { getStoredUser } from '../services/userService';

const HeaderHome = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getStoredUser();
      setUser(fetchedUser);
    };

    fetchUser();

  }, []);

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
