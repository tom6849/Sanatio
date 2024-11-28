import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Action from './Action'

const QuickAction = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Actions rapides</Text>
            <View style={styles.info}>
                <Action/>
                <Action/>
                <Action/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop : 32
    },
    info: {
        flex : 1, 
        backgroundColor: 'white',
        padding: 16, 
        marginTop: 8, 
        borderRadius: 5, 
        elevation: 3, 
        rowGap : 8
    },
    title : {
        color : "#0073C5",
        fontSize : 18,
    },
    text: {
        color: '#002467',
        fontSize: 20, 
        fontWeight: 'semibold',
    },
});

export default QuickAction;
