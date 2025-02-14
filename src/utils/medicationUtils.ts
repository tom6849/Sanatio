import { Medication } from '../type/Medication';
import { useMedication } from '../context/MedicationContext';
import { Alert } from 'react-native';

/**
 * Convertit une date au format 'dd/mm/yyyy' en ISO (dd-mm-yyyy)
 */
export const convertToISODate = (date: string): string => {
  const [day, month, year] = date.split('/');
  return `${day}-${month}-${year}`;
};

/**
 * Génère les dates auxquelles un médicament doit être pris
 */
export const generateDatesToTake = (startDate: string, endDate: string, selectedDays: string[]) => {
  const dates: { date: string; taken: boolean }[] = [];
  let currentDate = new Date(convertToISODate(startDate));
  const finDate = new Date(convertToISODate(endDate));

  while (currentDate <= finDate) {
    const dayName = currentDate.toLocaleString('fr-FR', { weekday: 'long' }).toLowerCase();
    console.log("Checking date:", currentDate.toISOString(), "Day:", dayName);
    
    if (selectedDays.includes(dayName)) { 
      console.log("Selected Day:", currentDate.toISOString());
      const formattedDate = currentDate.toISOString().split('T')[0];  
      dates.push({ date: formattedDate, taken: false });
    }
    currentDate.setDate(currentDate.getDate() + 1);  
  }

  return dates;
};

/**
 * Vérifie que les champs requis sont remplis pour l'ajout du médicament
 */
export const validateMedicationFields = (startDate: string, endDate: string, time: string, selectedDays :string) => {
  return (
    startDate.trim() !== '' &&
    endDate.trim() !== '' &&
    time.trim() !== '' &&
    selectedDays.trim() !== '' 
    
  );
};

/**
 * Génère un ID unique pour chaque prescription
 */
export const generateUniqueId = (): string => 'med-' + new Date().getTime();

/**
 * Ajoute une nouvelle prescription locale
 */

export const addLocalPrescription = async (startDate: string,endDate: string,time: string,selectedDays:string[],medication: Medication , pill : number): Promise<Medication> => {
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
      date: generateDatesToTake(startDate, endDate, selectedDays),
      pill : pill 
    };

    Alert.alert('Succès', 'Le médicament a été ajouté avec succès.');
    console.log(newMedication)
    return newMedication; 
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du médicament :', error);
    Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du médicament.');
    throw error; 
  }
};

// Fonction qui vérifie si la date actuelle (currentDate) est avant la date de fin (endDate)
export const isCurrentDateBeforeEndDate = (startDate: string, endDate: string): boolean => {
  if (startDate === "" || endDate === "") {
    return true;  
  }

  let currentDate = new Date(convertToISODate(startDate));
  const finDate = new Date(convertToISODate(endDate));
  return currentDate < finDate;
};


  
