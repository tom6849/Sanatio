import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../type/Medication';
import ModalEdited from './ModalEdited'; 

const Stock = () => {
  const { medications, setMedications } = useMedication();
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteMedication = (id: string) => {
    Alert.alert(
      "Supprimer le médicament",
      "Êtes-vous sûr de vouloir supprimer ce médicament ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          onPress: () => {
            const updatedMedications = medications!.filter(m => m.id !== id);
            setMedications(updatedMedications); 
          },
        }
      ]
    );
  };
  
  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {medications === null ? (
          <Text style={styles.noDataText}>Aucune donnée de médicament disponible.</Text>
        ) : medications.length > 0 ? (
          medications.map((medication) => (
            <View key={medication.id} style={styles.medicationContainer}>
              <TouchableOpacity
                onPress={() => handleDeleteMedication(medication.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.medicationTitle}>{medication.name}</Text>
              <Text style={styles.label}>Heure de prise :</Text>
              <Text style={styles.inputData}>{medication.time}</Text>

              <Text style={styles.label}>Date de début :</Text>
              <Text style={styles.inputData}>{medication.isoStartDate}</Text>

              <Text style={styles.label}>Date de fin :</Text>
              <Text style={styles.inputData}>{medication.isoEndDate}</Text>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setSelectedMedication(medication);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.editButtonText}>Éditer le médicament</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucun médicament disponible pour ce jour.</Text>
        )}
      </ScrollView>
      {selectedMedication && (
        <ModalEdited 
          modalVisible={modalVisible}
          medication={selectedMedication}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    width: '100%',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  medicationContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  medicationTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#4C6EF5',
    textAlign: 'center',
  },
  inputData: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
    height: 40,
    textAlignVertical: 'center',
  },
  editButton: {
    backgroundColor: '#4C6EF5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: 'red',
    borderRadius: 25, 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 0, 
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
});

export default Stock;
