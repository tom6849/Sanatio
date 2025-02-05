// src/screens/Ordonnance.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useMedication } from '../../context/MedicationContext'; 
import { Medication } from '../../type/Medication';

const Ordonnance = () => {
  const { medications, setMedications } = useMedication(); 
  useEffect(() => {
  }, [setMedications]);

  const handleActivate = (medication: Medication) => {
    console.log("Réactivation du médicament:", medication.name);
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>
      
      {medications != null ? (
  medications.map((elem, index) => (
    <View key={index} style={styles.ordonnance}>
      <Image
        source={require('../../img/PilePlus.png')}
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
});

export default Ordonnance;
