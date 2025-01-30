import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Medication, useMedication } from '../../context/MedicationContext';

const ButtonValidate = ({ id }: { id: string }) => {
    const [message, setMessage] = useState<string>("Prendre le médicament");
    const [clicked, setClicked] = useState<boolean>(false);
    const [isTaken, setIsTaken] = useState<boolean>(false);
    const { medications, setMedications } = useMedication(); 
    useEffect(() => {
    }, [setMedications]);
    const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');

    useEffect(() => {
        const checkIfTaken = async () => {
            if (medications != null) {
                const medicationIndex = medications.findIndex((med: Medication) => med.id == id);
                if (medicationIndex !== -1) {
                    const isTakenToday = medications[medicationIndex].date.some((entry: { date: string; taken: boolean }) =>
                        entry.date == todayIso && entry.taken == true
                    );
                    setIsTaken(isTakenToday); 
                    setMessage("Médicament Pris !");
                }
            }
        };
        checkIfTaken();
    }, []); 
    

    const handlePress = async () => {
        try {
            const storedMedications = await AsyncStorage.getItem('medications');
            if (storedMedications) {
                const medicationsList = JSON.parse(storedMedications);
                const medicationIndex = medicationsList.findIndex((med: Medication) => med.id === id);
                if (medicationIndex !== -1) {
                    medicationsList[medicationIndex].date = medicationsList[medicationIndex].date.map((entry: { date: string; taken: boolean }) =>
                        entry.date === todayIso
                            ? { ...entry, taken: true }  
                            : entry  
                    );
                    setMedications([...medicationsList]);
                    setIsTaken(true); 
                    setMessage("Médicament Pris !");
                    setClicked(true);
                } else {
                    console.log(`Médicament ${id} introuvable.`);
                }
            } else {
                console.log('Aucun médicament trouvé dans le stockage');
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du médicament :", error);
        }
    };

    return (
        <Pressable 
            style={[styles.button, clicked && styles.buttonClicked, isTaken && styles.buttonClicked]} 
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
