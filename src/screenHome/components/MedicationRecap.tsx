import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonSeeMore from './ButtonSeeMore';
import Medicaments from './Medicaments';

const MedicationRecap = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aujourd'hui</Text>
            <View style={styles.info}>
                    <Medicaments />
                    <Medicaments />
                <View style={styles.button}>
                    <ButtonSeeMore />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    info: {
        flex: 1, 
        backgroundColor: 'white',
        padding: 16, 
        marginTop: 8, 
        borderRadius: 5, 
        elevation: 3, 
    },
    title: {
        color: "#0073C5",
        fontSize: 18,
    },
    text: {
        color: '#002467',
        fontSize: 20, 
        fontWeight: 'semibold',
    },
    button: {
        alignSelf: 'flex-end',
    },
    
});

export default MedicationRecap;
