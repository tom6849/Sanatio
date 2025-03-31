import { Medecin } from "../type/Medecin";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Récupère les médecins à partir de l'API.
 * Utilise un paramètre `query` pour effectuer la recherche.
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
 * Récupère la liste des médecins stockés localement pour l'utilisateur actuel.
 *
 * @returns {Promise<Medecin[]>} Une promesse contenant un tableau de médecins.
 */


export const getMedecinFromLocal = async (): Promise<Medecin[]> => {
  try {
      const lastUser = await AsyncStorage.getItem('lastUser');
      if (!lastUser) return [];
      const currentUser = JSON.parse(lastUser);
      const storedUserData = await AsyncStorage.getItem(`users:${currentUser.email}`);
      const parsedData = storedUserData ? JSON.parse(storedUserData) : { medecin: [] };
      return Array.isArray(parsedData.medecin) ? parsedData.medecin : [];
  } catch (error) {
      console.error('Erreur lors de la récupération des médecins locaux:', error);
      return [];
  }
};



