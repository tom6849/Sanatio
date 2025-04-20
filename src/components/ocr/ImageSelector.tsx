import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

interface ImageSelectorProps {
  onSelectImage: (fromLibrary: boolean) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelectImage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelectImage(true)} style={styles.button} activeOpacity={0.8}>
        <Image source={require('../../img/UploadOrdonnance.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Importer une photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onSelectImage(false)} style={styles.button} activeOpacity={0.8}>
        <Image source={require('../../img/ScanLogo.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Prendre une photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    elevation: 5, 
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  buttonText: {
    flex: 1, 
    textAlign: 'center',
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default ImageSelector;
