import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native-svg';

/**
 * Définition du type Medication.
 * Représente un médicament avec ses informations essentielles.
 */
export type Medication = {
  id: string;
  isoStartDate: string;
  isoEndDate: string;
  name: string;
  pharmaForm: string;
  administrationRoutes: string;
  time: string;
  jours: { [key: string]: boolean };
  date: { date: string; taken: boolean }[];
};

/**
 * Type pour le contexte des médicaments.
 */
type MedicationContextType = {
  medications: Medication[];
  setMedications: (medications: Medication[]) => void;
  medToday: Medication[];
};

// Création du contexte MedicationContext
const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

/**
 * Hook personnalisé pour accéder au contexte des médicaments.
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
 * Composant `MedicationProvider` qui fournit l'état des médicaments et la fonction pour les mettre à jour à tous les composants enfants.
 */
export const MedicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medToday, setMedToday] = useState<Medication[]>([]);

  /**
   * Fonction pour charger les médicaments depuis AsyncStorage au démarrage de l'application.
   */
  const loadMedications = async () => {
    try {
      const storedMedications = await AsyncStorage.getItem('medications');
      if (storedMedications) {
        setMedications(JSON.parse(storedMedications));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des médicaments:', error);
    }
  };

  useEffect(() => {
    loadMedications();
  }, []); 

  useEffect(() => {
    if (medications.length > 0) {
      countMedicationsForToday(medications);
    }
  }, [medications]);

  /**
   * Fonction pour mettre à jour les médicaments dans l'état local et dans AsyncStorage.
   */
  const updateMedications = async (newMedications: Medication[]) => {
    setMedications(newMedications);
    await AsyncStorage.setItem('medications', JSON.stringify(newMedications));
  };

  /**
   * Fonction pour compter les médicaments à prendre aujourd'hui et les ajouter à `medToday`.
   */
  const countMedicationsForToday = (medications: Medication[]) => {
    const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');
    const medicationsForToday = medications.filter((med) =>
      med.date.some((entry) => entry.date === todayIso)
    );
    setMedToday(medicationsForToday);
  };

  return (
    <MedicationContext.Provider value={{ medications, setMedications: updateMedications, medToday }}>
      {children}
    </MedicationContext.Provider>
  );
};
