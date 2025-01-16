import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Profil = () => {
    return (
        <View style={styles.profil}>
            <Image
                source={require('../../img/AvatarFemme.jpg')} 
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
