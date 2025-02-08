import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useMedication } from '../../context/MedicationContext'; 
import { Medication } from '../../type/Medication';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const chartConfig = {
  backgroundGradientFrom: '#f8f9fa',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#f8f9fa',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const Stats = () => {
  const { medications } = useMedication();

  const fullLabels = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];


  const labels = fullLabels.map((label) => label.slice(0, 3));


  const data = fullLabels.map((label) => {

    const medicationCount = medications?.reduce((count, med) => {
      if (med.jours?[label]:null) {
        return count + 1; 
      }
      return count;
    }, 0) || 0;

    return medicationCount; 
  });

  const chartData = {
    labels, 
    datasets: [
      {
        data, 
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 4,
      },
    ],
    legend: ['Nombre de médicaments'], 
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={screenWidth - 40} 
          height={screenHeight * 0.25} 
          chartConfig={chartConfig}
          bezier 
          fromZero 
          style={styles.chartStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  chartWrapper: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartStyle: {
    width: '100%',
    borderRadius: 16,
    elevation: 2,
  },
});

export default Stats;
