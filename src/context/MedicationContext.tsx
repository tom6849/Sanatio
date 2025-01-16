import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Définition du type Medication.
 * Représente un médicament avec ses informations essentielles.
 * 
 * @typedef {Object} Medication
 * @property {string} isoStartDate 
 * @property {string} isoEndDate
 * @property {string} name 
 * @property {string} pharmaForm 
 * @property {string} administrationRoutes 
 * @property {string} time 
 * @property {Object} jours
 * @property {string[]} [datesToTake] 
 */
export type Medication = {
  isoStartDate: string;
  isoEndDate: string;
  name: string;
  pharmaForm: string;
  administrationRoutes: string;
  time: string;
  jours: { [key: string]: boolean };
  date?: string[];
};

/**
 * Type pour le contexte des médicaments. Contient la liste des médicaments
 * et une fonction pour mettre à jour cette liste.
 * 
 * @typedef {Object} MedicationContextType
 * @property {Medication[]} medications - Liste des médicaments.
 * @property {function} setMedications - Fonction pour mettre à jour la liste des médicaments.
 */
type MedicationContextType = {
  medications: Medication[];
  setMedications: (medications: Medication[]) => void;
};

// Création du contexte MedicationContext avec une valeur par défaut de undefined.
const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

/**
 * Hook personnalisé pour accéder au contexte des médicaments.
 * 
 * @returns {MedicationContextType} - Retourne les médicaments et la fonction pour les mettre à jour.
 * @throws {Error} - Lève une erreur si le hook est utilisé en dehors du `MedicationProvider`.
 */
export const useMedication = (): MedicationContextType => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};

/**
 * Composant `MedicationProvider` qui fournit l'état des médicaments et
 * la fonction pour les mettre à jour à tous les composants enfants.
 * 
 * @param {Object} props - Propriétés passées au composant.
 * @param {ReactNode} props.children - Les enfants du composant, qui auront accès au contexte des médicaments.
 * 
 * @returns {JSX.Element} - Le composant `MedicationProvider` qui enveloppe les enfants.
 */
export const MedicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // État local pour stocker la liste des médicaments.
  const [medications, setMedications] = useState<Medication[]>([]);

  /**
   * Fonction pour charger les médicaments depuis AsyncStorage au démarrage de l'application.
   * Cette fonction est appelée une fois grâce à useEffect.
   */
  const loadMedications = async () => {
    try {
      // Tente de récupérer les médicaments sauvegardés dans AsyncStorage.
      const storedMedications = await AsyncStorage.getItem('medications');
      if (storedMedications) {
        // Si des médicaments sont trouvés, on les parse et les met dans l'état.
        setMedications(JSON.parse(storedMedications));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des médicaments:', error);
    }
  };

  // Utilisation de useEffect pour appeler loadMedications une seule fois au démarrage.
  useEffect(() => {
    loadMedications();
  }, []); // Le tableau vide [] garantit que l'effet est exécuté une seule fois lors du montage.

  /**
   * Fonction pour mettre à jour les médicaments dans l'état local et dans AsyncStorage.
   * 
   * @param {Medication[]} newMedications - La nouvelle liste de médicaments.
   */
  const updateMedications = async (newMedications: Medication[]) => {
    setMedications(newMedications);
    // Sauvegarde des nouveaux médicaments dans AsyncStorage.
    await AsyncStorage.setItem('medications', JSON.stringify(newMedications));
  };

  return (
    <MedicationContext.Provider value={{ medications, setMedications: updateMedications }}>
      {children}
    </MedicationContext.Provider>
  );
};
