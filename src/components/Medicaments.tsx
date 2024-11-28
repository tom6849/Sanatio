import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import ImgInfo from '../img/ImgInfo';


const { width } = Dimensions.get('window');
const Medicaments = () => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image 
                    source={require('../img/Exemple.png')} 
                    style={styles.image} 
                    resizeMode="cover" 
                />
                <View  >
                    <Text  style={styles.title}>Dafalgan 500mg</Text>
                    <Text style={styles.description}>Dans une heure, pendant le repas </Text>
                </View>
            </View>
            <ImgInfo/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection : 'row',
        flex : 1 
    },
    image: {
        width: width * 0.15, 
        height: width * 0.15, 
        marginRight : 5 
    },
    info: {
        flex : 1 , 
        alignItems : 'flex-end'
    }, 
    title : {
        fontSize : 18, 
        color: '#292F35'
    },
    description: {
        fontSize : 11,
        color: '#B6BDC4'

    },
});

export default Medicaments;
