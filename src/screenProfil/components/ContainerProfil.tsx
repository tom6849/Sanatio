import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Profil from './Profil'
import ProgressBar from '../../screenHome/components/ProgessBar'


const ContainerProfil = () => {
    return (
        <View style={styles.container}>
            <Profil/>
            <View style={styles.Presentation}>
                <View style={styles.Info}>
                    <Text style={styles.Nom}>
                        Mia WALLACE
                    </Text>
                    <Text style={styles.date}>
                        25 / 06 / 2004
                    </Text>
                </View>
                <ProgressBar/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:'50%',
        left: '10%',
        backgroundColor: 'white',
        width: '80%',
        height: 250,
        elevation : 3,
        paddingTop:75,
        borderRadius : 10
        },
    Presentation:{
        flex: 1,
        alignItems : 'center',
        padding : 5,
        justifyContent : 'space-evenly'
        },
    Info:{
        alignItems : 'center',
        },
    Nom:{
        fontSize : 30,
        fontWeight : 'bold',
        color : 'black',
        },
    date:{
            paddingBottom : 5,
            fontSize : 20,
            color: '#B6BDC4'
        }
});

export default ContainerProfil;
