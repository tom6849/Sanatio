import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { addEffetToStorage, getEffects } from '../services/effetsServices';
import { Effet } from '../type/Effect';

const Effets = () => {
  const [effet, setEffet] = useState<string>('');
  const [effetsList, setEffetsList] = useState<Effet[]>([]);

  useEffect(() => {
    loadingEffects();
  }, []);

  const handleAddEffet = () => {
    if (effet.trim() !== '') {
      const nouvelEffet: Effet = {
        date: new Date(),
        effet: effet,
      };
      const newEffetsList = [...effetsList, nouvelEffet];
      setEffetsList(newEffetsList);
      setEffet('');
      addEffetToStorage(newEffetsList);
    }
  };

  const loadingEffects = async () => {
    const storedEffets = await getEffects();
    setEffetsList(storedEffets ?? []);
  };

  const handleDeleteEffet = (index: number) => {
    const newEffetsList = effetsList.filter((_, i) => i !== index);
    setEffetsList(newEffetsList);
    addEffetToStorage(newEffetsList);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Ajouter un effet secondaire</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez un effet secondaire"
        value={effet}
        onChangeText={setEffet}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#0056b3' : '#007BFF' },
        ]}
        onPress={handleAddEffet}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.container}>
        {effetsList.length > 0 ? (
          effetsList.map((effet, index) => (
            <View key={index} style={styles.containerEffet}>
              <Text style={styles.date}>{new Date(effet.date).toISOString().split('T')[0]}</Text>
              <View style={styles.effetContainer}>
                <Text style={styles.effetText}>{effet.effet}</Text>
                <TouchableOpacity onPress={() => handleDeleteEffet(index)} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>✖</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noEffetText}>Aucun effet secondaire ajouté</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    marginTop: 10,
    padding: 10,
  },
  effetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  effetText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteText: {
    fontSize: 20,
    color: '#FF0000',
  },
  noEffetText: {
    fontSize: 16,
    color: '#777',
  },
  containerEffet: {
    marginBottom: 5,
  },
  date: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Effets;
