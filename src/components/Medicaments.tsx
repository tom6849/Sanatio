import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import ButtonValidate from '../components/ButtonValidate';
import { Medication } from '../type/Medication';
import { getMedicationImage } from '../services/imageService';
import { handleTakePhoto } from '../utils/photoUtils';

const Medicaments = ({ medication, fromCalendar, calendarDate }: { medication: Medication, fromCalendar?: boolean, calendarDate: string }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            const storedUri = await getMedicationImage(medication.id);
            if (storedUri) {
                setImageUri(storedUri);
            }
        };

        loadImage();
    }, [medication.id]);

    return (
        <View style={[styles.card, fromCalendar && styles.calendarPadding]}>
            <Text style={styles.medicineText} numberOfLines={1} ellipsizeMode="tail">
                {medication.name}
            </Text>
            <View style={styles.content}>
                <Pressable onPress={() => handleTakePhoto(medication.id, setImageUri)}>
                    <Image
                        source={imageUri ? { uri: imageUri } : require('../img/PilePlus.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Pressable>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{medication.time}</Text>
                    <Text style={styles.route} numberOfLines={2} ellipsizeMode="tail">
                        Type(s) : {medication.pharmaForm}
                    </Text>
                    <Text style={styles.route} numberOfLines={2} ellipsizeMode="tail">
                        Administration : {medication.administrationRoutes}
                    </Text>
                </View>
            </View>
            <ButtonValidate medication={medication} date={calendarDate} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 200,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        elevation: 10,
        margin: 0
    },
    calendarPadding: {
        margin: 20,
        width: '80%'
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
