import React from 'react';
import { View, Text, StyleSheet, Pressable  } from 'react-native';
import Action from './Action';

const QuickAction = ({ navigation }: { navigation: any }) =>  {
    return (
        <View style={styles.container}>
                <View style={styles.row}>
                    <Pressable style={styles.box} onPress={() => navigation.navigate('Pharmacy', { initialIndex: 0 })}>
                        <Text style={styles.boxTitle}>Rechercher un médicament</Text>
                        <Action logo="search" />
                        
                    </Pressable>
                    <Pressable style={styles.box} onPress={() => navigation.navigate('Pharmacy', { initialIndex: 1 })}>
                        <Text style={styles.boxTitle}>Ajouter une ordonnance</Text>
                        <Action logo="photo" />
                    </Pressable>

                </View>
                <Pressable style={styles.fullWidthBox} onPress={() => navigation.navigate('Contact')}>
                    <Text style={styles.boxTitle}>Rechercher un médecin</Text>
                    <Action logo="doctor" />
                </Pressable>
               
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height : '60%',
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
    },
    
});



export default QuickAction;
