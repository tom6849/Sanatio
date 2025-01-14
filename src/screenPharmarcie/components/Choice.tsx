import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ScanIcon from '../../img/ScanIcon';
import Search from '../../img/ImgSearchMed';

const { width, height } = Dimensions.get('window');

const Choice = ({ value }: { value: number }) => {
    const title = value === 1 ? 'By Ordonnance' : 'By Research';
    const subtitle = value === 1 ? 'Scan your prescriptions here' : 'Quickly find information';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            {value === 1 ? (
                <ScanIcon size={Math.min(width, height) * 0.5} color="#0073C5" />
            ) : (
                <Search size={Math.min(width, height) * 0.5} color="#0073C5" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 4,
        borderColor: '#005fa3',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F6FB',
        elevation: 5,
        margin: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#005fa3',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Choice;
