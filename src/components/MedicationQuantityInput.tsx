import { View, Text, TextInput, StyleSheet } from 'react-native';

type MedicationQuantityInputProps = {
  nbPill: number;
  setNbPill: (value: number) => void;
};

const MedicationQuantityInput: React.FC<MedicationQuantityInputProps> = ({ nbPill, setNbPill }) => {
  const handleInputChange = (text: string) => {
    const value = text ? parseInt(text, 10) : 0;  
    if (!isNaN(value)) {
      setNbPill(value);  
    }
  };

  return (
    <View>
      <Text style={styles.label}>Nombre de médicaments :</Text>
      <TextInput
        keyboardType="numeric"
        value={nbPill.toString()}  
        onChangeText={handleInputChange}  
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 15,
  },
});

export default MedicationQuantityInput;
