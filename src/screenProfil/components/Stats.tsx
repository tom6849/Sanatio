import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

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

const data = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      data: [1, 5, 3, 2, 9, 0, 1],
      color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
      strokeWidth: 4, 
    },
  ],
  legend: ['Nombre de médicaments'], 
};

const Stats = () => {
  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Consommation de médicaments hebdomadaire</Text>

      {/* Graphique */}
      <LineChart
        data={data}
        width={screenWidth - 40} 
        height={260} 
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
    marginTop : 10, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  chartStyle: {
    borderRadius: 16,
    elevation: 2,
    marginVertical: 10,
  },

});

export default Stats;
