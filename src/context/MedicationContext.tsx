import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { Medication } from '../type/Medication';
import { getMedications, updateMedications } from '../services/medicationService';

/**
 * Type pour le contexte des médicaments.
 */
type MedicationContextType = {
  medications: Medication[];
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
  const [medications, setMedicationsState] = useState<Medication[]>([]); 

  useEffect(() => {
    const loadMedications = async () => {
      const meds = await getMedications(); 
      if (meds && JSON.stringify(meds) !== JSON.stringify(medications)) {
        setMedicationsState(meds);  
      }
    };
    loadMedications();
  }, []);

  /**
   * Fonction pour mettre à jour les médicaments
   */
  const setMedications = (newMedications: Medication[]) => {
    setMedicationsState(newMedications);
    setTimeout(() => {
      updateMedications(newMedications).catch((error) => {
        console.error('Erreur lors de la mise à jour des médicaments :', error);
      });
    }, 0); // La mise à jour se fait en arrière-plan
  };
  
  

  /**
   * Calcule les médicaments à prendre aujourd'hui avec `useMemo`
   */
  const medToday = useMemo(() => {
    const todayIso = new Date().toISOString().split('T')[0]; 
  
    return medications
      .filter((med) =>
        med.date && med.date.some((entry) => entry.date === todayIso)
      )
      .sort((a, b) => {
        if (!a.time) return 1; 
        if (!b.time) return -1; 
        return a.time.localeCompare(b.time[0]); 
      });
  }, [medications]);
  
  
  

  return (
    <MedicationContext.Provider value={{ medications, setMedications, medToday }}>
      {children}
    </MedicationContext.Provider>
  );
};
