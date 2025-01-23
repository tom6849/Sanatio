import React from 'react';
import { View, Text, Pressable, StyleSheet,FlatList } from 'react-native';
import { Medication } from '../../context/MedicationContext';
import PilePlus from '../../img/ImgPilePlus';

interface Props {
  medications: Medication[];
  onPress: (item: Medication) => void;
}

const FilteredMedicationItem: React.FC<Props> = ({ medications, onPress }) => (
  <FlatList
    data={medications}
    style={styles.list}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => 
      <Pressable style={styles.medicationItem}  onPress={() => onPress(item)}>
      <View style={styles.medicationIcon}>
        <PilePlus />
      </View>
      <View style={styles.infoMedication}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <Text style={styles.medicationType}>Type(s) : {item.pharmaForm}</Text>
        <Text style={styles.medicationType}>Administration : {item.administrationRoutes}</Text>
      </View>
    </Pressable>}             
  />)

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10, // Espacement entre le conteneur de la liste et les bords
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8, // Ajoute un espacement entre chaque élément
    borderRadius: 8,
    elevation: 2, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  medicationIcon: {
    width: 50, // Taille fixe pour l'icône
    height: 50, // Taille fixe pour l'icône
    marginRight: 10, // Ajoute un espace entre l'icône et les infos
  },
  infoMedication: {
    flex: 1, // Prend tout l'espace restant
  },
  medicationName: {
    fontSize: 18,
    color: '#002467',
    fontWeight: 'bold',
  },
  medicationType: {
    fontSize: 14,
    color: 'gray',
  },
});

export default FilteredMedicationItem;
