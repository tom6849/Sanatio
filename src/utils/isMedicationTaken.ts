import { Medication } from "../type/Medication";

/**
 * Vérifie si le médicament a été pris à une date donnée.
 */
export const isMedicationTaken = (medication: Medication, date: string): boolean => {
    if (!medication) return false; 
    return medication.date.some((entry) => entry.date === date && entry.taken);
};
