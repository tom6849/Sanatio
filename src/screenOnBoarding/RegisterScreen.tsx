import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import Svg, { Path } from "react-native-svg"; 
import LinearGradient from 'react-native-linear-gradient';
import { Animated } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../type/User';
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

const RegisterScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null); 
  const animatedValue = useRef(new Animated.Value(1)).current;
  const [username, setUsername] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState<string>('');
  const [showBirthDate, setShowBirthDate] = useState(false);
  const { setUser } = route.params;
  useEffect(() => {
    if (selectedAvatar != null) { 
      Animated.loop(
        Animated.sequence([ 
          Animated.timing(animatedValue, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(animatedValue, { toValue: 1, duration: 500, useNativeDriver: true })
        ])
      ).start();
    }
  }, [selectedAvatar]);

  const handleRegister = async () => {
    if (!username.trim()) {
      Alert.alert("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Veuillez entrer une adresse email valide.");
      return;
    }
    const emailExists = await checkEmailExists(email);
    if (emailExists == true) {
      Alert.alert("Cet email est déjà utilisé.");
      return;
    }
  
    if (password.length < 6) {
      Alert.alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
  
    const heightNum = parseInt(height);
    if (isNaN(heightNum) || heightNum < 50 || heightNum > 300) {
      Alert.alert("Veuillez entrer une taille valide (entre 50 et 300 cm).");
      return;
    }
  
    const weightNum = parseInt(weight);
    if (isNaN(weightNum) || weightNum < 10 || weightNum > 500) {
      Alert.alert("Veuillez entrer un poids valide (entre 10 et 500 kg).");
      return;
    }
  
    if (!selectedAvatar) {
      Alert.alert("Veuillez sélectionner un avatar.");
      return;
    }
  
     addUserBd(); 
  };
  
  const checkEmailExists = async (email: string) => {
    try {
      const user = await AsyncStorage.getItem(`users:${email}`);
      return user !== null; 
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return false;
    }
  };
  
  const addUserBd = async () => {
    const newUser: User = {
      id: new Date().toISOString(),
      email,
      password,
      selectedAvatar,
      username,
      height,
      weight,
      medications: null,
      medecin : [],
      birthDate
    };
    try {
      await AsyncStorage.setItem(`users:${email}`, JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      Alert.alert("Une erreur est survenue.");
    }
  };
  

  const chooseAvatar = (avatarName: string) => {
    setSelectedAvatar(avatarName); 
  };

  const avatars = [
    { name: 'avatar-1', source: require('../img/avatar/avatar-1.jpg') },
    { name: 'avatar-2', source: require('../img/avatar/avatar-2.jpg') },
    { name: 'avatar-3', source: require('../img/avatar/avatar-3.jpg') },
    { name: 'avatar-4', source: require('../img/avatar/avatar-4.jpg') },
    { name: 'avatar-5', source: require('../img/avatar/avatar-5.jpg') },
    { name: 'avatar-6', source: require('../img/avatar/avatar-6.jpg') },
    { name: 'avatar-7', source: require('../img/avatar/avatar-7.jpg') },
    { name: 'avatar-8', source: require('../img/avatar/avatar-8.jpg') },
    { name: 'avatar-9', source: require('../img/avatar/avatar-9.jpg') },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0066CC', '#66CCFF']} style={styles.linearGradient} start={{ x: 0.5, y: 0 }} end={{ x: 1, y: 1 }}>
        <Svg viewBox="0 0 1440 320" style={styles.svg}>
          <Path fill="white" fillOpacity="1" d="M0,192L48,213.3C96,235,192,277,288,256C384,235,480,149,576,112C672,75,768,85,864,106.7C960,128,1056,160,1152,149.3C1248,139,1344,85,1392,58.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </Svg>
        <Text style={styles.retour} onPress={() => navigation.navigate("OnBoarding")}> 
          <Svg width="30" height="30" viewBox="0 0 24 24">
            <Path fill="white" d="M7.16 10.972A7 7 0 0 1 19.5 15.5a1.5 1.5 0 1 0 3 0c0-5.523-4.477-10-10-10a9.97 9.97 0 0 0-7.418 3.295L4.735 6.83a1.5 1.5 0 1 0-2.954.52l1.042 5.91c.069.391.29.74.617.968c.403.282.934.345 1.385.202l5.644-.996a1.5 1.5 0 1 0-.52-2.954l-2.788.491Z"/>
          </Svg> 
        </Text>
        <View style={styles.profil}>
          <Image source={require('../img/logo-simple.png')} style={styles.illustration} resizeMode="contain" />
        </View>
      </LinearGradient>

      <View style={styles.ContainerAccount}>
        <Text style={styles.title}>Créer un compte</Text>
        <View style={styles.avatarContainer}>
          <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
            <View style={styles.containerProfil}>
              {avatars.map((avatar, index) => (
                <TouchableOpacity key={index} onPress={() => chooseAvatar(avatar.name)}>
                  <Animated.View 
                    style={[styles.item, selectedAvatar === avatar.name && styles.selectedItem, selectedAvatar === avatar.name && { transform: [{ scale: animatedValue }] }]}>
                    <Image source={avatar.source} style={styles.avatar} />
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.ContainerInput}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={username} onChangeText={setUsername} autoCapitalize="words" />
            <TouchableOpacity style={styles.input} onPress={() => setShowBirthDate(true)}>
              <Text style={{ color: birthDate ? "black" : "grey" }}>
                {birthDate || "Date de naissance"}
              </Text>
            </TouchableOpacity>

            {showBirthDate && (
                <DatePicker
                    mode="calendar"
                    minimumDate="1900/01/01"
                    maximumDate={getToday()}
                    selected={birthDate}
                    onDateChange={(date) => {
                      setBirthDate(date);
                      setShowBirthDate(false);
                    }}
                />
            )}
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Taille (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Poids (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
          </ScrollView>
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
  avatarContainer : {
    flex : 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'black'
  },
  scrollView: {
    paddingHorizontal: 10, 
  },
  containerProfil: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  item: {
    marginRight: 20,
    height: 80,
    width: 80,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 4
  },
  selectedItem: {
    borderColor: 'blue'
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 30,
    elevation: 10 
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
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
