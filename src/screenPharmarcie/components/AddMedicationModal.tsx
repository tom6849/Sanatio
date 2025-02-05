import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import CloseModal from '../../img/CloseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../type/Medication';
import DatePicker from 'react-native-modern-datepicker';
import SelectedDay from './SelectDay';
import { User } from './../../type/User';

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
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [nbBoite, setNbBoite] = useState(0);
  const [nbPill, setNbPill] = useState(0);
  const [showPartStock, setShowPartStock] = useState(false);
  const [showPartPrise, setShowPartPrise] = useState(false);

  if (!medication) return null;

  const handleSelectDays = (days: { [key: string]: boolean }) => {
    setSelectedDays(days);
  };

  const convertToISODate = (date: string): string => {
    const [year, month, day] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const generateDatesToTake = () => {
    const dates: { date: string; taken: boolean }[] = [];
    let currentDate = new Date(convertToISODate(startDate));
    const finDate = new Date(convertToISODate(endDate));

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

  const generateUniqueId = () => 'med-' + new Date().getTime();

  const addLocalPrescription = async (): Promise<void> => {
    try {
      const newMedication: Medication = {
        id: generateUniqueId(),
        isoStartDate: startDate,
        isoEndDate: endDate,
        name: medication.name,
        pharmaForm: medication.pharmaForm,
        administrationRoutes: medication.administrationRoutes,
        time,
        jours: selectedDays,
        date: generateDatesToTake(),
      };
      const updatedMedications = [...(medications || []), newMedication];
      setMedications(updatedMedications);
      Alert.alert('Succès', 'Le médicament a été ajouté avec succès.');
      resetForm();
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du médicament :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du médicament.');
    }
  };

  const resetForm = () => {
    setStartDate('');
    setEndDate('');
    setTime('');
    setSelectedDays({});
  };

  const handleAddMedication = (): void => {
    if (showPartStock) {
      if (nbBoite === 0 || nbPill === 0) {
        Alert.alert('Erreur', 'Veuillez spécifier le stock correctement.');
        return;
      }
    }
    if (showPartPrise) {
      if (!startDate || !endDate || !time || Object.keys(selectedDays).length === 0) {
        Alert.alert('Erreur', 'Tous les champs de prise doivent être remplis.');
        return;
      }
    }

    addLocalPrescription();
  };
  

  const onChangenb = (text: string, type: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const numberValue = numericValue ? parseInt(numericValue, 10) : 0;
    setNbPill(numberValue);
    setNbBoite(numberValue);
  };

  const toggleStockVisibility = () => {
    setShowPartStock(!showPartStock);
    setShowPartPrise(false);
  };

  const togglePriseVisibility = () => {
    setShowPartPrise(!showPartPrise);
    setShowPartStock(false);
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
          <Text style={styles.modalSubTitle}>Endroit : {medication?.administrationRoutes}</Text>

          <ScrollView>
            <TouchableOpacity onPress={toggleStockVisibility} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter au stock</Text>
            </TouchableOpacity>
            {showPartStock && (
              <View style={styles.bloc}>
                <Text style={styles.label}>Nombre de boite :</Text>
                <TextInput
                  keyboardType="numeric"
                  value={nbBoite.toString()}
                  onChangeText={(text) => onChangenb(text, 'boite')}
                  style={styles.input}
                />
                <Text style={styles.label}>Nombre de médicament par boite :</Text>
                <TextInput
                  keyboardType="numeric"
                  value={nbPill.toString()}
                  onChangeText={(text) => onChangenb(text, 'medicament')}
                  style={styles.input}
                />
              </View>
            )}

            <TouchableOpacity onPress={togglePriseVisibility} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter au Prises</Text>
            </TouchableOpacity>
            {showPartPrise && (
              <View style={styles.bloc}>
                <Text style={styles.label}>Date de début :</Text>
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
                  <Text style={styles.inputText}>{startDate || 'Sélectionner la date'}</Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DatePicker mode="calendar"  onDateChange={(date) => {
                    setStartDate(date);  
                    setShowStartDatePicker(false);  
                  }} />
                )}

                <Text style={styles.label}>Date de fin :</Text>
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.input}>
                  <Text style={styles.inputText}>{endDate || 'Sélectionner la date'}</Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DatePicker
                  mode="calendar"
                  onDateChange={(date) => {
                    setEndDate(date);  
                    setShowEndDatePicker(false);  
                  }}
                />
                
                )}

                <Text style={styles.label}>Heure de prise :</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
                  <Text style={styles.inputText}>{time || 'HH:MM'}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DatePicker
                  mode="time"
                  selected={time}
                  onTimeChange={(time) => { 
                    setTime(time);
                    setShowTimePicker(false);  
                  }}
                />
                )}

                <SelectedDay onSelectDays={handleSelectDays} />
              </View>
            )}
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
  bloc: {
    marginTop: '2%',
  },
});

export default MedicationModal;
