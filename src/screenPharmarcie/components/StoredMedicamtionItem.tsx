import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import PilePlus from '../../img/ImgPilePlus';
import { Medication } from '../../type/Medication';

interface Props {
  medications?: Medication[] | null;
  onPress: (item: Medication,name:string) => void;
}

const StoredMedicationItem: React.FC<Props> = ({ medications, onPress }) => (
  <FlatList
    data={medications}
    keyExtractor={(item) => item.id} // Assurez-vous que `name` est unique// Appliquer le style au conteneur
    renderItem={({ item }) => (
      <Pressable style={[
        styles.medicationItem,
        
        // Vérifie les différentes conditions et applique le style approprié
        item.isoStartDate !== undefined && item.pill === undefined
          ? styles.medicationItemRed
          : item.isoStartDate === undefined && item.pill === undefined
          ? styles.medicationItemOrange
          : item.isoStartDate === undefined && item.pill !== undefined
          ? styles.medicationItemBlue
          : item.isoStartDate !== undefined && item.pill !== undefined
          ? styles.medicationItemGreen
          : styles.medicationItem, // Si aucune des conditions n'est remplie, applique aucun style supplémentaire
      ]} onPress={() => onPress(item,'info')}>
        <View style={styles.medicationIcon}>
          <PilePlus />
        </View>
        <View style={styles.infoMedication}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationType}>Type(s) : {item.pharmaForm}</Text>
          <Text style={styles.medicationType}>Administration : {item.administrationRoutes}</Text>
          <Text style={styles.medicationType}>Pill : {item.pill || "Vous n'avez plus de stock"}</Text>
          {item.isoStartDate && (
            <Text style={styles.medicationType}>Prescription : {item.isoStartDate} - {item.isoEndDate}</Text>
          )}
          {!item.isoStartDate && (
            <Text style={styles.medicationType}>Vous n'avez pas de prescription pour ce médicament</Text>
          )}
          
        </View>
      </Pressable>
    )}
  />
);

const styles = StyleSheet.create({
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  medicationItemGreen :{
    borderColor : 'green',
    borderWidth : 2
  },
  medicationItemRed :{
    borderColor : 'red',
    borderWidth : 2
  },
  medicationItemBlue :{
    borderColor : 'blue',
    borderWidth : 2
  },
  medicationItemOrange :{
    borderColor : 'orange',
    borderWidth : 2
  },
  medicationIcon: {
    width: 50, 
    height: 50, 
    marginRight: 10, 
  },
  infoMedication: {
    flex: 1, 
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

export default StoredMedicationItem;
