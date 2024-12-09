import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgessBar';

const HeaderHome = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bonjour Denis !</Text>
            <ProgressBar/>
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
        rowGap : 18,
        paddingVertical : 16
    },
    title: {
        color: '#002467',
        fontSize: 20, 
        fontWeight: 'semibold'
    },
});

export default HeaderHome;
