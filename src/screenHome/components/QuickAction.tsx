import React from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import Action from './Action';

const QuickAction = () => {
    return (
        <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>Ajouter une ordonnance</Text>
                        <Action logo="photo" />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>Rechercher un médicament</Text>
                        <Action logo="search" />
                    </View>
                </View>
                <View style={styles.fullWidthBox} >
                <Text style={styles.boxTitle}>Signaler un effet secondaire </Text>
                     <Action logo="effet" />
                </View>
               
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height : '70%',
        paddingTop : 32,
    },
    
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    box: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#3C91E6',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, 
    },
    fullWidthBox: {
        width: '100%',
        height: 120,
        backgroundColor: '#0073C5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, 
        elevation: 5,
    },
    boxTitle: {
        color: 'white',
        fontSize: 16, 
        marginBottom: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: '#00000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 6,
    },
    
});



export default QuickAction;
