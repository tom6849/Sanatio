import React, { useState } from 'react';
import { View, Text, Modal, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Medication } from '../../type/Medication';
import AddMedicationModal from '../ModalAdd';
import CloseModal from '../../img/CloseModal';
import MedicationList from './MedicationList';
import ImageSelector from './ImageSelector';
import { extractMedicines, filterMedicationsFromAPI, getTextFromOCR } from '../../utils/ocrUtils';

const OcrScanner = () => {
  const [pickedImagePath, setPickedImagePath] = useState<string>('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showListMedication, setShowListMedication] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medication, setMedication] = useState<Medication | null>(null);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement

  const getMedicationsList = async () => {
    try {
      setIsLoading(true); // Active le loader
      const resultFromUri = await getTextFromOCR(pickedImagePath);
      const extractedLines = resultFromUri?.map((value: any) => value.text.trim()) || [];
      const medicationLines = extractMedicines(extractedLines);
      console.log('Médicaments détectés :', medicationLines);
      await filterMedicationsFromAPI(medicationLines, setMedications);
    } catch (error) {
      console.log('Error formatting OCR result:', error);
    } finally {
      setIsLoading(false); // Désactive le loader après l'exécution
    }
  };

  const getImage = async (fromImageLibrary: boolean) => {
    const cameraOptions: CameraOptions = { mediaType: 'photo' };
    const result = fromImageLibrary
      ? await launchImageLibrary(cameraOptions)
      : await launchCamera(cameraOptions);

    if (result.assets && result.assets[0].uri) {
      setPickedImagePath(result.assets[0].uri);
      setShowImageModal(true);
    }
  };

  const handleClose = () => {
    setShowImageModal(false);
    setPickedImagePath('');
    setShowListMedication(false);
    setMedications([]);
  };

  const handleConfirm = () => {
    setShowImageModal(false);
    setShowListMedication(true);
    getMedicationsList();
  };

  const onSelectMedication = (item: Medication) => {
    setMedication(item);
    setModalAddVisible(true);
  };

  const closeModal = () => {
    setModalAddVisible(false);
  };

  return (
    <View style={styles.screen}>
      {showListMedication ? (
        isLoading ? ( 
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <MedicationList
            medications={medications}
            onSelectMedication={onSelectMedication}
            onCloseList={handleClose}
          />
        )
      ) : (
        <View style={styles.container}>
          <ImageSelector onSelectImage={getImage} />
        </View>
      )}

      <Modal visible={showImageModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <CloseModal size={40} color="#FFF" />
          </Pressable>
          <Image source={{ uri: pickedImagePath }} style={styles.previewImage} />
          <Pressable style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirmer l'image</Text>
          </Pressable>
        </View>
      </Modal>

      <AddMedicationModal visible={modalAddVisible} medication={medication} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default OcrScanner;
