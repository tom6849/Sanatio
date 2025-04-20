import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ImgArrowRight from "../img/ImgArrowRight";

interface SettingsItemProps {
  label: string;
  value: string | undefined;
  onPress?: () => void;
  arrow : boolean
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label, value, onPress, arrow }) => {
  return (
    <TouchableOpacity style={styles.information} onPress={onPress}>
      <Text style={styles.infoText}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
      {arrow ? <ImgArrowRight size={40} color="black" /> : <View style={{marginRight:30}}/> }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  information: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
});

export default SettingsItem;
