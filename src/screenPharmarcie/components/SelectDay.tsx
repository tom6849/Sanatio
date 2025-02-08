import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type SelectedDayProps = {
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
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionner les jours</Text>
      <View style={styles.daysContainer}>
        {Object.keys(selectedDays).map((day) => (
          <Pressable
            key={day}
            style={[
              styles.dayButton,
              selectedDays[day] ? styles.selected : styles.unselected,
            ]}
            onPress={() => toggleDay(day)}
          >
            <Text style={selectedDays[day] ? styles.selectedText : styles.unselectedText}>
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
