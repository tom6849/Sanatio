import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useMedication } from '../../context/MedicationContext';
import {Medication} from '../../type/Medication'

const ButtonValidate = ({ id,date }: { id: string, date:string }) => {
    const [message, setMessage] = useState<string>("Prendre le médicament");
    const [isTaken, setIsTaken] = useState<boolean>(false);
    const { medications, setMedications } = useMedication(); 
    useEffect(() => {
    }, [setMedications]);

    useEffect(() => {
        const checkIfTaken = async () => {
            if (medications != null) {
                const medicationIndex = medications.findIndex((med: Medication) => med.id == id);
                if (medicationIndex !== -1) {
                    const takenEntry = medications[medicationIndex].date?.find(elem => elem.date === date);
                    if (takenEntry) {
                        setIsTaken(takenEntry.taken);
                        setMessage(takenEntry.taken ? "Médicament Pris !" : "Prendre le médicament");
                    }
                }
            }
        };
        checkIfTaken();
    }, [medications, id, date]); 
    
    

    const handlePress = async () => {
        try {
            if (medications) {
                const medicationIndex = medications.findIndex((med: Medication) => med.id === id);
                if (medicationIndex !== -1) {
                    const updatedMedications = medications.map((med, index) => {
                        if (index === medicationIndex) {
                            return {
                                ...med,
                                date: med.date?.map((entry) => 
                                    entry.date === date ? { ...entry, taken: true } : entry
                                )
                            };
                        }
                        return med;
                    });
    
                    setMedications(updatedMedications);
                    setMessage("Médicament Pris !");
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
