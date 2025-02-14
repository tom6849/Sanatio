import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import StoredMedicationItem from './StoredMedicamtionItem';
import FilteredMedicationItem from './FilteredMedicationItem';
import MedicationModal from './ModalAdd';
import Search from '../img/ImgSearchMed';
import { loadStoredMedications, fetchMedicationsFromAPI } from '../services/medicationService';
import { Medication } from '../type/Medication';

const SearchMed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredMedications([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const medications = await fetchMedicationsFromAPI(query);
      setFilteredMedications(medications);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const openModal = (item: Medication) => {
    setSelectedMed(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMed(null);
    setSearchQuery('');

  };

  const headerText = searchQuery.trim() === '' ? 'Mes médicaments' : `Recherche de "${searchQuery.trim()}"`;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search style={styles.icon} color="#808080C0" />
        <TextInput
          style={styles.searchText}
          placeholder="Rechercher un médicament"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#808080C0"
        />
      </View>
      <Text style={styles.titleDisplay}>{headerText}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#002467" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        searchQuery.trim() === '' ? (
          <StoredMedicationItem />
        ) : (
          <FilteredMedicationItem medications={filteredMedications} onPress={openModal} />
        )
      )}
      <MedicationModal visible={modalVisible} onClose={closeModal} medication={selectedMed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: '#F3F6FB',
  },
  searchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    width: '100%',
  },
  searchText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },
  icon: {
    maxWidth: '7%',
  },
  titleDisplay: {
    marginVertical: '4%',
    fontSize: 20,
    color: '#0073C5',
  },
});

export default SearchMed;
