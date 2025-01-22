import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Medicaments from './Medicaments';
import LinearGradient from 'react-native-linear-gradient';

const MedicationRecap = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aujourd'hui</Text>
            <ScrollView style={styles.info} horizontal  showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.medicament}>
                    <Medicaments />
                </View>
                <View style={styles.medicament}>
                    <Medicaments />
                </View>
                <View style={styles.medicament}>
                    <Medicaments />
                </View>
            </ScrollView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height : '40%',
    },
    title: {
        color : "#0073C5",
        fontSize : 18,
    },
    info: {
        flexDirection: 'row',
        flex : 1, 
        paddingLeft : 10,
    },
    scrollContent: {
        justifyContent: 'center', 
        alignItems: 'center',    
    },
    medicament: {
        marginRight: 16,
    },
    
});

export default MedicationRecap;
