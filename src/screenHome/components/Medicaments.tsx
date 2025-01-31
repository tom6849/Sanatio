import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import ButtonValidate from '../../screenCalendar/components/ButtonValidate';
import { Medication } from '../../context/MedicationContext';

const Medicaments = ({ medication }: { medication: Medication }) => {
    const todayIso = new Date().toLocaleDateString('fr-FR').split('/').reverse().join('-');
    return (
        <View style={styles.card}>
            <Text style={styles.medicineText} numberOfLines={1} ellipsizeMode="tail" >{medication.name}</Text>
            <View style={styles.content}>
                <Image  
                    source={require('../../img/PilePlus.png')} 
                    style={styles.image} 
                    resizeMode="contain" 
                />
                <View style={styles.timeContainer}>
                    <Text style={styles.time} >{medication.time}</Text>
                    <Text style={styles.route} numberOfLines={2} ellipsizeMode="tail">{medication.administrationRoutes}</Text>
                </View>
            </View>
            <ButtonValidate id={medication.id} date={todayIso}/>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 220,
        height: '95%',
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        elevation: 10, 
    
    },
    medicineText: {
        fontSize: 18,
        color: '#292F35',
        fontWeight: 'bold',
        width : '100%'
    },
    content: {
        flexDirection: 'row',
        maxHeight : '100%'
    },
    image: {
        width : 80,
        height : 80 ,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    timeContainer: {
        marginLeft: 10,
        width : '60%'
    },    
    time: {
        color: '#4D82F3',
        fontSize: 20, 
        fontWeight: 'bold',
    },
    route: {
        color: '#B6BDC4',
        fontSize: 16, 
    }
    
});

export default Medicaments;
