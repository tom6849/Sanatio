import { Medication } from "../type/Medication";
import MlkitOcr from "react-native-mlkit-ocr"; 
import { Alert } from "react-native";

// Regular expression for matching medication types
export const typeRegex = /\b(CPR|CP|Comprimé|Comprime|GEL|SACH|Sachet|SIROP|AMP|Ampoule|SUPP|Suppositoire|CREME|Crème|CR|POMMADE|GOUTTES|PATCH|PILULE|SOLUTION|VIAL|Vial|TROCHE|LOTION|PILULES|GELULE|GELULES|BIDON|MELANGE|SYRUP|SUSPENSION|INFUSION|POMPE|FILTRE|LOTION|AEROSOL|GOUTTE)\b/gi;

export const removeAccents = (text: string): string =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const extractMedicines = (lines: string[]): string[] => {
  const cleanedLines = lines.map(removeAccents);
  console.log("Lignes traitées :", cleanedLines);

  const medicines: string[] = cleanedLines.filter(line =>
    line.split(/\s+/).some(word => typeRegex.test(word))
  );

  console.log("\nMedicines (Médicaments extraits):", medicines);
  return medicines;
};


// Function to fetch medication data from the API
export const fetchMedications = async (queries: string[]): Promise<Medication[]> => {
  try {
    const promises = queries.map((query) =>
      fetch(
        `https://api.thomas-ambroise.fr/api/v1/cisbdpm/match?query=${query}`
      )
        .then((response) => response.json())
        .then((data) =>
          data._id ? { id: data._id, name: data.name } : null
        )
    );
    const results = await Promise.all(promises);
    return results.filter((result) => result !== null) as Medication[];
  } catch (error) {
    console.error("Error fetching medication data:", error);
    return [];
  }
};

// Function to filter medications from the API response
export const filterMedicationsFromAPI = async (
  medicationLine: string[], 
  setMedications: React.Dispatch<React.SetStateAction<Medication[]>>
): Promise<void> => {
  const updatedMedications: Medication[] = [];

  for (const line of medicationLine) {
    const words = line.trim().split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const query = words.slice(0, i + 1).join(" ");
      console.log(`Searching for: ${query}`);
      try {
        const response = await fetch(`https://api.thomas-ambroise.fr/api/v1/cisbdpm/match?query=${query}`);
        const data = await response.json();
        if (data && data._id) {
          const medication: Medication = {
            id: data._id,
            name: data.name,
            pharmaForm: data.pharmaForm,
            administrationRoutes: data.administrationRoutes,
            jours: data.jours || [],
            date: data.date || '',
            pill: data.pill || 0
          };
          if (!updatedMedications.some(med => med.id === medication.id)) {
            updatedMedications.push(medication);
          }
        }
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    }
  }
  setMedications(updatedMedications);
};


// Function to perform OCR on the selected image
export const getTextFromOCR = async (pickedImagePath :string) => {
  if (!pickedImagePath) {
    Alert.alert('Please select an image first');
    return;
  }

  try {
    const resultFromUri = await MlkitOcr.detectFromUri(pickedImagePath);
    if (!resultFromUri || resultFromUri.length === 0) {
      Alert.alert('No text found in the image. Please try again.');
    }
    return resultFromUri;
  } catch (error) {
    console.log('OCR failed', error);
    Alert.alert('OCR failed, please try again.');
  }
};
