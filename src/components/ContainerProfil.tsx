import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Profil from './Profil'
import ProgressBar from './ProgessBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../type/User'
import { getStoredUser } from '../services/userService';


const ContainerProfil = () => {
    const [user, setUser] = useState<User | null>(null);
    const userRef = useRef<User | null>(null);

    useEffect(() => {
        const checkUserUpdate = async () => {
            const storedUser = await getStoredUser();
            if (storedUser && JSON.stringify(storedUser) !== JSON.stringify(userRef.current)) {
                setUser(storedUser);
                userRef.current = storedUser;
            }
        };

        checkUserUpdate(); 
    }, []);
    
    return (
        <View style={styles.container}>
            {user && <Profil user={user} />} 
            <View style={styles.Presentation}>
                <View style={styles.Info}>
                    <Text style={styles.Nom}>
                        {user?.username}
                    </Text>
                    <Text style={styles.date}>
                        {user?.birthDate}
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
