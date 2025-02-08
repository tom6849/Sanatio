import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import ButtonValidate from '../../screenCalendar/components/ButtonValidate';
import { Medication } from '../../type/Medication';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Medicaments = ({ medication, fromCalendar, calendarDate }: { medication: Medication, fromCalendar?: boolean, calendarDate: string }) => {
    const [imageUri, setImageUri] = useState<string | null>(null); 

    useEffect(() => {
        const loadImage = async () => {
            try {
                const storedUri = await AsyncStorage.getItem(`imageUri_${medication.id}`);
                if (storedUri) {
                    setImageUri(storedUri); 
                }
            } catch (error) {
                console.error('Erreur lors du chargement de l\'image depuis AsyncStorage', error);
            }
        };

        loadImage(); 
    }, [medication.id]);

    const handleTakePhoto = () => {
        launchCamera({ mediaType: 'photo', quality: 1 }, async (response) => {
            if (response.didCancel) {
                console.log('Utilisateur a annulé');
            } else if (response.errorCode) {
                console.error('Erreur: ', response.errorMessage);
            } else {
                if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0].uri;
                    if (uri) {
                        setImageUri(uri); 
                        try {
                            await AsyncStorage.setItem(`imageUri_${medication.id}`, uri); 
                        } catch (error) {
                            console.error('Erreur lors de l\'enregistrement de l\'image dans AsyncStorage', error);
                        }
                    } else {
                        console.error('L\'URI de l\'image est undefined');
                        setImageUri(null);
                    }
                }
            }
        });
    };

    return (
        <View style={[styles.card, fromCalendar && styles.calendarPadding]}>
            <Text style={styles.medicineText} numberOfLines={1} ellipsizeMode="tail">
                {medication.name}
            </Text>
            <View style={styles.content}>
                <Pressable onPress={handleTakePhoto}>
                    <Image
                        source={imageUri ? { uri: imageUri } : require('../../img/PilePlus.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Pressable>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{medication.time}</Text>
                    <Text style={styles.route} numberOfLines={2} ellipsizeMode="tail">
                        {medication.administrationRoutes}
                    </Text>
                    <Text style={styles.route} numberOfLines={2} ellipsizeMode="tail">
                        {medication.pharmaForm}
                    </Text>
                </View>
            </View>
            <ButtonValidate medication={medication} date={calendarDate} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 250,
        height: 200,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        elevation: 10,
        margin : 0
    },
    calendarPadding: {
        margin : 20,
        width : '80%'
    },
    medicineText: {
        fontSize: 18,
        color: '#292F35',
        fontWeight: 'bold',
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        maxHeight: '100%',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    timeContainer: {
        marginLeft: 10,
        width: '60%',
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
