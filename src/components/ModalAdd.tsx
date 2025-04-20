import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import CloseModal from '../img/CloseModal';
import { useMedication } from '../context/MedicationContext';
import { Medication } from '../type/Medication';
import DatePickers from './DatePicker';
import SelectedDay from './SelectDay';
import TimePicker from './TimePicker';
import { addLocalPrescription , isCurrentDateBeforeEndDate } from '../utils/medicationUtils';
import MedicationQuantityInput from './MedicationQuantityInput';

type MedicationModalProps = {
  visible: boolean;
  onClose: () => void;
  medication: Medication | null;
};

const MedicationModal: React.FC<MedicationModalProps> = ({ visible = false, onClose = () => {}, medication = null }) => {
  const { medications, setMedications } = useMedication();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [nbPill, setNbPill] = useState(0);


  if (!medication) return null;

  const handleAddMedication = async () => {
    if (!isCurrentDateBeforeEndDate(startDate, endDate)) {
      Alert.alert(
        'Erreur',
        'La date de début ne peut pas être après la date de fin.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return; 
    }
    let new_med = await addLocalPrescription(startDate, endDate, time, selectedDays, medication , nbPill);
    const updatedMedications = medications ? [...medications, new_med] : [new_med];
    setMedications(updatedMedications);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStartDate('');
    setEndDate('');
    setTime('');
    setSelectedDays([]);
    setNbPill(0)
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseModal size={40} color="#1e3a8a" />
          </Pressable>

          <Text style={styles.modalTitle}>{medication?.name}</Text>
          <Text style={styles.modalSubTitle}>Type(s) : {medication?.pharmaForm}</Text>
          <Text style={styles.modalSubTitle}>Administration(s) : {medication?.administrationRoutes}</Text>

          <ScrollView>
            <DatePickers label="Date de début" date={startDate} onDateChange={setStartDate} showDatePicker={showStartDatePicker} setShowDatePicker={setShowStartDatePicker} med="Choisir une date " />
            <DatePickers label="Date de fin" date={endDate} onDateChange={setEndDate} showDatePicker={showEndDatePicker} setShowDatePicker={setShowEndDatePicker} med="Choisir une date " />
            <TimePicker time={time} onTimeChange={setTime} showTimePicker={showTimePicker} setShowTimePicker={setShowTimePicker} med="HH:MM " />
            <SelectedDay onSelectDays={setSelectedDays} defaultSelectedDays={selectedDays} />
            <MedicationQuantityInput  nbPill={nbPill} setNbPill={setNbPill} />


          </ScrollView>

          <Pressable style={styles.addButton} onPress={handleAddMedication}>
            <Text style={styles.addButtonText}>Ajouter le médicament</Text>
          </Pressable>
        </KeyboardAvoidingView>
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
  },
  modalSubTitle: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    marginTop: 20,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    borderRadius: 12,
    paddingLeft: 20,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },


});

export default MedicationModal;
