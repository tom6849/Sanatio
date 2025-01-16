import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ScanOrd = () => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Page Scanner</Text>
    </View>
);


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F6FB',
        paddingHorizontal: 20,
    },
    screenText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#002467',
        textAlign: 'center',
    },
   
});

export default ScanOrd;
