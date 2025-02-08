import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Medication } from '../../type/Medication';
import { useMedication } from '../../context/MedicationContext';
import TimePicker from './TimePicker'; 
import DatePickers from './DatePicker';
import SelectedDay from './SelectDay';

type EditMedicationModalProps = {
  modalVisible: boolean;
  medication: Medication;
  setModalVisible: (visible: boolean) => void;
};

const EditMedicationModal = ({modalVisible,medication,setModalVisible,}: EditMedicationModalProps) => {
  const { medications, setMedications } = useMedication();
  const [editedTime, setEditedTime] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedEndDate, setEditedEndDate] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [days, setDays] = useState<{ [key: string]: boolean }>({});

  const convertToISODate = (date: string): string => {
    const [year, month, day] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const generateDatesToTake = () => {
    const dates: { date: string; taken: boolean }[] = [];
    let currentDate = new Date(convertToISODate(editedStartDate));
    const finDate = new Date(convertToISODate(editedEndDate));
    const selectedDays = days;
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

  const handleSaveChanges = () => {
    medication.time = editedTime;
    medication.isoStartDate = editedStartDate;
    medication.isoEndDate = editedEndDate;
    medication.date = generateDatesToTake();
    const med = medications?.filter((elem) => elem.id !== medication.id);
  setMedications([...med!, { ...medication }]);

    setModalVisible(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Modifier le médicament</Text>

          <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
            <TimePicker
              time={editedTime}
              onTimeChange={setEditedTime}
              showTimePicker={showTimePicker}
              setShowTimePicker={setShowTimePicker}
            />
            <DatePickers
              label="Date de début"
              date={editedStartDate}
              onDateChange={setEditedStartDate}
              showDatePicker={showStartDatePicker}
              setShowDatePicker={setShowStartDatePicker}
            />
            <DatePickers
              label="Date de fin"
              date={editedEndDate}
              onDateChange={setEditedEndDate}
              showDatePicker={showEndDatePicker}
              setShowDatePicker={setShowEndDatePicker}
            />
            <SelectedDay onSelectDays={(days: { [key: string]: boolean }) => setDays(days)} />
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
