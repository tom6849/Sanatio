import React from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import Contact from '../components/Contact';

const ContactScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchText}
                placeholder="Rechercher un médecin"
                placeholderTextColor="#808080C0"
            />
            <ScrollView>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            <Contact/>
            

            </ScrollView>
           

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, 
        backgroundColor: '#fff',
    },
    searchText: {
        height: 50,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom : 20
    },
});

export default ContactScreen;