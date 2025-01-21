import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, Pressable } from 'react-native';
import MedicationModal from './MedicationModal'; // Import du composant Modal
import Search from '../../img/ImgSearchMed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMedication } from '../../context/MedicationContext';
import { Medication } from '../../context/MedicationContext';
import PilePlus from '../../img/ImgPilePlus';



const SearchMed: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);
  const [storedMedications, setStoredMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const headerText = searchQuery.trim() === '' ? 'Mes médicaments' : `Recherche de "${searchQuery.trim()}"`;
  
  const fetchMedications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://10.0.2.2:3000/api/v1/item");
      if (!response.ok) throw new Error('Impossible de charger les médicaments.');
      const data: Medication[] = await response.json();
      setFilteredMedications(data); // Initialise la liste affichée avec les médicaments par défaut
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const loadStoredMedications = async () => {
    const storedData = await AsyncStorage.getItem('medications');
    const parsedMedications: Medication[] = storedData ? JSON.parse(storedData) : [];
    setStoredMedications(parsedMedications);  // Stocke les médicaments en local
  };

  useEffect(() => {
    fetchMedications();
    loadStoredMedications();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    // Sinon, appeler l'API pour rechercher
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/v1/item?search=${query}`);
      if (!response.ok) throw new Error('Impossible de charger les médicaments.');
      const data: Medication[] = await response.json();
      setFilteredMedications(data);
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
    loadStoredMedications();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search style={styles.icon} color="#808080C0" />
        <TextInput
          style={styles.searchText}
          placeholder="Rechercher un médicament"
          value={searchQuery}
          onChangeText={handleSearch} // Appel de la fonction handleSearch
          placeholderTextColor="#808080C0"
        />
      </View>
      <Text style={styles.titleDisplay}>{headerText}</Text>
      

      {loading ? (
        <ActivityIndicator size="large" color="#002467" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredMedications.length > 0 ? (
        <FlatList
          data={searchQuery.trim() === '' ? storedMedications : filteredMedications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={styles.medicationItem} onPress={() => openModal(item)}>
              <View style={styles.medicationIcon}>
                <PilePlus/>
              </View>
              <View style={styles.infoMedication}>
                <View>
                  <Text>{item.isoStartDate != undefined ? item.isoStartDate : "null"}</Text>
                  <Text>{item.isoEndDate}</Text>
                </View>
                <Text style={styles.MedicationName}>{item.name}</Text>
                <Text style={styles.MedicationType}>Type : {item.pharmaForm}</Text>
                <Text style={styles.MedicationType}>Administration : {item.administrationRoutes}</Text>
                <Text style={styles.MedicationType}>Nombre de cette article{item.count}</Text>
              </View>
              
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
    paddingHorizontal: '5%',
    backgroundColor: '#F3F6FB',
  },
  searchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '7%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    gap: '20%',
  },
  searchText: {
    fontSize: 16,
    color: '#333',
  },
  medicationItem: {
    backgroundColor: 'white',
    display:'flex',
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems:'center',
    padding:"5%",
    gap:"50%"
    
  },
  infoMedication: {
    display: 'flex',
    flexDirection:'column',
  },
  medicationIcon: {
    display:'flex',
    flex:1
    
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
  icon: {
    maxWidth: '7%',
  },
  titleDisplay: {
    display: 'flex',
    alignItems:'center',
    marginVertical:'4%',
    fontSize: 20,
    color: '#0073C5',
  },

});

export default SearchMed;
