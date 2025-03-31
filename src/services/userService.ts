import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../type/User';

/**
 * Récupère l'utilisateur stocké dans AsyncStorage.
 */
export const getStoredUser = async (): Promise<User | null> => {
    try {
        const savedUser = await AsyncStorage.getItem('lastUser');
        return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        return null;
    }
};

/**
 * Sauvegarde l'utilisateur dans AsyncStorage.
 */
export const saveUser = async (user: User): Promise<void> => {
    try {
        await AsyncStorage.setItem('lastUser', JSON.stringify(user));
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'utilisateur", error);
    }
};

  /**
 * Met à jour le mot de passe de l'utilisateur.
 */
export const updateUserPassword = async (userId: string, oldPassword: string, newPassword: string, email : string) => {
    try {
      const storedUser = await getStoredUser();
  
      if (!storedUser || storedUser.id !== userId) {
        return { success: false, message: "Utilisateur non trouvé." };
      }
  
      if (storedUser.password !== oldPassword) {
        return { success: false, message: "L'ancien mot de passe est incorrect." };
      }
  
      if (newPassword.length < 6) {
        return { success: false, message: "Le mot de passe doit contenir au moins 6 caractères." };
      }
  
      if (storedUser.password === newPassword) {
        return { success: false, message: "Le nouveau mot de passe doit être différent de l'ancien." };
      }

      const usersData = await AsyncStorage.getItem(`users:${email}`);
  
      const updatedUser = { ...storedUser, password: newPassword };
      await saveUser(updatedUser);
      await AsyncStorage.setItem(`users:${email}`, JSON.stringify(usersData));
      return { success: true, message: "Mot de passe mis à jour avec succès." };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      return { success: false, message: "Une erreur s'est produite." };
    }
};

export const updateUserInfo = async (userId: string, field : string, newValue : string, email : string) => {
    try {
        const storedUser = await getStoredUser();

        if (!storedUser || storedUser.id !== userId) {
            return { success: false, message: "Utilisateur non trouvé." };
        }

        const usersData = await AsyncStorage.getItem(`users:${email}`);

        const updatedUser = { ...storedUser, [field]: newValue };
        await saveUser(updatedUser);

        await AsyncStorage.setItem(`users:${email}`, JSON.stringify(usersData));
        return { success: true, message: "Mot de passe mis à jour avec succès." };
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe:", error);
        return { success: false, message: "Une erreur s'est produite." };
    }
};


 /**
 * Renitialiser le compte.
 */

 export const resetAccount = async (email: string) => {
  try {
    await AsyncStorage.removeItem(`users:${email}`);
    await AsyncStorage.removeItem('lastUser');
    return { success: true, message: "Le compte a bien été renitialisé" };
  } catch (error) {
    return { success: false, message: "Une erreur est survenue lors de la réinitialisation du compte." };
  }
};

