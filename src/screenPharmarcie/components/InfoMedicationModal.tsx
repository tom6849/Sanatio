import React, { useState } from 'react';
import {Modal,View,Text,StyleSheet,Pressable,TextInput,ScrollView,Alert,TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';
import CloseModal from '../../img/CloseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../type/Medication';



type MedicationModalProps = {
  visible: boolean;
  onClose: () => void;
  medication: Medication | null;
};

type SetShowFunction = React.Dispatch<React.SetStateAction<boolean>>;

const InfoMedicationModal: React.FC<MedicationModalProps> = ({ visible=false, onClose=()=>{}, medication=null }) => {
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


export default InfoMedicationModal;



