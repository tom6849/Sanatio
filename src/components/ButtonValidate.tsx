import React, { useMemo, useCallback } from 'react';
import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import { useMedication } from '../context/MedicationContext';
import { Medication } from '../type/Medication';
import { isMedicationTaken } from '../utils/isMedicationTaken';
import { updateMedicationStatus } from '../utils/updateMedicationStatus';

const ButtonValidate = ({ medication, date }: { medication: Medication, date: string }) => {
    const { setMedications, medications } = useMedication();

    const isTaken = useMemo(() => isMedicationTaken( medication, date), [ medication, date]);

    const message = isTaken ? "Médicament Pris !" : "Prendre le médicament";

    const handlePress = useCallback(() => {
        console.log(medication.pill)
        if (!medication.pill || medication.pill <= 0) {
            Alert.alert("Stock épuisé", "Vous n'avez plus de pilules pour ce médicament.");
            return; 
        }

        const updatedMedications = updateMedicationStatus(medications, medication.id, date).map(med => 
            med.id === medication.id ? { ...med, pill: (med.pill ?? 0) - 1 } : med
        );

        setMedications(updatedMedications);

        const updatedMedication = updatedMedications.find(med => med.id === medication.id);
        if (updatedMedication && updatedMedication.pill === 0) {
            Alert.alert("Stock épuisé", "Vous venez de prendre la dernière pilule.");
        }
    }, [medications, medication.id, date, setMedications]);

    return (
        <Pressable
            style={[styles.button, isTaken && styles.buttonClicked]}
            onPress={handlePress}
        >
            <Text style={styles.text}>{message}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#0073C5',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonClicked: {
        backgroundColor: '#28a745',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ButtonValidate;
