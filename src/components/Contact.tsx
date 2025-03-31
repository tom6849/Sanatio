import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import Love from '../img/ImgLove';
import { Medecin } from '../type/Medecin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contact = ({medecin,like,onLikeChange,}: {medecin: Medecin; like: boolean; onLikeChange: (like :Boolean) => void;}) => {
    const [liked, setLiked] = useState(like);

    useEffect(() => {
        setLiked(like); 
    }, [like]);

    const toggleLike = async () => {
        try {
            const newLikedState = !liked;
            setLiked(newLikedState);

            const lastUser = await AsyncStorage.getItem('lastUser');
            if (!lastUser) return;
            const currentUser = JSON.parse(lastUser);
            const storedUserData = await AsyncStorage.getItem(`users:${currentUser.email}`);
            let userData = storedUserData ? JSON.parse(storedUserData) : { medecin: [] };

            if (!Array.isArray(userData.medecin)) {
                userData.medecin = [];
            }

            if (newLikedState) {
                userData.medecin.push(medecin);
            } else {
                userData.medecin = userData.medecin.filter((m: Medecin) => m.id !== medecin.id);
            }

            await AsyncStorage.setItem(`users:${currentUser.email}`, JSON.stringify(userData));
            onLikeChange(newLikedState); 
            console.log('Utilisateur mis à jour :', userData);
        } catch (error) {
            console.error('Erreur lors de l’enregistrement du like:', error);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>
                        {medecin.nom} {medecin.prenom}
                    </Text>
                    {medecin.telephone ? (
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${medecin.telephone}`)}>
                            <Text style={styles.phone}>📞 {medecin.telephone}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.noPhone}>Numéro de téléphone non disponible</Text>
                    )}
                    {medecin.mail ? (
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${medecin.mail}`)}>
                            <Text style={styles.email}>📧 {medecin.mail}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.noEmail}>Email non disponible</Text>
                    )}
                    {medecin.speciality ? (
                        <Text style={styles.profession}>👨‍⚕️ Profession: {medecin.speciality}</Text>
                    ) : (
                        <Text style={styles.noProfession}>Profession non disponible</Text>
                    )}
                    <Text style={styles.sector}>
                        🏥 Adresse: {medecin.address || 'Adresse non disponible'},{' '}
                        {medecin.city || 'Ville non disponible'}, {medecin.postalCode || 'Code postal non disponible'}
                    </Text>
                    {medecin.establishment && <Text style={styles.establishment}>🏢 Établissement: {medecin.establishment}</Text>}
                </View>
                <TouchableOpacity style={styles.loveContainer} onPress={toggleLike}>
                    <Love color={liked ? '#4D82F3' : 'white'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 12,
        elevation: 5,
        marginBottom: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    phone: {
        fontSize: 16,
        color: '#4D82F3',
        marginTop: 5,
    },
    email: {
        fontSize: 16,
        color: '#4D82F3',
        marginTop: 5,
    },
    profession: {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
    },
    sector: {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
    },
    establishment: {
        fontSize: 16,
        color: 'black',
        marginTop: 5,
    },
    noPhone: {
        fontSize: 16,
        color: '#aaa',
        marginTop: 5,
    },
    noEmail: {
        fontSize: 16,
        color: '#aaa',
        marginTop: 5,
    },
    noProfession: {
        fontSize: 16,
        color: '#aaa',
        marginTop: 5,
    },
    loveContainer: {
        marginLeft: 'auto',
    },
});

export default Contact;
