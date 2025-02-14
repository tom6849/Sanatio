import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const ButtonChoice: React.FC<{ text: string, isPressed: boolean, onPress: () => void }> = ({ text, isPressed, onPress }) => {

  const getButtonColor = () => {
    if (isPressed) {
      return '#005fa3'; 
    } else {
      return '#0073C5'; 
    }
  };

  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: getButtonColor() }]} 
    >
      <Text style={styles.text}>{text}</Text>  
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, 
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',  
    textTransform: 'uppercase',  
  },
});

export default ButtonChoice;
