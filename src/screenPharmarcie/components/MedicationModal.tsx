import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import CloseModal from '../../img/CloseModal';

const MedicationModal = ({ visible, onClose, medication }: { visible: boolean; onClose: () => void; medication: { name: string; pharmaForm: string; administrationRoutes: string } | null }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState('');

  if (!medication) return null;

  // Validation des champs
  const isValidDate = (date: string) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    return datePattern.test(date);
  };

  const isValidTime = (time: string) => {
    const timePattern = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
    return timePattern.test(time);
  };

  const handleAddMedication = () => {
    // Vérification de la validité des champs
    if (!startDate || !endDate || !duration || !time) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Erreur', 'Les dates doivent être au format DD/MM/YYYY.');
      return;
    }

    if (!isValidTime(time)) {
      Alert.alert('Erreur', 'L\'heure doit être au format HH:MM.');
      return;
    }

    // Ici, tu peux ajouter la logique pour ajouter le médicament
    // Par exemple, envoyer les données à une API ou les enregistrer dans l'état global

    // Réinitialiser les champs après avoir ajouté le médicament
    setStartDate('');
    setEndDate('');
    setDuration('');
    setTime('');

    onClose(); // Fermer la modal après l'ajout
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <CloseModal size={40} color="#1e3a8a" />
          </Pressable>

          <Text style={styles.modalTitle}>{medication.name}</Text>
          <Text style={styles.modalSubTitle}>Type : {medication.pharmaForm}</Text>
          <Text style={styles.modalSubTitle}>Endroit : {medication.administrationRoutes}</Text>

          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.label}>Date de début (DD/MM/YYYY) :</Text>
            <TextInput
              style={styles.input}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Date de fin (DD/MM/YYYY) :</Text>
            <TextInput
              style={styles.input}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Durée (en jours) :</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
              placeholder="Durée en jours"
            />

            <Text style={styles.label}>Heure (HH:MM) :</Text>
            <TextInput
              style={styles.input}
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
              keyboardType="numeric"
            />
          </ScrollView>

          <Pressable style={styles.addButton} onPress={handleAddMedication}>
            <Text style={styles.addButtonText}>Ajouter le médicament</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%', 
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 10,
    textAlign: 'center', 
    flexWrap: 'wrap',    
    maxWidth: '90%',     
  },
  modalSubTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingLeft: 20,
    marginBottom: 20, 
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20, 
  },
  addButton: {
    paddingVertical: 12,
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default MedicationModal;
