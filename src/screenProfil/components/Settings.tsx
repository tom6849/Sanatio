import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Button, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { typeRoute } from '../ProfilScreen'; 
import ImgEmail from '../../img/ImgEmail';
import ImgMdp from "../../img/ImgMdp";
import ImgProfil from "../../img/ImgProfil";
import ImgWeight from "../../img/ImgWeight";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../type/User'
import ImgHeight from "../../img/ImgHeight";
import ImgArrowRight from "../../img/ImgArrowRight";
import { Alert as RNAlert} from "react-native";

type SettingsPageProps = {
  route: RouteProp<typeRoute, 'SettingsPage'>;
};

const SettingsPage = ({ route }: SettingsPageProps) => {
  const { handleLogout } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [actualPassword, setActualPassword] = useState<string>('');
  const [newWeight, setNewWeight] = useState<string>('');
  const [newHeight, setNewHeight] = useState<string>('');

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

  const handleSaveChanges = async () => {
    if (user) {
      if (user.password !== actualPassword) {
        RNAlert.alert("Erreur", "L'ancien mot de passe est incorrect.");
        return;
      }
  
      if (newPassword.length < 6) {
        RNAlert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }
  
      if (user.password === newPassword) {
        RNAlert.alert("Erreur", "Le mot de passe doit être différent de l'actuel.");
        return;
      }
  
      const updatedUser = { ...user, password: newPassword };

      await AsyncStorage.setItem('lastUser', JSON.stringify(updatedUser));

      const user_dataBase = await AsyncStorage.getItem("users");
      const users = user_dataBase ? JSON.parse(user_dataBase) : [];
      const updatedUsers = users.map((elem : User) => 
        elem.id === user.id ? { ...elem, password: newPassword} : elem
      );
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      setUser(updatedUser);  
      setActualPassword("")
      setNewPassword("")
      setModalVisible(false);  
    }
  };
  

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Compte</Text>

        <View style={styles.containerCompte}>
          <View style={styles.information}>
            <ImgEmail size={40} color="black" />
            <Text style={styles.infoText}>{user?.email}</Text>
          </View>
          <View style={styles.information}>
            <ImgProfil size={40} color="black" />
            <Text style={styles.infoText}>{user?.username}</Text>
          </View>
          <TouchableOpacity style={styles.information} onPress={() => setModalVisible(true)}>
            <ImgMdp size={40} color="black" />
            <Text style={styles.infoText}>{'*'.repeat(user?.password?.length || 8)}</Text>
            <ImgArrowRight size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.information} >
            <ImgWeight size={40} color="black" />
            <Text style={styles.infoText}>{user?.weight} kg</Text>
            <ImgArrowRight size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.information} >
            <ImgHeight size={40} color="black" />
            <Text style={styles.infoText}>{user?.height} cm</Text>
            <ImgArrowRight size={40} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Modifier le mot de passe </Text>
              <TextInput
                style={styles.input}
                placeholder=" mot de passe"
                secureTextEntry
                value={actualPassword}
                onChangeText={setActualPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Sauvegarder</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#0066CC',
  },
  container: {
    height: '90%',
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  containerCompte: {
    flex: 1,
    backgroundColor: 'white',
    width: '90%',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 10,
  },
  information: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 15,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  logoutButton: {
    marginTop : 20,
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width : '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E74C3C', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsPage;
