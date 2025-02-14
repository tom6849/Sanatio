import AsyncStorage from '@react-native-async-storage/async-storage';

type Effet = {
  date: Date;
  effet: string;
};

export const addEffetToStorage = async (newEffetsList: Effet[]) => {
  try {
    await AsyncStorage.setItem('effets', JSON.stringify(newEffetsList));
  } catch (error) {
    console.error('Erreur pour ajouter les données', error);
  }
};

export const loadEffetsFromStorage = async (): Promise<Effet[]> => {
  try {
    const storedEffect = await AsyncStorage.getItem('effets');
    return storedEffect ? JSON.parse(storedEffect) : [];
  } catch (error) {
    console.error('Erreur pour récupérer les données', error);
    return [];
  }
};
