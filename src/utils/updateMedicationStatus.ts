import { Medication } from "../type/Medication";

/**
 * Met à jour l'état des médicaments en indiquant qu'un médicament a été pris.
 * Diminue également le stock de pilules si possible.
 */
export const updateMedicationStatus = (medications: Medication[] | null, medicationId: string, date: string): Medication[] => {
    if (!medications) return [];

    return medications.map((med) => {
        if (med.id === medicationId) {
            if (med.pill > 0) {
                return {
                    ...med,
                    pillCount: med.pill - 1, 
                    date: med.date?.map((entry) =>
                        entry.date === date ? { ...entry, taken: true } : entry
                    ) || [],
                };
            } else {
                console.warn(`Le médicament ${med.name} n'a plus de pilules.`);
            }
        }
        return med;
    });
};
