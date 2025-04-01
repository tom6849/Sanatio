import AsyncStorage from '@react-native-async-storage/async-storage';
import {Effet} from '../type/Effect';


/**
 * Ajoute une liste d'effets secondaires au stockage pour l'utilisateur actuellement connecté.
 */
export const addEffetToStorage = async (newEffetsList: Effet[]) => {
  try {
    const lastUser = await AsyncStorage.getItem('lastUser');
    if (!lastUser) {
      console.error("Aucun utilisateur connecté.");
      return;
    }
    const current = JSON.parse(lastUser);
    const storedUsers = await AsyncStorage.getItem(`users:${current.email}`);
    const parsedUsers = storedUsers ? JSON.parse(storedUsers) : {};

    parsedUsers.effet = newEffetsList;

    await AsyncStorage.setItem(`users:${current.email}`, JSON.stringify(parsedUsers));
  } catch (error) {
    console.error('Erreur lors de lajout des effets secondaires:', error);
  }
};


/**
 * Récupère les effets secondaires des médicaments de l'utilisateur actuellement connecté.
 * Charge les données des utilisateurs et du dernier utilisateur connecté depuis AsyncStorage.
 */
export const getEffects = async (): Promise<Effet[] | null> => {
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
    return parsedUsers.effet || null;
  } catch (error) {
    console.error('Erreur lors du chargement des effets secondaires:', error);
    return null;
  }
};

