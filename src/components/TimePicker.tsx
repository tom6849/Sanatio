import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

type TimePickerComponentProps = {
  time: string;  
  onTimeChange: (time: string) => void;
  showTimePicker: boolean;
  setShowTimePicker: (show: boolean) => void;
  med : string
};

const TimePicker: React.FC<TimePickerComponentProps> = ({
  time,
  onTimeChange,
  showTimePicker,
  setShowTimePicker,
  med
}) => {
  return (
    <View style={styles.timePickerContainer}>
      <Text style={styles.label}>Heure de prise :</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
        <Text style={styles.inputText}>{time || med }</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DatePicker
          mode="time"
          selected={time}
          onTimeChange={(newTime) => {
            const formattedTime = newTime; 
            onTimeChange(formattedTime); 
            setShowTimePicker(false);  
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
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

export default TimePicker;
