import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, Pressable } from 'react-native';
import MedicationModal from './MedicationModal'; // Import du composant Modal

type Medication ={
  id: number;
  name: string;
  pharmaForm: string;
  administrationRoutes: string;
}


const SearchMed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  const fetchMedications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://10.0.2.2:3000/api/v1");
      if (!response.ok) throw new Error('Impossible de charger les médicaments.');
      const data: Medication[] = await response.json();
      setMedications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const filteredMeds = medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item: Medication) => {
    setSelectedMed(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMed(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un médicament"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#000000"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#002467" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredMeds.length > 0 ? (
        <FlatList
          data={filteredMeds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable style={styles.medicationItem} onPress={() => openModal(item)}>
              <Text style={styles.MedicationName}>{item.name}</Text>
              <Text style={styles.MedicationType}>Type : {item.pharmaForm}</Text>
              <Text style={styles.MedicationType}>Administration : {item.administrationRoutes}</Text>
            </Pressable>
          )}
        />
      ) : (
        <Text style={styles.NoResultsText}>Aucun médicament trouvé</Text>
      )}
      <MedicationModal
        visible={modalVisible}
        onClose={closeModal}
        medication={selectedMed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F6FB',
  },
  searchBar: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  medicationItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    color: '#002467',
  },
  NoResultsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
  MedicationName: {
    fontSize: 18,
    color: '#002467',
  },
  MedicationType: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SearchMed;
