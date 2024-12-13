import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const ButtonValidate = () => {
    const [message, setMessage] = useState<string>("Prendre le médicament");
    const [clicked, setClicked] = useState<boolean>(false); 

    const handlePress = () => {
        setMessage("Médicament Pris !");
        setClicked(true); 
    };

    return (
        <Pressable 
            style={[styles.button, clicked && styles.buttonClicked]} 
            onPress={handlePress}
        >
            <Text style={styles.text}>{message}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#0073C5', 
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonClicked: {
        backgroundColor: '#729D09', 
    },
    text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'regular',
    },
});

export default ButtonValidate;
