import { Medecin } from "../type/Medecin";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constante clé pour le stockage des utilisateurs dans AsyncStorage
const STORAGE_KEY = 'users';

/**
 * Récupère les médecins à partir de l'API.
 * Utilise un paramètre `query` pour effectuer la recherche.
 * 
 * @param {string} query - La requête de recherche des médecins.
 * @returns {Promise<Medecin[]>} - Une promesse contenant la liste des médecins trouvés.
 */
export const fetchMedecinFromAPI = async (query: string): Promise<Medecin[]> => {
  try {
    const response = await fetch(`http://51.254.97.66:3000/api/v1/medecins?query=${query}&page=1`);
    if (!response.ok) throw new Error('Impossible de charger les médecins.');
    const jsonResponse = await response.json();

    return jsonResponse.elements.map((doctor: any) => {
      const addressComponents = [];
      if (doctor.numeroVoie && doctor.numeroVoie !== null) addressComponents.push(doctor.numeroVoie);
      if (doctor.libelleVoie && doctor.libelleVoie !== null) addressComponents.push(doctor.libelleVoie);
      if (doctor.bureauCedex && doctor.bureauCedex !== null) addressComponents.push(doctor.bureauCedex);

      const address = addressComponents.length > 0 ? addressComponents.join(' ') : 'Adresse non disponible';

      return {
        id: doctor.identifiantPP,
        prenom: doctor.prenomExercice,
        nom: doctor.nomExercice,
        mail: doctor.adresseEmail || '',
        telephone: doctor.telephone || '',
        speciality: doctor.libelleProfession,
        address: address,
        city: doctor.libelleCommune,
        postalCode: doctor.codePostal,
        establishment: doctor.raisonSocialeSite || doctor.enseigneCommercialeSite,
      };
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('Une erreur inconnue est survenue.');
    }
  }
};

/**
 * Récupère les données de l'utilisateur actuel à partir de AsyncStorage.
 * Si aucun utilisateur n'est connecté, retourne une structure de données vide pour les médecins.
 * 
 * @returns {Promise<{ medecin: Medecin[] }>} - Une promesse contenant les données de l'utilisateur, avec une liste de médecins.
 */
export const getUserData = async (): Promise<{ medecin: Medecin[] }> => {
    const lastUser = await AsyncStorage.getItem('lastUser');
    if (!lastUser) return { medecin: [] };

    const currentUser = JSON.parse(lastUser);
    const storedUserData = await AsyncStorage.getItem(`${STORAGE_KEY}:${currentUser.email}`);
    return storedUserData ? JSON.parse(storedUserData) : { medecin: [] };
};

/**
 * Ajoute un médecin à la liste des favoris de l'utilisateur dans AsyncStorage.
 * 
 * @param {Medecin} medecin - Le médecin à ajouter aux favoris.
 */
export const addFavoriteMedecin = async (medecin: Medecin) => {
    const userData = await getUserData();
    userData.medecin.push(medecin);
    await saveUserData(userData);
};

/**
 * Supprime un médecin de la liste des favoris de l'utilisateur dans AsyncStorage.
 * 
 * @param {Medecin} medecin - Le médecin à supprimer des favoris.
 */
export const removeFavoriteMedecin = async (medecin: Medecin) => {
    const userData = await getUserData();
    const index = userData.medecin.findIndex((m) => m.id === medecin.id);
    if (index !== -1) {
        userData.medecin.splice(index, 1);
        await saveUserData(userData);
    }
};

/**
 * Sauvegarde les données de l'utilisateur dans AsyncStorage.
 * 
 * @param {Object} userData - Les données de l'utilisateur, y compris la liste des médecins favoris.
 */
export const saveUserData = async (userData: { medecin: Medecin[] }) => {
    const lastUser = await AsyncStorage.getItem('lastUser');
    if (!lastUser) return;
    const currentUser = JSON.parse(lastUser);
    await AsyncStorage.setItem(`${STORAGE_KEY}:${currentUser.email}`, JSON.stringify(userData));
};
