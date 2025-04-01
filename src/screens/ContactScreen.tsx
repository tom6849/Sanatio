import { useEffect, useState } from 'react';
import React from 'react';
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Contact from '../components/Contact';
import { fetchMedecinFromAPI, getUserData } from '../services/medecinService';
import { Medecin } from '../type/Medecin';

const ContactScreen = ({ navigation }: { navigation: any }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredMedecin, setFilteredMedecin] = useState<Medecin[]>([]);
    const [medecin, setMedecin] = useState<Medecin[]>([]);
    const [favoriteDoctors, setFavoriteDoctors] = useState<Medecin[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLocalMedecins();
    }, []);

    const handleSearch = async (query: string) => {
        setSearchText(query);
        if (!query.trim()) {
            setFilteredMedecin([]);
            return;
        }
        setLoading(true);
        try {
            const doctors = await fetchMedecinFromAPI(query);
            setFilteredMedecin(doctors || []);
        } finally {
            setLoading(false);
        }
    };

    const loadLocalMedecins = async () => {
        const localMedecins = await getUserData();  
        setMedecin(localMedecins.medecin);          
        setFavoriteDoctors(localMedecins.medecin);  
    };
    

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchText}
                placeholder="Rechercher un médecin"
                placeholderTextColor="#808080C0"
                value={searchText}
                onChangeText={(text) => handleSearch(text)}
            />
            {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}
            <ScrollView>
                {filteredMedecin.length > 0 ? (
                    filteredMedecin.map((doctor) => (
                        <Contact 
                            key={doctor.id} 
                            medecin={doctor} 
                            like={favoriteDoctors.some(fav => fav.id === doctor.id)} 
                            onLikeChange={loadLocalMedecins} 
                        />
                    ))
                ) : (
                    medecin.map((doctor) => (
                        <Contact 
                            key={doctor.id} 
                            medecin={doctor} 
                            like={true} 
                            onLikeChange={loadLocalMedecins} 
                        />
                    ))
                )}
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
        marginBottom: 20,
    },
    loader: {
        marginTop: 10,
    },
});

export default ContactScreen;
