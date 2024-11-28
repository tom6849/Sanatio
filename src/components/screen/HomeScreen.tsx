import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderHome from '../HeaderHome';
import MedicationRecap from '../MedicationRecap';
import QuickAction from '../QuickAction';


const HomeScreen = () => (
    <View style={styles.container}>
        <HeaderHome ></HeaderHome>
        <View style={styles.info} >
            <MedicationRecap></MedicationRecap>
            <QuickAction></QuickAction>
        </View>
    </View>
    
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    info: {
        flex: 1, 
        paddingHorizontal: 32,
        paddingVertical: 16
    },
});




export default HomeScreen;
