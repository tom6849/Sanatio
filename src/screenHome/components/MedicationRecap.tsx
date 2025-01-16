import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Medicaments from './Medicaments';

const MedicationRecap = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aujourd'hui</Text>
            <ScrollView style={styles.info} horizontal  showsHorizontalScrollIndicator={false}>
                <View style={styles.medicament}>
                    <Medicaments />
                </View>
                <View style={styles.medicament}>
                    <Medicaments />
                </View>
                <View style={styles.medicament2}>
                    <Medicaments />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.7,
    },
    title: {
        color : "#0073C5",
        fontSize : 18,
        marginBottom: 8,
    },
    info: {
        flexDirection: 'row',
    },
    medicament: {
        marginRight: 16,
    },
    medicament2: {
    }
});

export default MedicationRecap;
