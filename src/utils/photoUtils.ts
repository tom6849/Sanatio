import { launchCamera } from 'react-native-image-picker';
import { saveMedicationImage } from '../services/imageService';

/**
 * Gère la prise de photo avec la caméra, enregistre l'URI et renvoie l'URI.
 */
export const handleTakePhoto = async (medicationId: string, setImageUri: React.Dispatch<React.SetStateAction<string | null>>) => {
    launchCamera({ mediaType: 'photo', quality: 1 }, async (response) => {
        if (response.didCancel) {
            console.log('Utilisateur a annulé');
        } else if (response.errorCode) {
            console.error('Erreur: ', response.errorMessage);
        } else {
            if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                    setImageUri(uri);
                    await saveMedicationImage(medicationId, uri);
                } else {
                    console.error('L\'URI de l\'image est undefined');
                    setImageUri(null);
                }
            }
        }
    });
};
