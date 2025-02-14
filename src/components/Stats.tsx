import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useMedication } from '../context/MedicationContext';

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
  const today = new Date();
  const currentDay = today.getDay();
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  const fullLabels = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const lab = fullLabels.map((label) => label.slice(0, 3));

  const data1 = fullLabels.map((label, index) => {
    const day = new Date(lastMonday);
    day.setDate(lastMonday.getDate() + index);
    const dayIso = day.toISOString().split('T')[0];

    return medications?.reduce((count, med) => {
      if (med.jours?.includes(label) && med.date?.some((entry) => entry.date === dayIso)) {
        return count + 1;
      }
      return count;
    }, 0) ;
  });

  const data2 = fullLabels.map((label, index) => {
    const day = new Date(lastMonday);
    day.setDate(lastMonday.getDate() + index);
    const dayIso = day.toISOString().split('T')[0];

    return medications?.reduce((count, med) => {
      if (med.jours?.includes(label)) {
        const takenToday = med.date?.some((entry) => entry.date === dayIso && entry.taken === true);
        if (takenToday) {
          return count + 1;
        }
      }
      return count;
    }, 0) || 0;
  });


  const chartData = {
    labels: lab,
    datasets: [
      {
        data: data1,
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 4,
        legend: ['Médicaments (total)'],
      },
      {
        data: data2,
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 4,
        legend: ['Médicaments pris'],
      },
    ],
    legend: ['Médicaments', 'Médicaments pris'],
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  chartStyle: {
    width: '90%',
    borderRadius: 16,
    elevation: 2,
  },
});

export default Stats;
