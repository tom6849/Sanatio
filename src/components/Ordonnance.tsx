import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useMedication } from '../context/MedicationContext'; 
import { Medication } from '../type/Medication';

const Ordonnance = () => {
  const { medications, setMedications } = useMedication();
  const [modalVisible, setModalVisible] = useState(false);  
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null); 

  const handleActivate = (medication: Medication) => {
    setSelectedMedication(medication);  
    setModalVisible(true);  
  };

  const closeModal = () => {
    setModalVisible(false);  
    setSelectedMedication(null);  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {medications != null ? (
        medications.map((elem, index) => (
          <View key={index} style={styles.ordonnance}>
            <Image
              source={require('../img/PilePlus.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.title}>
              <Text style={styles.medicationName} numberOfLines={1} ellipsizeMode="tail">{elem.name}</Text>
              <Text style={styles.medicationInfo} numberOfLines={2} ellipsizeMode="tail">{elem.pharmaForm}</Text>
              <Text style={styles.dateText}>{elem.isoStartDate} ➡ {elem.isoEndDate}</Text>
            </View>
            <TouchableOpacity
              style={styles.activateButton}
              onPress={() => handleActivate(elem)}  
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Aucun médicament disponible</Text>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}  
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fonctionnalité en cours</Text>
            <Text style={styles.modalText}>
              Cette fonctionnalité est en cours d'ajout pour permettre d'ajouter des informations sur le médicament {selectedMedication?.name}.
            </Text>
            <Button title="Fermer" onPress={closeModal} /> 
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  ordonnance: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,  
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#4D82F3",
    backgroundColor: 'white',
    marginBottom: 15,  
  },
  title: {
    flex: 1,  
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15, 
    marginLeft: 15,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  medicationInfo: {
    fontSize: 14,
    color: '#777',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  activateButton: {
    width: 80,  
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#4D82F3',
    borderRadius: 10,
    marginLeft: 10,  
    marginRight : 15 
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  // Styles pour le modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fond semi-transparent
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Ordonnance;
