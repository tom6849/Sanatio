import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
      <View style={styles.chartWrapper}>
        <LineChart
          data={data}
          width={screenWidth - 40} 
          height={ screenHeight * 0.25} 
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
