import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonChoice from './ButtonChoice';

const ContainerChoice = ({ onChoiceChange }: { onChoiceChange: (choice: number | null) => void }) => {
  const [pressedButton, setPressedButton] = useState<number | null>(0);

  const handlePress = (index: number) => {
    setPressedButton(index);
    onChoiceChange(index); 
  };

  return (
    <View style={styles.container}>
      <ButtonChoice
        text="Stats"
        isPressed={pressedButton === 0}
        onPress={() => handlePress(0)}
      />
      <ButtonChoice
        text="Effets"
        isPressed={pressedButton === 1}
        onPress={() => handlePress(1)}
      />
      <ButtonChoice
        text="Ordonnance"
        isPressed={pressedButton === 2}
        onPress={() => handlePress(2)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 145,
  },
});

export default ContainerChoice;
