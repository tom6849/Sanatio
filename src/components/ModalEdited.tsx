import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { Medication } from '../type/Medication';
import { useMedication } from '../context/MedicationContext';
import TimePicker from './TimePicker';
import DatePickers from './DatePicker';
import SelectedDay from './SelectDay';
import { addLocalPrescription , isCurrentDateBeforeEndDate } from '../utils/medicationUtils'; 
import MedicationQuantityInput from './MedicationQuantityInput';

type EditMedicationModalProps = {
  modalVisible: boolean;
  medication: Medication;
  setModalVisible: (visible: boolean) => void;
};
const EditMedicationModal = ({modalVisible, medication, setModalVisible}: EditMedicationModalProps) => {
  const { medications, setMedications } = useMedication();
  const [editedTime, setEditedTime] = useState(medication.time);
  const [editedStartDate, setEditedStartDate] = useState(medication.isoStartDate);
  const [editedEndDate, setEditedEndDate] = useState(medication.isoEndDate);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(medication.jours || []);
  const [nbPill, setNbPill] = useState(medication.pill || 0);

  useEffect(() => {
    if (modalVisible) {
      setNbPill(medication.pill); 
      setEditedTime(medication.time);
      setEditedStartDate(medication.isoStartDate);
      setEditedEndDate(medication.isoEndDate);
      setSelectedDays(medication.jours || []);
    }
  }, [modalVisible, medication]);


  const handleSaveChanges = async () => {
    if (!isCurrentDateBeforeEndDate( editedStartDate || "", editedEndDate || "")) {
          Alert.alert(
            'Erreur',
            'La date de début ne peut pas être après la date de fin.',
            [{ text: 'OK' }],
            { cancelable: false }
          );
          return; 
        }
    try {
      
      console.log(editedTime)
      const isStartDateChanged = editedStartDate !== medication.isoStartDate;
      const isEndDateChanged = editedEndDate !== medication.isoEndDate;
      const isDaysChanged = JSON.stringify(selectedDays) !== JSON.stringify(medication.jours);
      const other = editedTime !== medication.time || nbPill !== medication.pill;
  
      if (!isStartDateChanged && !isEndDateChanged && !isDaysChanged) {
        if (!other) {
          Alert.alert('Aucune modification', 'Aucune modification n\'a été effectuée.');
          return;
        }
  
        const updatedMedication = {
          ...medication,
          time: editedTime,
          pill: nbPill,
        };
        console.log(updatedMedication)
  
        const updatedMedications = medications?.map((med) =>
          med.id === medication.id ? updatedMedication : med
        );
  
        setMedications(updatedMedications!);
        setModalVisible(false);
        return;
      }
  
      const newMedication = await addLocalPrescription(
        editedStartDate || medication.isoStartDate || "",  
        editedEndDate || medication.isoEndDate || "",      
        editedTime || medication.time || "",              
        selectedDays,
        medication,
        nbPill
      );

      const medupdated = medications?.map((med) =>
        med.id === medication.id ? newMedication : med
      );
  
      setMedications(medupdated);
      setModalVisible(false);
    } catch (error) {
      console.error('Erreur lors de la modification/ajout du médicament:', error);
    }
  };
  
  
  
  
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modifier le médicament</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <TimePicker
              time={editedTime ?? ""}
              onTimeChange={setEditedTime}
              showTimePicker={showTimePicker}
              setShowTimePicker={setShowTimePicker}
              med={medication.time!}
            />
            <DatePickers
              label="Date de début"
              med={medication.isoStartDate!}
              date={editedStartDate ?? ""}
              onDateChange={setEditedStartDate}
              showDatePicker={showStartDatePicker}
              setShowDatePicker={setShowStartDatePicker}
            />
            <DatePickers
              med={medication.isoEndDate!}
              label="Date de fin"
              date={editedEndDate ?? ""}
              onDateChange={setEditedEndDate}
              showDatePicker={showEndDatePicker}
              setShowDatePicker={setShowEndDatePicker}

            />
            
            <SelectedDay onSelectDays={setSelectedDays} defaultSelectedDays={selectedDays} />
             <MedicationQuantityInput  nbPill={nbPill} setNbPill={setNbPill} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Sauvegarder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4C6EF5',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: '#4C6EF5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default EditMedicationModal;
