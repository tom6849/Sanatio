import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';  
const { width } = Dimensions.get('window');
import { useMedication } from '../context/MedicationContext'; 

const ProgressBar = () => {
  const { medToday } = useMedication();
  const [count, setCount] = useState(0); 
  const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');

  useEffect(() => {
    const checkMedToTake = () => {
      if (medToday != null) {
        let medsToTake = 0;
        let totalMeds = 0;
        medToday.forEach((elem) => {
          const value = elem.date;
          value.forEach((entry) => {
            if (entry.date === todayIso) {
              totalMeds += 1;
              if (!entry.taken) {
                medsToTake += 1;
              }
            }
          });
        });

        setCount(medsToTake); 
      }
    };
    checkMedToTake();
  }, [medToday]);
  const progress = medToday.length > 0 ? (medToday.length - count) / medToday.length : 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Médicaments pris aujourd'hui</Text>
      <Bar 
        progress={progress} 
        width={width * 0.6} 
        height={14} 
        borderRadius={50} 
        unfilledColor='#D3E1FE' 
        color='#4D82F3' 
        borderColor='transparent' 
      />
      <Text style={styles.subTitle}>
        {medToday.length - count} / {medToday.length} médicaments
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
  },
  title: {
    fontSize: 18,
    color: '#545A61',
    paddingBottom : 5,
    fontWeight : 'regular',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray', 
    paddingTop : 5,
    fontWeight : 'regular',
  },
});

export default ProgressBar;
