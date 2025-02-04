import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Profil from './Profil'
import ProgressBar from '../../screenHome/components/ProgessBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../type/User'


const ContainerProfil = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const checkUserUpdate = async () => {
            try {
                const savedUser = await AsyncStorage.getItem('lastUser');
                if (savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    if (JSON.stringify(parsedUser) !== JSON.stringify(user)) { 
                        setUser(parsedUser); 
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur", error);
            }
        };

        const interval = setInterval(checkUserUpdate, 0);

        return () => clearInterval(interval); 
    }, [user]);
    return (
        <View style={styles.container}>
            {user && <Profil user={user} />} 
            <View style={styles.Presentation}>
                <View style={styles.Info}>
                    <Text style={styles.Nom}>
                        {user?.username}
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
