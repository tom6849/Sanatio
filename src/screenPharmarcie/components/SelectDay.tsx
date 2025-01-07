import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface SelectedDayProps {
  onSelectDays: (selectedDays: { [key: string]: boolean }) => void;
}

const SelectedDay: React.FC<SelectedDayProps> = ({ onSelectDays }) => {
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({
    lundi: false,
    mardi: false,
    mercredi: false,
    jeudi: false,
    vendredi: false,
    samedi: false,
    dimanche: false,
  });

  const toggleDay = (day: string) => {
    const updatedSelectedDays = { ...selectedDays };
    updatedSelectedDays[day] = !updatedSelectedDays[day];

    setSelectedDays(updatedSelectedDays);
    onSelectDays(updatedSelectedDays);
  };

  return (
    <View>
      <Text style={styles.title}>Selectionner les jours</Text>
      {Object.keys(selectedDays).map((day) => (
        <Pressable
          key={day}
          style={[
            styles.dayContainer,
            selectedDays[day] ? styles.selected : styles.unselected,
          ]}
          onPress={() => toggleDay(day)}
        >
          <Text style={selectedDays[day] ? styles.selectedText : styles.unselectedText}>
            {day}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  dayContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: '#4D82F3',
  },
  unselected: {
    backgroundColor: '#E0E0E0',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#000000',
  },
});

export default SelectedDay;
