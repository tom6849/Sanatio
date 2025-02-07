import React, { useEffect, useMemo, useCallback } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../type/Medication';

const ButtonValidate = ({ medication, date }: { medication: Medication, date: string }) => {
    const { setMedications, medications } = useMedication();

    /**
     * Vérifie si le médicament a été pris à cette date.
     */
    const isTaken = useMemo(() => {
        if (!medications) return false;
        const updatedMed = medications.find((med) => med.id === medication.id);
        if (!updatedMed) return false;
        return updatedMed.date.some((entry) => entry.date === date && entry.taken);
    }, [setMedications, medication.id, date]);

    /**
     * Définit dynamiquement le message du bouton.
     */
    const message = isTaken ? "Médicament Pris !" : "Prendre le médicament";

    /**
     * Fonction de mise à jour des médicaments.
     */
    const handlePress = useCallback(() => {
        if (!medications) return;
        const updatedMedications = medications.map((med) =>
            med.id === medication.id
                ? {
                    ...med,
                    date: med.date.map((entry) =>
                        entry.date === date ? { ...entry, taken: true } : entry
                    ),
                }
                : med
        );
        setMedications(updatedMedications);
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
