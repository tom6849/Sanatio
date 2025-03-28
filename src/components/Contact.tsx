import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Love from '../img/ImgLove';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contact = () => {
    const [liked, setLiked] = useState(false);

    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.name}>Dr. Jean Dupont</Text>
                    <Text style={styles.email}>jean.dupont@email.com</Text>
                    <Text style={styles.phone}>+33 6 12 34 56 78</Text>
                </View>
                <TouchableOpacity
                    style={styles.loveContainer}
                    onPress={() => setLiked(!liked)}
                >
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
        borderRadius: 10,
        elevation: 3,
        marginBottom: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    phone: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    loveContainer: {
        marginLeft: 'auto',
    }
});

export default Contact;
