import React, { useState } from 'react';
import {Modal,View,Text,StyleSheet,Pressable,TextInput,ScrollView,Alert,TouchableOpacity,KeyboardAvoidingView,Platform,} from 'react-native';
import CloseModal from '../../img/CloseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../context/MedicationContext';
import DatePicker from 'react-native-modern-datepicker';
import SelectedDay from './SelectDay';


type MedicationModalProps = {
  visible: boolean;
  onClose: () => void;
  medication: Medication | null;
};


const MedicationModal: React.FC<MedicationModalProps> = ({ visible=false, onClose=()=>{}, medication=null }) => {
  const { medications, setMedications } = useMedication();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const [showStartDatePicker, setshowStartDatePicker] = useState(false);
  const [showEndDatePicker, setshowEndDatePicker] = useState(false);
  const [showTimePicker, setshowTimePicker] = useState(false);


  if (!medication) return null;


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
      const newMedication: Medication = {
        id: medication.id,
        isoStartDate : startDate,
        isoEndDate:endDate,
        name: medication.name,
        pharmaForm: medication.pharmaForm,
        administrationRoutes: medication.administrationRoutes,
        time : time,
        jours: selectedDays,
        date: generateDatesToTake(),
        count: 1,
      };
      const storedMedications = await AsyncStorage.getItem('medications');
      const existingMedications: Medication[] = storedMedications ? JSON.parse(storedMedications) : [];


      const existingMedicationIndex = existingMedications.findIndex((med) => med.id === newMedication.id);
      if (existingMedicationIndex !== -1) {
        existingMedications[existingMedicationIndex].count =
          (existingMedications[existingMedicationIndex].count || 1) + 1;
      } else {
        existingMedications.push(newMedication);
      }
      await AsyncStorage.setItem('medications', JSON.stringify(existingMedications));
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
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseModal size={40} color="#1e3a8a" />
          </Pressable>


          <Text style={styles.modalTitle}>{medication?.name}</Text>
          <Text style={styles.modalSubTitle}>Type(s) : {medication?.pharmaForm}</Text>
          <Text style={styles.modalSubTitle}>Endroit : {medication?.administrationRoutes}</Text>


          <ScrollView
            contentContainerStyle={[styles.formContainer, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Date de début (DD/MM/YYYY) :</Text>
            <TouchableOpacity onPress={() => setshowStartDatePicker(true)} style={styles.input}>
              <Text style={styles.inputText}>{startDate || 'Sélectionner la date'}</Text>
            </TouchableOpacity>


            {showStartDatePicker && (
              <DatePicker
                mode="calendar"
                selected={startDate}
                onDateChange={(date) => {
                  setStartDate(date);
                  setshowStartDatePicker(false);
                }}
              />
            )}


            <Text style={styles.label}>Date de fin (DD/MM/YYYY) :</Text>
            <TouchableOpacity onPress={() => setshowEndDatePicker(true)} style={styles.input}>
              <Text style={styles.inputText}>{endDate || 'Sélectionner la date'}</Text>
            </TouchableOpacity>


            {showEndDatePicker && (
              <DatePicker
                mode="calendar"
                selected={endDate}
                onDateChange={(date) => {
                  setEndDate(date);
                  setshowEndDatePicker(false);
                }}
              />
            )}


            <Text style={styles.label}>Heure (HH:MM) :</Text>
            <TouchableOpacity onPress={() => setshowTimePicker(true)} style={styles.input}>
              <Text style={styles.inputText}>{time || 'HH:MM'}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DatePicker
                mode="time"
                selected={time}
                onTimeChange={(time) => {
                  setTime(time);
                  setshowTimePicker(false);
                }}
              />
            )}


            <SelectedDay onSelectDays={handleSelectDays} />
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
  inputText: {
    fontSize: 16,
  },
  formContainer: {
    padding: 10,
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
});


export default MedicationModal;



