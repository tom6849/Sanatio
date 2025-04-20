import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FormOcr = () => {
    // State pour gérer les valeurs des champs du formulaire
    const [nomMedicament, setNomMedicament] = useState('');
    const [consigneUtilisation, setConsigneUtilisation] = useState('');
    const [joursEntrePrise] = useState('');
    const [nombrePrise] = useState('');
    const [dateOrdonnance, setDateOrdonnance] = useState('');
    const [dureeValidite, setDureeValidite] = useState('');
    const [nomMedecin, setNomMedecin] = useState('');
    const [metierMedecin] = useState('');
    const [numeroRPPS, setNumeroRPPS] = useState('');
    const [numeroAM, setNumeroAM] = useState('');
    const [accepteTermes] = useState(false);

    // Fonction de soumission du formulaire
    const handleSubmit = () => {
        if (!nomMedicament || !consigneUtilisation || !joursEntrePrise || !nombrePrise || !dateOrdonnance || !dureeValidite || !nomMedecin || !metierMedecin || !numeroRPPS || !numeroAM) {
            Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
            return;
        }

        // Vérification du format du numéro RPPS (11 chiffres)
        const rppsPattern = /^\d{11}$/;
        if (!rppsPattern.test(numeroRPPS)) {
            Alert.alert('Erreur', 'Le numéro RPPS doit être composé de 11 chiffres.');
            return;
        }

        // Vérification du format du numéro AM (9 chiffres)
        const amPattern = /^\d{9}$/;
        if (!amPattern.test(numeroAM)) {
            Alert.alert('Erreur', 'Le numéro AM doit être composé de 9 chiffres.');
            return;
        }

        // Vérification du format de la date (jj/mm/aaaa)
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!datePattern.test(dateOrdonnance)) {
            Alert.alert('Erreur', 'La date doit être au format jj/mm/aaaa.');
            return;
        }

        if (!accepteTermes) {
            Alert.alert('Erreur', 'Vous devez accepter les termes et conditions.');
            return;
        }

        // Formulaire soumis avec succès
        Alert.alert('Succès', 'Le formulaire a été soumis avec succès !');
    };
    const [selectedNumberDay, setSelectedNumberDay] = useState("1");
    const [selectedNumberMed, setSelectedNumberMed] = useState("1");
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>                
                <Text style={styles.label}>Nom du médicament :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez le nom du médicament"
                    placeholderTextColor="red"
                    value={nomMedicament}
                    onChangeText={setNomMedicament}
                />

                <Text style={styles.label}>Consigne d'utilisation :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez la consigne d'utilisation"
                    placeholderTextColor="red"
                    value={consigneUtilisation}
                    onChangeText={setConsigneUtilisation}
                />

                <Text style={styles.label}>Tous les combien de jours :</Text>
                <Picker
                    selectedValue={selectedNumberDay}
                    onValueChange={(itemValue) => setSelectedNumberDay(itemValue)}
                    style={styles.picker}
                    >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                </Picker>

                <Text style={styles.label}>Nombre de médicaments à prendre :</Text>
                <Picker
                    selectedValue={selectedNumberMed}
                    onValueChange={(itemValue) => setSelectedNumberMed(itemValue)}
                    style={styles.picker}
                    >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                </Picker>

                <Text style={styles.label}>Date de l'ordonnance :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez la date de l'ordonnance (jj/mm/aaaa)"
                    placeholderTextColor="red"
                    value={dateOrdonnance}
                    onChangeText={setDateOrdonnance}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Durée de validité :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez la durée de validité"
                    placeholderTextColor="red"
                    value={dureeValidite}
                    onChangeText={setDureeValidite}
                />

                <Text style={styles.label}>Nom et métier du médecin :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez le nom et métier du médecin"
                    placeholderTextColor="red"
                    value={nomMedecin}
                    onChangeText={setNomMedecin}
                />

                <Text style={styles.label}>Numéro RPPS :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez le numéro RPPS (11 chiffres)"
                    placeholderTextColor="red"
                    value={numeroRPPS}
                    onChangeText={setNumeroRPPS}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Numéro AM :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entrez le numéro AM (9 chiffres)"
                    placeholderTextColor="red"
                    value={numeroAM}
                    onChangeText={setNumeroAM}
                    keyboardType="numeric"
                />

                <Button title="Soumettre" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    formContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color : 'blue'
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 14,
    },
    picker:{
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        justifyContent: 'center',
        color:'red'
    },
});

export default FormOcr;
