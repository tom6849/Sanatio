import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import MlkitOcr from 'react-native-mlkit-ocr';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import data from './data/data.json';
import FormOcr from './FormOcr';

const OcrScanner = () => {
    const [pickedImagePath, setPickedImagePath] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [showForm, setShowForm] = useState(false);
    const metiers = data.metiers
    const medicaments = data.medicaments

    const getResultFormat = async () => {
        try {
            const resultFromUri = await getTextFromOCR(); // On attend le résultat de l'OCR
            const infoMedecin = {
                nomPrenom : "Nom et Prénom du Medecin : ",
                numeroRPPS: "N°RPPS : ",
                numeroAM: "N°AM : ",
                medicament: "Liste des médicaments : "
            }

            let nomMedecin = false
            const text = resultFromUri.reduce((acc: string, value: any, index:number) => {
                const line = value.text.trim().toLowerCase();
                
                const metierTrouve = metiers.find(metier => line.includes(metier.toLowerCase()));

                if (metierTrouve && nomMedecin == false) {
                    const words = line.replace(metierTrouve, "").trim().split(/\s+/);
                    infoMedecin.nomPrenom += words.slice(0, 2).join(" ");
                    nomMedecin = true
                }
                if (line.includes("n° rpps") && infoMedecin.numeroRPPS == "N°RPPS : " ){
                    const val = resultFromUri[index + 1]?.text?.trim().match(/\d{11}/);
                    console.log(val)
                    infoMedecin.numeroRPPS += resultFromUri[index + 1]?.text?.trim().match(/\d{11}/);
                }
                if (line.includes("n° am:") && infoMedecin.numeroAM == "N°AM : " ){
                    const val = resultFromUri[index + 1]?.text?.trim().match(/\d{9}/);
                    console.log(val)
                    infoMedecin.numeroAM += resultFromUri[index + 1]?.text?.trim().match(/\d{9}/);
                }

                const medicamentTrouve = medicaments.find(medicament => line.includes(medicament.toLowerCase()));

                if (medicamentTrouve) {
                    infoMedecin.medicament +=  "ff"+ line
                }
                
                return acc + value.text + '\n';
            }, '');
            if(infoMedecin.medicament == "Liste des médicaments : "){
                infoMedecin.medicament = "rien"
            }
            setResult(text); // Retourne le texte formaté
        } catch (error) {
            console.log('Error formatting OCR result:', error);
            return ''; // Retourne une chaîne vide en cas d'erreur
        }
    };
    

    const getImage = async (fromImageLibrary: boolean) => {
        const cameraOptions: CameraOptions = {
            mediaType: 'photo'
        };

        const result = fromImageLibrary
            ? await launchImageLibrary(cameraOptions)
            : await launchCamera(cameraOptions);

        if (result.didCancel) console.log('Camera Error:', result.errorMessage);

        if (result.assets) {
            if(result.assets[0].uri){
                setPickedImagePath(result.assets[0].uri);
            } 
        }
    };

    const getTextFromOCR = async () => {
        setShowForm(true)
        if (pickedImagePath !== '') {
            try {
                const resultFromUri: any = await MlkitOcr.detectFromUri(pickedImagePath);
                
                return resultFromUri;
            } catch (error) {
                console.log('OCR failed', error);
            }
        } else {
            Alert.alert('Please select an image first');
        }
    };

    return (
        <View style={styles.screen}>
            {showForm ? (
                <FormOcr />
            ) : (
                <View style={styles.screen}>
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => getImage(true)} title="Choisir une ordonnance" />
                        <Button onPress={() => getImage(false)} title="Scanner l'ordonnance" />
                    </View>
                    <View style={styles.imageContainer}>
                        {pickedImagePath !== '' && <Image source={{ uri: pickedImagePath }} style={styles.image} />}
                    </View>
                    <Button onPress={getResultFormat} title='OCR' />
                    <ScrollView>
                        {result !== '' && <Text>Résultat OCR : {'\n'}{result}</Text>}
                    </ScrollView>
                </View>
            )}
            
            
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 32,
        height: '100%',
        width: '100%'
    },
    buttonContainer: {
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 8
    },
    imageContainer: {
        padding: 30,
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'cover',
    },
});

export default OcrScanner;
