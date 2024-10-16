import {useState} from 'react';
import {View, Button, Image, StyleSheet, Text, Alert} from 'react-native';
import {CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
    const [pickedImagePath, setPickedImagePath] = useState<string>('');

    const getImage = async (fromImageLibrary : boolean) => {
        const cameraOptions : CameraOptions = {
            mediaType: 'photo'
        }

        const result = fromImageLibrary
            ? await launchImageLibrary(cameraOptions)
            : await launchCamera(cameraOptions);

        if(result.didCancel) console.log('Camera Error:', result.errorMessage);

        if(result.assets) {
            setPickedImagePath(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={() => getImage(true)} title="Choisir une ordonnance"/>
                <Button onPress={() => getImage(false)} title="Scanner l'ordonnance"/>
            </View>
            <View style={styles.imageContainer}>
                {pickedImagePath !== '' && <Image source={{uri: pickedImagePath}} style={styles.image}/>}
            </View>
        </View>
    );
};

export default App;


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
