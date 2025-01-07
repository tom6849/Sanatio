import {useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Bar } from 'react-native-progress';  
const { width } = Dimensions.get('window');
import { useMedication } from '../../context/MedicationContext'; 
import { Medication } from '../../context/MedicationContext';

const ProgressBar = () => {
      const { medications, setMedications } = useMedication();
      
    const countMedicationsForToday = (medications: Medication[]) => {
        let count = 0;
        const dateObject = new Date();
        const dateString = dateObject.toLocaleDateString('fr-FR'); 
        const [jour, mois, annee] = dateString.split('/');
        const todayIso = `${annee}-${mois}-${jour}`; 
    
        medications.forEach((elem) => {
            elem.date?.forEach((date) => {
                if (date === todayIso) {
                    count += 1;
                }
            });
        });
    
        return count;
    };
    

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Médicaments pris aujourd'hui</Text>
            <Bar progress={1/countMedicationsForToday(medications)} width={width * 0.6} height={14} borderRadius={50} unfilledColor='#D3E1FE' color='#4D82F3' borderColor='transparent' />
            <Text style={styles.subTitle}>1 / {countMedicationsForToday(medications)} médicaments</Text>
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
        fontWeight : 'regular'
    },
    subTitle: {
        fontSize: 14,
        color: 'gray', 
        paddingTop : 5,
        fontWeight : 'regular'
    },
});

export default ProgressBar;
