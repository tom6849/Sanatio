import React from 'react';
import { View, Text, Pressable, StyleSheet,FlatList } from 'react-native';
import { Medication } from '../../type/Medication';
import PilePlus from '../../img/ImgPilePlus';

interface Props {
  medications: Medication[];
  onPress: (item: Medication,name:string) => void;
}

const FilteredMedicationItem: React.FC<Props> = ({ medications, onPress }) => (
  <FlatList
    data={medications}
    style={styles.list}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => 
      <Pressable style={styles.medicationItem}  onPress={() => onPress(item,'o')}>
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
    paddingVertical: 10, 
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8, 
    borderRadius: 8,
    elevation: 2, 
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

export default FilteredMedicationItem;
