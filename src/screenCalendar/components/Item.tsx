import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, Pressable } from 'react-native';
import ButtonValidate from './ButtonValidate';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

type AgendaItem = {
    name: string;
    time: string;
    endroit: string;
    id: string;
    date: string;
};

const Item = ({ item }: { item: AgendaItem }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const storedUri = await AsyncStorage.getItem(`imageUri_${item.id}`);
                if (storedUri) {
                    setImageUri(storedUri); 
                }
            } catch (error) {
                console.error('Erreur lors du chargement de l\'image depuis AsyncStorage', error);
            }
        };

        loadImage();
    }, [item.id]);

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
                            await AsyncStorage.setItem(`imageUri_${item.id}`, uri); 
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
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.organisation}>
                <Pressable onPress={handleTakePhoto}>
                    <Image
                        source={imageUri ? { uri: imageUri } : require('../../img/PilePlus.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Pressable>
                <View style={styles.valeur}>
                    <Text style={styles.itemTime}>{item.time}</Text>
                    <Text style={styles.itemTime}>{item.endroit}</Text>
                    <ButtonValidate id={item.id} date={item.date} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        padding: 16,
        backgroundColor: 'white',
        rowGap: 4,
        borderRadius: 10,
        elevation: 2,
        marginRight: 10,
    },
    organisation: {
        flexDirection: 'row',
        columnGap: 16,
    },
    valeur: {
        flex: 1,
        rowGap: 4,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#292F35",
    },
    itemTime: {
        fontSize: 14,
        color: '#292F35',
    },
    image: {
        height: windowHeight * 0.10,
        width: windowWidth * 0.20,
    },
});

export default Item;
