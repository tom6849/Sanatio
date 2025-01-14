import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, Alert, ScrollView,TouchableOpacity} from 'react-native';
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

    const viewFormulair = async () => {
        setShowForm(true)
    }

    return (
        <View style={styles.screen}>
            {showForm ? (
                <FormOcr  />
            ) : (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => getImage(true)} style={styles.containerChoice} >
                        <Image 
                            source={require('../../img/UploadOrdonnance.png')} // Remplacez par le chemin de votre logo
                            style={styles.elements}
                        />
                        <Text style={styles.elements}>Add a Medication</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getImage(false)} style={styles.containerChoice}>
                        <Image 
                            source={require('../../img/ScanLogo.png')} // Remplacez par le chemin de votre logo
                            style={styles.elements}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        display: "flex",
        flex: 1,
        backgroundColor:'white',
    },
    container: {
        flex: 1,  // Occuper tout l'espace restant
        paddingTop: '7%',
        flexDirection: 'column',
        justifyContent: 'center', // Centrer verticalement
        alignItems: 'center',     // Centrer horizontalement
    },
    containerChoice: {
        flex:2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',  // Centrer le contenu des boutons
        gap: 10,                   // Espace entre les éléments
        marginBottom: 20,          // Ajoute un espacement sous chaque option
    },
    elements: {
        flex:1, 
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        resizeMode: 'contain',
    }
});

export default OcrScanner;
