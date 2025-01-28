import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import ButtonValidate from '../../screenCalendar/components/ButtonValidate';

const { width } = Dimensions.get('window');

const Medicaments = () => {
    return (
        
        <View style={styles.card}>
            <View>
                <View style={styles.medicineContainer}>
                    <Text style={styles.medicineText}>Dafalgan 500mg</Text>
                </View>
                <View style={styles.content}>
                    <Image  
                        source={require('../../img/Exemple.png')} 
                        style={styles.image} 
                        resizeMode="contain" 
                    />
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>20:30</Text>
                        <Text style={styles.route}>Oral</Text>
                    </View>
                </View>
            </View>
            <ButtonValidate/>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 220,
        height: '90%',
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        elevation: 10, 
        overflow : 'visible',
    },
    
    
    medicineContainer: {
        marginBottom: 10,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'flex-start',
    },
    medicineText: {
        fontSize: 18, 
        color: '#292F35',
        fontWeight: 'bold',
        flexWrap : 'wrap'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom : 5
    },
    image: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    timeContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    time: {
        color: '#4D82F3',
        fontSize: 20, 
        fontWeight: 'bold',
    },
    route: {
        color: '#B6BDC4',
        fontSize: 16, 
    },
});

export default Medicaments;
