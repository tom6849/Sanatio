import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Medication } from '../../type/Medication';
import { Alert } from 'react-native';
import { useMedication } from '../../context/MedicationContext';

type EditMedicationModalProps = {
  modalVisible: boolean;
  selectedMedication: Medication | null;
  editedTime: string;
  editedStartDate: string;
  editedEndDate: string;
  medication : Medication;
  setEditedTime: (time: string) => void;
  setEditedStartDate: (startDate: string) => void;
  setEditedEndDate: (endDate: string) => void;
  setModalVisible: (visible: boolean) => void;
};

const modalEdited = ({modalVisible,selectedMedication,editedTime,editedStartDate,editedEndDate, medication,setEditedTime,setEditedStartDate,setEditedEndDate,setModalVisible,}: EditMedicationModalProps) => {
  const { medications, setMedications } = useMedication();
  const validateDate = (date: string) => {
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    return datePattern.test(date);
  };

  const validateTime = (time: string) => {
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timePattern.test(time);
  };

  const convertToISODate = (date: string): string => {
    const [year, month, day] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const generateDatesToTake = () => {
    const dates: { date: string; taken: boolean }[] = [];
    let currentDate = new Date(convertToISODate(editedStartDate));
    const finDate = new Date(convertToISODate(editedEndDate));
    const selectedDays = medication.jours
  
    while (currentDate <= finDate) {
      const dayName = currentDate.toLocaleString('fr-FR', { weekday: 'long' }).toLowerCase();
  
      if (selectedDays[dayName]) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push({ date: formattedDate, taken: false });
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  };


  const handleSaveChanges = (() =>{

    if (!validateDate(editedStartDate) || !validateDate(editedEndDate)) {
      Alert.alert('Veuillez entrer une date valide (YYYY-MM-DD)');
      return;
    }

    if (!validateTime(editedTime)) {
      Alert.alert('Veuillez entrer une heure valide (HH:mm)');
      return;
    }

    medication.time = editedTime;
    medication.isoStartDate = editedStartDate;
    medication.isoEndDate = editedEndDate;
    medication.date = generateDatesToTake()
    setMedications([medication]);

  })
  
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modifier le médicament</Text>

          <Text style={styles.label}>Heure de prise :</Text>
          <TextInput
            style={styles.input}
            value={editedTime}
            onChangeText={setEditedTime}
          />

          <Text style={styles.label}>Date de début :</Text>
          <TextInput
            style={styles.input}
            value={editedStartDate}
            onChangeText={setEditedStartDate}
          />

          <Text style={styles.label}>Date de fin :</Text>
          <TextInput
            style={styles.input}
            value={editedEndDate}
            onChangeText={setEditedEndDate}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 45,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
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

export default modalEdited;
