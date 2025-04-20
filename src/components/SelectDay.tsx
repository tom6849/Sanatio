import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type SelectedDayProps = {
  onSelectDays: (selectedDays: string[]) => void;
  defaultSelectedDays?: string[]; // Ajouter la prop pour les jours sélectionnés par défaut
};

const SelectedDay: React.FC<SelectedDayProps> = ({ onSelectDays, defaultSelectedDays = [] }) => {
  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  // Initialiser l'état avec les jours sélectionnés par défaut
  const [selectedDays, setSelectedDays] = useState<string[]>(defaultSelectedDays);

  useEffect(() => {
    // Mettre à jour les jours sélectionnés si les jours par défaut changent
    setSelectedDays(defaultSelectedDays);
  }, [defaultSelectedDays]);

  const toggleDay = (day: string) => {
    let updatedSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedSelectedDays);
    onSelectDays(updatedSelectedDays); // Transmettre les jours sélectionnés au parent
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionner les jours</Text>
      <View style={styles.daysContainer}>
        {jours.map((day) => (
          <Pressable
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) ? styles.selected : styles.unselected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text style={selectedDays.includes(day) ? styles.selectedText : styles.unselectedText}>
              {day[0].toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: 'bold',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  dayButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selected: {
    backgroundColor: '#4D82F3',
  },
  unselected: {
    backgroundColor: '#E0E0E0',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#000000',
  },
});

export default SelectedDay;
