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

type SetShowFunction = React.Dispatch<React.SetStateAction<boolean>>;

const AddMedicationModal: React.FC<MedicationModalProps> = ({ visible = false, onClose = () => {}, medication = null }) => {
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
  const [showPartPriseEx,setShowPartPriseEx] = useState(false);

  const resetStates = () => {
    setStartDate('');
    setEndDate('');
    setTime('');
    setSelectedDays({});
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
    setShowTimePicker(false);
    setNbBoite(0);
    setNbPill(0);
    setShowPartStock(false);
    setShowPartPrise(false);
    setShowPartPriseEx(false);
  };

  if (!medication) return null;

  const handleSelectDays = (days: { [key: string]: boolean }) => {
    setSelectedDays(prevState => {
      const updatedDays = { ...prevState };
  
      // On boucle à travers les jours reçus et on les ajoute ou supprime
      for (const day in days) {
        if (days[day]) {
          updatedDays[day] = true;  // Ajouter ou garder le jour
        } else {
          delete updatedDays[day];  // Supprimer le jour
        }
      }
  
      return updatedDays; // Retourner l'objet mis à jour
    });
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
      let newMedication: Medication = {
        id: generateUniqueId(),  // Valeur temporaire
        name: medication.name,
        pharmaForm: medication.pharmaForm,
        administrationRoutes: medication.administrationRoutes,
      };
  
      if (showPartStock) {
        newMedication.pill = nbBoite * nbPill;
      }
      if (showPartPrise) {
        newMedication.isoStartDate = startDate;
        newMedication.isoEndDate = endDate;
        newMedication.time = time;
        newMedication.jours = selectedDays;
      }
      if (showPartPriseEx) {
        newMedication.time = time;
      }
      const updatedMedications = [...(medications || []), newMedication];
      setMedications(updatedMedications);
      Alert.alert('Succès', 'Le médicament a été ajouté avec succès.');
      resetStates();
      onClose();

    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du médicament :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du médicament.');
    }
  };

  

  const handleAddMedication = (): void => {
    if (!showPartStock && !showPartPrise && ! showPartPriseEx) {
      Alert.alert('Erreur', 'Vous devez remplir au moin une des trois parties');
      return;
    }
    if(showPartStock){
      if(nbBoite *nbPill == 0){
        Alert.alert('Erreur', 'le nombre de boite fois le nombre de pillule fait zéro');
        return;
      }
    }
    if(showPartPrise){
      if(!startDate || !endDate || Object.keys(selectedDays).length === 0 || !time){
        Alert.alert('Erreur', 'IL manque une information dans votre préscription');
        return;
      }
    }
    if(showPartPriseEx){
      if(!time){
        Alert.alert('Erreur', "Il faut indiquer l'heure de la prise");
        return;
      }
      
    }
    addLocalPrescription();
  };
  
  const handleClose = () => {
    resetStates(); // Réinitialiser les états des parties
    onClose();          // Appeler la fonction onClose passée en props
  };

  const setshow= (setShowFunc: SetShowFunction, label: string) => {
    if(label == 'PartPrise'){
      if(!showPartPriseEx){
        setShowFunc(prev => !prev);
      }
      return ;
    }else if( label == 'PartPriseEx'){
      if(!showPartPrise){
        setShowFunc(prev => !prev);
      }
      return;
    }
    setShowFunc(prev => !prev);
  }

  const onChangenb = (text: string, type: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const numberValue = numericValue ? parseInt(numericValue, 10) : 0;
    if(type == 'boite'){
      setNbBoite(numberValue);
    }else{
      setNbPill(numberValue);
    }
    
    
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
        <KeyboardAvoidingView 
        style={styles.modalContent}
        >
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <CloseModal size={40} color="#1e3a8a" />
          </Pressable>

          <Text style={styles.modalTitle}>{medication?.name}</Text>
          <Text style={styles.modalSubTitle}>Type(s) : {medication?.pharmaForm}</Text>
          <Text style={styles.modalSubTitle}>Endroit : {medication?.administrationRoutes}</Text>

          <ScrollView
            contentContainerStyle={[styles.formContainer, { flexGrow: 1 }]}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity onPress={() => setshow(setShowPartStock,'PartStock')} style={styles.openButton}>
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
                  onChangeText={(text) => onChangenb(text, 'pill')}
                  style={styles.input}
                />
              </View>
            )}

            <TouchableOpacity onPress={() => setshow(setShowPartPrise,'PartPrise')} style={styles.openButton}>
              <Text style={styles.addButtonText}>Ajouté une prise régulière</Text>
            </TouchableOpacity>
            
            {showPartPrise  && (
              <View style={styles.bloc}>
                <Text style={styles.label}>Date de début (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setShowStartDatePicker,'startDataPicker')} style={styles.input}>
                  <Text style={styles.inputText}>{startDate || 'Sélectionner la date'}</Text>
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={startDate}
                    onDateChange={(date) => {
                      setStartDate(date);
                      setshow(setShowStartDatePicker,'startDataPicker');
                    }}
                  />
                )}


                <Text style={styles.label}>Date de fin (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setShowEndDatePicker,'startEndPicker')} style={styles.input}>
                  <Text style={styles.inputText}>{endDate || 'Sélectionner la date'}</Text>
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={endDate}
                    onDateChange={(date) => {
                      setEndDate(date);
                      setshow(setShowEndDatePicker,'startEndPicker');
                    }}
                  />
                )}


                <Text style={styles.label}>Heure de prise (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setShowTimePicker,'TimePicker')} style={styles.input}>
                  <Text style={styles.inputText}>{time || 'HH:MM'}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DatePicker
                    mode="time"
                    selected={time}
                    onTimeChange={(time) => {
                      setTime(time);
                      setshow(setShowTimePicker,'TimePicker');
                    }}
                  />
                )}

                <SelectedDay onSelectDays={handleSelectDays} />
              </View>
            )}
            <TouchableOpacity onPress={() => setshow(setShowPartPriseEx,'PartPriseEx')} style={styles.openButton}>
              <Text style={styles.addButtonText}>Prise exceptionnelle</Text>
            </TouchableOpacity>
            {showPartPriseEx && (
              <View>
                <Text style={styles.label}>Heure de prise (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setShowTimePicker,'TimePicker')} style={styles.input}>
                  <Text style={styles.inputText}>{time || 'HH:MM'}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DatePicker
                    mode="time"
                    selected={time}
                    onTimeChange={(time) => {
                      setTime(time);
                      setshow(setShowTimePicker,'TimePicker');
                    }}
                  />
                )}
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
    textAlign: 'center',
  },
  modalSubTitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
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
  formContainer: {
    padding: 10,
  },
  openButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: 'green',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    elevation: 5,
  },
});

export default AddMedicationModal;
