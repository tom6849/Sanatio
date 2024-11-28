import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';  
const { width } = Dimensions.get('window');

const ProgressBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Médicaments pris aujourd'hui</Text>
            <Bar progress={2/5} width={width * 0.6} height={14} borderRadius={50} unfilledColor='#D3E1FE' color='#4D82F3' borderColor='transparent' />
            <Text style={styles.subTitle}>2 / 5 médicaments</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
    },
    title: {
        fontSize: 18,
        color: '#545A61',
        paddingBottom : 5,
        fontWeight : 'regular'
    },
    subTitle: {
        fontSize: 14,
        color: 'gray', 
        paddingTop : 5,
        fontWeight : 'regular'
    },
});

export default ProgressBar;
