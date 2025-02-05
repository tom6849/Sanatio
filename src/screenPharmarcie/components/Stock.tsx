import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../type/Medication';
import SelectedDay from './SelectDay';

const Stock = () => {
  const { medications, setMedications } = useMedication();
  const [editedMedication, setEditedMedication] = useState<Medication>();

  const validateDate = (date: string) => {
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    if (datePattern.test(date)) {
      const [year, month, day] = date.split('/');
      return `${year}-${month}-${day}`;
    }
    return null;
  };

  const validateTime = (time: string) => {
    const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timePattern.test(time);
  };

  const handleSaveChanges = (medication: Medication) => {
    if (editedMedication) {
      const { isoStartDate, isoEndDate, time, id } = editedMedication;

      if (!validateDate(isoStartDate) || !validateDate(isoEndDate)) {
        Alert.alert('Veuillez entrer une date valide (YYYY-MM-DD)');
        return;
      }

      if (!validateTime(time)) {
        Alert.alert('Veuillez entrer une heure valide (HH:mm)');
        return;
      }

      medication.time = editedMedication.time;
      medication.isoStartDate = editedMedication.isoStartDate;
      medication.isoEndDate = editedMedication.isoEndDate;
      setMedications([medication]);
    }
  };

  const handleDeleteMedication = (id: string) => {
    Alert.alert(
      "Supprimer le médicament",
      "Êtes-vous sûr de vouloir supprimer ce médicament ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => setMedications(medications!.filter(medication => medication.id !== id)) 
        }
      ]
    );
  };
  

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.container}>
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
              <TextInput
                style={styles.input}
                placeholder={medication.time}
                onChangeText={(text) =>
                  setEditedMedication({ ...editedMedication!, time: text, id: medication.id, jours: medication.jours })
                }
              />
              <Text style={styles.label}>Date de début :</Text>
              <TextInput
                style={styles.input}
                placeholder={medication.isoStartDate}
                onChangeText={(text) =>
                  setEditedMedication({ ...editedMedication!, isoStartDate: text })
                }
              />
              <Text style={styles.label}>Date de fin :</Text>
              <TextInput
                style={styles.input}
                placeholder={medication.isoEndDate}
                onChangeText={(text) =>
                  setEditedMedication({ ...editedMedication!, isoEndDate: text })
                }
              />
              <TouchableOpacity
                onPress={() => handleSaveChanges(medication)}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Sauvegarder les modifications</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucun médicament disponible pour ce jour.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    width: '100%',
  },
  medicationContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
    elevation: 4,
    position: 'relative', // To allow positioning of delete button
  },
  medicationTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#7DA4F6',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 45,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  saveButton: {
    paddingVertical: 12,
    backgroundColor: '#1e3a8a',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF5C5C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 3,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Stock;
