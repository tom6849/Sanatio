import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../type/User';
import { Medication } from '../type/Medication';

/**
 * Type pour le contexte des médicaments.
 */
type MedicationContextType = {
  medications: Medication[] | null;
  setMedications: (medications: Medication[]) => void;
  medToday: Medication[];
};

/**
 * Création du contexte MedicationContext
 */
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
  const [medications, setMedications] = useState<Medication[] | null>(null);
  const [medToday, setMedToday] = useState<Medication[]>([]);

  const loadMedications = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const lastUser = await AsyncStorage.getItem('lastUser');

      if (!storedUsers || !lastUser) {
        console.log("Aucun utilisateur trouvé");
        return;
      }

      const users: User[] = JSON.parse(storedUsers);
      const current = JSON.parse(lastUser);

      const currentUser = users.find((user) => user.id === current.id);
      if (currentUser?.medications) {
        setMedications(currentUser.medications);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des médicaments:', error);
    }
  };

  useEffect(() => {
    loadMedications();
  }, []);
  useEffect(() => {
    if (medications?.length) {
      countMedicationsForToday(medications);
    }
  }, [medications]);

  /**
   * Fonction pour mettre à jour les médicaments dans l'état local et dans AsyncStorage.
   */
  const updateMedications = async (newMedications: Medication[]) => {
    if (!newMedications) return;

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const lastUser = await AsyncStorage.getItem('lastUser');
      
      if (!storedUsers || !lastUser) {
        console.log("Aucun utilisateur trouvé");
        return;
      }
      const users: User[] = JSON.parse(storedUsers);
      const current = JSON.parse(lastUser); 

      const currentUser = users.find((user) => user.id === current.id);
      if (!currentUser) return;
      currentUser.medications = newMedications;

    
      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setMedications(newMedications)
      countMedicationsForToday(newMedications);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des médicaments :", error);
    }
  };

  /**
   * Fonction pour compter les médicaments à prendre aujourd'hui et les ajouter à `medToday`.
   */
  const countMedicationsForToday = (medications: Medication[]) => {
    const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');
    const medicationsForToday = medications.filter((med) =>
      med.date?.some((entry) => entry.date === todayIso)
    );
    setMedToday(medicationsForToday);
  };

  return (
    <MedicationContext.Provider value={{ medications, setMedications: updateMedications, medToday }}>
      {children}
    </MedicationContext.Provider>
  );
};
