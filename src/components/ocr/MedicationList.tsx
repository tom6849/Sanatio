import React from 'react';
import { FlatList, Pressable, Text, View, StyleSheet } from 'react-native';
import { Medication } from '../../type/Medication';
import PilePlus from '../../img/ImgPilePlus';

interface MedicationListProps {
  medications: Medication[];
  onSelectMedication: (item: Medication) => void;
  onCloseList: () => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ medications, onSelectMedication, onCloseList }) => {
  return (
    <View>
      <FlatList
        data={medications}
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.medicationItem} onPress={() => onSelectMedication(item)}>
            <View style={styles.medicationIcon}>
              <PilePlus />
            </View>
            <View>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationType}>Type(s) : {item.pharmaForm}</Text>
              <Text style={styles.medicationType}>Administration : {item.administrationRoutes}</Text>
            </View>
          </Pressable>
        )}
      />
      <Pressable style={styles.closeListChoice} onPress={onCloseList}>
        <Text style={styles.confirmText}>Terminer l'ajout de médcaments</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 20,
    flex: 1,
    borderRadius: 8,
  },
  medicationItem: {
    flexDirection: 'row',
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
  medicationName: {
    fontSize: 18,
    color: '#002467',
    fontWeight: 'bold',
  },
  medicationType: {
    fontSize: 14,
    color: 'gray',
  },
  closeListChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7DA4F6',
    height: '10%',
    marginTop: '15%',
    borderRadius: 8,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicationList;
