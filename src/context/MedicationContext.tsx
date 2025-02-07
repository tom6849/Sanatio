import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from 'react';
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
 */
export const useMedication = (): MedicationContextType => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};

/**
 * Composant `MedicationProvider`
 */
export const MedicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medications, setMedications] = useState<Medication[] | null>(null);

  useEffect(() => {
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

    loadMedications();
  }, []);

  /**
   * Fonction pour mettre à jour les médicaments et les enregistrer dans AsyncStorage
   */
  const updateMedications = async (newMedications: Medication[]) => {
    if (!newMedications) return;

    setMedications([...newMedications]); 

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
    } catch (error) {
        console.error("Erreur lors de la mise à jour des médicaments :", error);
    }
};


  /**
   * Calcule les médicaments à prendre aujourd'hui avec `useMemo`
   */
  const medToday = useMemo(() => {
    if (!medications) return [];
    const todayIso = new Date().toISOString().split('T')[0]; 
    return medications.filter((med) =>
      med.date.some((entry) => entry.date === todayIso)
    );
  }, [medications]);

  return (
    <MedicationContext.Provider value={{ medications, setMedications: updateMedications, medToday }}>
      {children}
    </MedicationContext.Provider>
  );
};
