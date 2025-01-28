import React, { useState } from 'react';
import {Modal,View,Text,StyleSheet,Pressable,TextInput,ScrollView,Alert,TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';
import CloseModal from '../../img/CloseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../context/MedicationContext';
import { PillStock } from '../../context/PillStockContext';
import DatePicker from 'react-native-modern-datepicker';
import SelectedDay from './SelectDay';


type MedicationModalProps = {
  visible: boolean;
  onClose: () => void;
  medication: Medication | null;
};

type SetShowFunction = React.Dispatch<React.SetStateAction<boolean>>;

const MedicationModal: React.FC<MedicationModalProps> = ({ visible=false, onClose=()=>{}, medication=null }) => {
  const { medications, setMedications } = useMedication();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const [showStartDatePicker, setshowStartDatePicker] = useState(false);
  const [showEndDatePicker, setshowEndDatePicker] = useState(false);
  const [showTimePicker, setshowTimePicker] = useState(false);
  const [nbboite,setnbboite] = useState(0);
  const [nbpill,setnbmedicament] = useState(0);
  const [showPartStock,setshowPartStock] = useState(false);
  const [showPartPrise,setshowPartPrise] = useState(false);

  if (!medication) return null;


  const handleSelectDays = (days: { [key: string]: boolean }) => {
    setSelectedDays(days);
  };


  const convertToISODate = (date: string): string => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };


  const generateDatesToTake = (): string[] => {
    console.log(startDate, endDate)
    
    const dates: string[] = [];
    let currentDate = new Date(convertToISODate(startDate));
    const FinDate = new Date(convertToISODate(endDate));
    console.log(currentDate, endDate)
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
        isoStartDate: startDate,
        isoEndDate: endDate,
        name: medication.name,
        pharmaForm: medication.pharmaForm,
        administrationRoutes: medication.administrationRoutes,
        time: time,
        jours: selectedDays,
        date: generateDatesToTake(),
        count: 1,
      };
  
      // Création de l'objet PillStock avec le nombre de pilules (nbpillut).
      const pillStocks: PillStock = {
        id: medication.id,
        pillCount: nbpill,  // Ajout du nombre de pilules ici
      };
  
      // Récupération des médicaments stockés dans AsyncStorage
  
      const storedMedications = await AsyncStorage.getItem('medications');
      const existingMedications: Medication[] = storedMedications ? JSON.parse(storedMedications) : [];
  
      // Vérification si le médicament existe déjà
      const existingMedicationIndex = existingMedications.findIndex((med) => med.id === newMedication.id);
      if (existingMedicationIndex !== -1) {
        existingMedications[existingMedicationIndex].count =
          (existingMedications[existingMedicationIndex].count || 1) + 1;
      } else {
        existingMedications.push(newMedication);
      }
  
      // Mise à jour des médicaments dans AsyncStorage
      await AsyncStorage.setItem('medications', JSON.stringify(existingMedications));
      setMedications(existingMedications);
  
      // Mise à jour du stock des pilules dans AsyncStorage
      const storedPillStocks = await AsyncStorage.getItem('pillStocks');
      const existingPillStocks: PillStock[] = storedPillStocks ? JSON.parse(storedPillStocks) : [];
  
      const existingPillStockIndex = existingPillStocks.findIndex((stock) => stock.id === pillStocks.id);
      if (existingPillStockIndex !== -1) {
        existingPillStocks[existingPillStockIndex].pillCount += pillStocks.pillCount; // Ajoute au stock existant
      } else {
        existingPillStocks.push(pillStocks); // Ajoute un nouveau stock si nécessaire
      }
  
      // Sauvegarder les informations de stock de pilules dans AsyncStorage
      await AsyncStorage.setItem('pillStocks', JSON.stringify(existingPillStocks));
  
      // Affichage d'une alerte de succès
      Alert.alert('Succès', 'Le médicament a été ajouté avec succès.');
  
      // Réinitialisation des champs du formulaire
      setStartDate('');
      setEndDate('');
      setTime('');
      setSelectedDays({});
      onClose();
  
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du médicament :', error);
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

  const onChangenb = (text:string , type:string) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, "");
    const numberValue = numericValue ? parseInt(numericValue, 10) : 0;
    if(type == 'medicament'){
      setnbmedicament(numberValue);
    }else{
      setnbboite(numberValue);
    }
  };
  const setshow= (setShowFunc: SetShowFunction) => {
    setShowFunc(prev => !prev);
  }
  

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
            <TouchableOpacity onPress={() => setshow(setshowPartStock)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter au stock</Text>
            </TouchableOpacity>
            {showPartStock && (
              <View style={styles.bloc}>
                <Text style={styles.label}> Nombre de boite :</Text>
                <TextInput keyboardType="numeric" placeholder="Type numbers here" value={nbboite.toString()} onChangeText={Text=>onChangenb(Text,'boite')} style={styles.input}/>
                <Text style={styles.label}>Nombre de médicament par boite :</Text>
                <TextInput keyboardType="numeric" placeholder="Type numbers here" value={nbpill.toString()} onChangeText={Text=>onChangenb(Text,'medicament')} style={styles.input}/>
              </View>
            )}

            <TouchableOpacity onPress={() => setshow(setshowPartPrise)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Ajouter au Prises</Text>
            </TouchableOpacity>
            
            {showPartPrise && (
              <View style={styles.bloc}>
                <Text style={styles.label}>Date de début (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setshowStartDatePicker)} style={styles.input}>
                  <Text style={styles.inputText}>{startDate || 'Sélectionner la date'}</Text>
                </TouchableOpacity>


                {showStartDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={startDate}
                    onDateChange={(date) => {
                      setStartDate(date);
                      setshow(setshowStartDatePicker);
                    }}
                  />
                )}


                <Text style={styles.label}>Date de fin (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setshowEndDatePicker)} style={styles.input}>
                  <Text style={styles.inputText}>{endDate || 'Sélectionner la date'}</Text>
                </TouchableOpacity>


                {showEndDatePicker && (
                  <DatePicker
                    mode="calendar"
                    selected={endDate}
                    onDateChange={(date) => {
                      setEndDate(date);
                      setshow(setshowEndDatePicker);
                    }}
                  />
                )}


                <Text style={styles.label}>Heure de prise (Facultatif) :</Text>
                <TouchableOpacity onPress={() => setshow(setshowTimePicker)} style={styles.input}>
                  <Text style={styles.inputText}>{time || 'HH:MM'}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                  <DatePicker
                    mode="time"
                    selected={time}
                    onTimeChange={(time) => {
                      setTime(time);
                      setshow(setshowTimePicker);
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
  bloc: {
    marginTop:'2%'
  }
});


export default MedicationModal;



