import React, { useEffect } from "react";
import { View, Image, StyleSheet } from 'react-native';
import { User } from '../../type/User';

const avatarImages = {
  'avatar-1': require('../../img/avatar/avatar-1.jpg'),
  'avatar-2': require('../../img/avatar/avatar-2.jpg'),
  'avatar-3': require('../../img/avatar/avatar-3.jpg'),
  'avatar-4': require('../../img/avatar/avatar-4.jpg'),
  'avatar-5': require('../../img/avatar/avatar-5.jpg'),
  'avatar-6': require('../../img/avatar/avatar-6.jpg'),
  'avatar-7': require('../../img/avatar/avatar-7.jpg'),
  'avatar-8': require('../../img/avatar/avatar-8.jpg'),
  'avatar-9': require('../../img/avatar/avatar-9.jpg'),
};

const Profil = ({ user }: { user: User }) => {
  const avatarImage = avatarImages[user.selectedAvatar as keyof typeof avatarImages] ;

  return (
    <View style={styles.profil}>
      <Image
        source={avatarImage}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profil: {
    height: 150,
    width: 150,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#002467',
    borderWidth: 5,
    top: 0,
    left: '50%',
    transform: [{ translateY: -75 }, { translateX: -75 }],
    elevation: 3,
    overflow: 'hidden'
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default Profil;
