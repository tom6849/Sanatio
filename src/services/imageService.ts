import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Récupère l'URI de l'image d'un médicament depuis AsyncStorage.
 */
export const getMedicationImage = async (medicationId: string): Promise<string | null> => {
    try {
        const storedUri = await AsyncStorage.getItem(`imageUri_${medicationId}`);
        return storedUri ?? null;
    } catch (error) {
        console.error('Erreur lors du chargement de l\'image depuis AsyncStorage', error);
        return null;
    }
};

/**
 * Sauvegarde l'URI d'une image pour un médicament dans AsyncStorage.
 */
export const saveMedicationImage = async (medicationId: string, uri: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(`imageUri_${medicationId}`, uri);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'image dans AsyncStorage', error);
    }
};
