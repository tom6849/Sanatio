import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

type DatePickerComponentProps = {
  label: string;
  date: string;
  onDateChange: (date: string) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
};

const DatePickers: React.FC<DatePickerComponentProps> = ({
  label,
  date,
  onDateChange,
  showDatePicker,
  setShowDatePicker,
}) => (
  <View style={styles.datePickerContainer}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
      <Text style={styles.inputText}>{date || 'Sélectionner la date'}</Text>
    </TouchableOpacity>
    {showDatePicker && (
      <DatePicker
        mode="calendar"
        onDateChange={(date) => {
          onDateChange(date);
          setShowDatePicker(false);
        }}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    borderRadius: 12,
    paddingLeft: 20,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputText: {
    fontSize: 16,
  },
});

export default DatePickers;
