import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { User } from '../type/User';
import { getAvatarImage } from '../utils/avatarUtils';  

interface ProfilProps {
  user: User;
  size?: number;  
}

const Profil = ({ user, size = 150 }: ProfilProps) => {
  const avatarImage = user.selectedAvatar ? getAvatarImage(user.selectedAvatar) : getAvatarImage('avatar-1');
  return (
    <View style={[styles.profil, { height: size, width: size, borderRadius: size / 2 }]}>
      <Image
        source={avatarImage}
        style={[styles.image, { height: size, width: size }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profil: {
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: '#002467',
    borderWidth: 5,
    top: 0,
    left: '50%',
    transform: [{ translateY: -75 }, { translateX: -75 }],
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default Profil;
