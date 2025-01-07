import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import CloseModal from '../../img/CloseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectedDay from './SelectDay';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../context/MedicationContext';



type MedicationModalProps = {
  visible: boolean;
  onClose: () => void;
  medication: Medication | null;
};

const MedicationModal: React.FC<MedicationModalProps> = ({ visible, onClose, medication }) => {
  const { medications, setMedications } = useMedication();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});

  if (!medication) return;

  const handleSelectDays = (days: { [key: string]: boolean }) => {
    setSelectedDays(days);
  };

  const convertToISODate = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const generateDatesToTake = (): string[] => {
    const dates: string[] = [];
    let currentDate = new Date(convertToISODate(startDate));
    const FinDate = new Date(convertToISODate(endDate));
    while (currentDate <= FinDate) {
      const dayName = currentDate.toLocaleString('fr-FR', { weekday: 'long' }).toLowerCase();
      if (selectedDays[dayName]) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const addLocalPrescription = async (): Promise<void> => {
    try {
      const isoStartDate = convertToISODate(startDate);
      const isoEndDate = convertToISODate(endDate);
      const newMedication: Medication = {
        isoStartDate,
        isoEndDate,
        name: medication.name ,
        pharmaForm: medication.pharmaForm,
        administrationRoutes: medication.administrationRoutes,
        time,
        jours: selectedDays,
        date: generateDatesToTake()
      };
      const storedMedications = await AsyncStorage.getItem('medications');
      const existingMedications: Medication[] = storedMedications ? JSON.parse(storedMedications) : [];
      existingMedications.push(newMedication);
      setMedications(existingMedications);
      Alert.alert('Succès', 'Le médicament a été ajouté avec succès.');
      setStartDate('');
      setEndDate('');
      setTime('');
      setSelectedDays({});
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du médicament :", error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du médicament.');
    }
  };

  const handleAddMedication = (): void => {
    if (!startDate || !endDate || !time) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }
    addLocalPrescription();
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseModal size={40} color="#1e3a8a" />
          </Pressable>

          <Text style={styles.modalTitle}>{medication?.name}</Text>
          <Text style={styles.modalSubTitle}>Type : {medication?.pharmaForm}</Text>
          <Text style={styles.modalSubTitle}>Endroit : {medication?.administrationRoutes}</Text>

          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.label}>Date de début (DD/MM/YYYY) :</Text>
            <TextInput
              style={styles.input}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Date de fin (DD/MM/YYYY) :</Text>
            <TextInput
              style={styles.input}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Heure (HH:MM) :</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
              keyboardType="numeric"
            />
            <SelectedDay onSelectDays={handleSelectDays} />
          </ScrollView>

          <Pressable style={styles.addButton} onPress={handleAddMedication}>
            <Text style={styles.addButtonText}>Ajouter le médicament</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  modalSubTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  addButton: {
    paddingVertical: 12,
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default MedicationModal;
