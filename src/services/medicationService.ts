import AsyncStorage from '@react-native-async-storage/async-storage';
import { Medication } from '../type/Medication';

/**
 * Charge les médicaments stockés dans AsyncStorage.
 * Si aucune donnée n'est trouvée, retourne un tableau vide.
 */
export const loadStoredMedications = async (): Promise<Medication[]> => {
  try {
    const storedData = await AsyncStorage.getItem('medications');
    return storedData ? JSON.parse(storedData) : [];
  } catch (err) {
    throw new Error("Erreur lors du chargement des médicaments locaux.");
  }
};

/**
 * Récupère les médicaments à partir de l'API.
 * Utilise un paramètre `query` pour effectuer la recherche.
 */
export const fetchMedicationsFromAPI = async (query: string): Promise<Medication[]> => {
  try {
    const response = await fetch(`http://51.254.97.66:3000/api/v1/cisbdpm?query=${query}&page=1`);
    if (!response.ok) throw new Error('Impossible de charger les médicaments.');
    const jsonResponse = await response.json();
    return jsonResponse.elements || [];
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('Une erreur inconnue est survenue.');
    }
  }
};

/**
 * Récupère les médicaments de l'utilisateur actuellement connecté.
 * Charge les données des utilisateurs et du dernier utilisateur connecté depuis AsyncStorage.
 */
export const getMedications = async (): Promise<Medication[] | null> => {
  try {
    const lastUser = await AsyncStorage.getItem('lastUser');
    if (!lastUser) {
      return null;
    }
    const current = JSON.parse(lastUser);
    const storedUsers = await AsyncStorage.getItem(`users:${current.email}`);
    if (!storedUsers) {
      console.error("Aucun utilisateur correspondant trouvé.");
      return null;
    }

    const parsedUsers = JSON.parse(storedUsers);
    return parsedUsers.medications || null;
  } catch (error) {
    console.error('Erreur lors du chargement des médicaments:', error);
    return null;
  }
};


/**
 * Met à jour les médicaments de l'utilisateur dans AsyncStorage.
 */
export const updateMedications = async (newMedications: Medication[]) => {
  try {
    const lastUser = await AsyncStorage.getItem('lastUser');
    if (!lastUser) {
      return;
    }
    const currentUser = JSON.parse(lastUser);
    const storedUsers = await AsyncStorage.getItem(`users:${currentUser.email}`);
    if (!storedUsers) {
      console.log("Utilisateur introuvable dans AsyncStorage.");
      return;
    }
    currentUser.medications = newMedications;
    await AsyncStorage.setItem(`users:${currentUser.email}`, JSON.stringify(currentUser));

    console.log("Médicaments mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour des médicaments :", error);
  }
};

