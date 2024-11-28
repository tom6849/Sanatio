import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ImgArrowRight from '../img/ImgArrowRight';

const ButtonSeeMore = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Voir plus </Text>  
            <ImgArrowRight/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width : 126,
        backgroundColor: '#0073C5',
        paddingVertical: 8,
        paddingHorizontal : 24,
        borderRadius: 5,
        alignItems: 'center', 
        flexDirection : 'row',
        justifyContent : 'center'


    },
    text: {
        color: '#FFFFFF', 
        fontSize: 14,
        fontWeight: 'regular',
    },
});

export default ButtonSeeMore;
