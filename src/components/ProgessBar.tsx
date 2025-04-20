import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';  
const { width } = Dimensions.get('window');
import { useMedication } from '../context/MedicationContext'; 
import { Medication } from '../type/Medication';

const ProgressBar: React.FC = () => {
  const { medToday } = useMedication();
  const [count, setCount] = useState<number>(0); 
  const todayIso: string = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');

  useEffect(() => {
    if (!medToday) return;
    setCount(calculateMedsToTake(medToday, todayIso));
  }, [medToday]);

  const progress: number = medToday.length > 0 ? (medToday.length - count) / medToday.length : 0;

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

const calculateMedsToTake = (medications: Medication[], todayIso: string): number => {
  let medsToTake = 0;
  medications.forEach(({ date }) => {
    date.forEach(({ date, taken }) => {
      if (date === todayIso && !taken) {
        medsToTake += 1;
      }
    });
  });
  return medsToTake;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
  },
  title: {
    fontSize: 18,
    color: '#545A61',
    paddingBottom: 5,
    fontWeight: 'normal',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray', 
    paddingTop: 5,
    fontWeight: 'normal',
  },
});

export default ProgressBar;
