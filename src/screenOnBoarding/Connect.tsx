import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Svg, { Path } from "react-native-svg"; 
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../type/User'

const Connect = ({ route, navigation }: { route: any, navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = route.params;

  const handleLogin = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!email.match(emailPattern)) {
      Alert.alert("Email invalide", "Veuillez entrer une adresse email valide.");
      return false;
    }
  
    if (password.length < 6) {
      Alert.alert("Mot de passe invalide", "Le mot de passe doit comporter au moins 6 caractères.");
      return false;
    }
  
    try {
      const storedUser = await AsyncStorage.getItem(`users:${email}`);
      if (!storedUser) {
        Alert.alert("Échec de l'authentification", "Email ou mot de passe incorrect.");
        return false;
      }
      const user: User = JSON.parse(storedUser);
      if (user.password !== password) {
        Alert.alert("Échec de l'authentification", "Email ou mot de passe incorrect.");
        return false;
      }
      setUser(user);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'authentification.");
      return false;
    }
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0066CC', '#66CCFF']} style={styles.linearGradient} start={{ x: 0.5, y: 0 }} end={{ x: 1, y: 1 }}>
        <Svg viewBox="0 0 1440 320" style={styles.svg}>
          <Path fill="white" fillOpacity="1" d="M0,192L48,213.3C96,235,192,277,288,256C384,235,480,149,576,112C672,75,768,85,864,106.7C960,128,1056,160,1152,149.3C1248,139,1344,85,1392,58.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </Svg>
        <Text style={styles.retour} onPress={() => navigation.goBack()}>
          <Svg width="30" height="30" viewBox="0 0 24 24">
            <Path fill="white" d="M7.16 10.972A7 7 0 0 1 19.5 15.5a1.5 1.5 0 1 0 3 0c0-5.523-4.477-10-10-10a9.97 9.97 0 0 0-7.418 3.295L4.735 6.83a1.5 1.5 0 1 0-2.954.52l1.042 5.91c.069.391.29.74.617.968c.403.282.934.345 1.385.202l5.644-.996a1.5 1.5 0 1 0-.52-2.954l-2.788.491Z"/>
          </Svg> 
        </Text>
        <View style={styles.profil}>
          <Image source={require('../img/logo-simple.png')} style={styles.illustration} resizeMode="contain" />
        </View>
      </LinearGradient>
      <View style={styles.ContainerAccount}>
        <Text style={styles.title}>Se connecter</Text>
        <View style={styles.ContainerInput}>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footerDesign}>
          <View style={styles.line} />
          <Text style={styles.footerText}>Vous n'avez pas de compte ? <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>Créer un compte</Text></Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  linearGradient: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
  },
  svg: {
    width: '100%',
    height: 100,
    transform: [{ rotate: '180deg' }],
    marginBottom: -6,
  },
  profil: {
    height: 150,
    width: 150,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: [{ translateX: -75 }],
    borderRadius: 20,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  illustration: {
    width: "70%",
  },
  retour: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  ContainerAccount: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    marginTop: 50,
    padding: 20
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'black'
  },
  ContainerInput: {
    flex : 1,
    width : '100%'
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerDesign: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  footerText: {
    color: 'black',
    fontSize: 16,
  },
  link: {
    color: '#0066CC',
    fontWeight: 'bold',
  },
  
});

export default Connect;
