import React, { useState, useEffect } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert} from 'react-native';
import { User } from '../type/User.ts';
import ChangePasswordModal from '../components/ChangePasswordModal.tsx';
import InfoCompteModal from '../components/InfoCompteModal.tsx';
import SettingsItem from '../components/SettingsItem.tsx';
import {getStoredUser, updateUserPassword, resetAccount, updateUserInfo} from '../services/userService.ts';
import { showAlert } from '../utils/AlertUtils.ts';
import ImgRetour from "../img/ImgRetour.tsx";

const SettingsPage = ({ navigation, handleLogout }: { navigation: any, handleLogout: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoCompteModalVisible, setInfoCompteModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [actualPassword, setActualPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, [user]);


  const fetchUser = async () => {
    const userData = await getStoredUser();
    if (userData) {
      setUser(userData);
    }
  };


  const handleResetAccount = async () => { 
    if (user) {
      const result = await resetAccount(user.email); 
      showAlert(result.success ? "Succès" : "Erreur", result.message);
      if (result.success) {
        handleLogout();
      }
    }
  };
  

  const handleSaveChanges = async () => {
    if (user) {
      const result = await updateUserPassword(user.id, actualPassword, newPassword , user.email);
      showAlert(result.success ? "Succès" : "Erreur", result.message);

      if (result.success) {
        setActualPassword('');
        setNewPassword('');
        setModalVisible(false);
      }
    }
  };

  const handleSaveInfo = async () => {
    if (!user) {
      return;
    }
    if (selectedField == "Nom d'utilisateur" && inputValue.trim()) {
      Alert.alert("Le nom d'utilisateur ne peut pas être vide.");
      return;
    }


    if (selectedField== "Taille (cm)") {
      const heightNum = parseInt(inputValue);

      if (!(/^[0-9]+$/.test(inputValue.trim())) || heightNum < 50 || heightNum > 300) {
        Alert.alert("Veuillez entrer une taille valide (entre 50 et 300 cm).");
        return;
      }
    }

    if (selectedField== "Poids (kg)") {
      const weightNum = parseInt(inputValue);

      if (!(/^[0-9]+$/.test(inputValue.trim())) || weightNum < 10 || weightNum > 500) {
        Alert.alert("Veuillez entrer un poids valide (entre 10 et 500 kg).");
        return;
      }
    }

    const fieldMap: { [key: string]: keyof User } = {
      "Nom d'utilisateur": "username",
      "Date de naissance": "birthDate",
      "Poids (kg)": "weight",
      "Taille (cm)": "height",
    };

    const result = await updateUserInfo(user.id, fieldMap[selectedField], inputValue , user.email);
    showAlert(result.success ? "Succès" : "Erreur", result.message);

    if (result.success) {
      setSelectedField('');
      setInputValue('');
      setInfoCompteModalVisible(false);
      fetchUser()
    }
  };

  const handleOpenInfoModal = (field: string, value: string) => {
    setSelectedField(field);
    setInputValue(value);
    setInfoCompteModalVisible(true);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.retour} onPress={() => navigation.goBack()}> <ImgRetour/></Text>
      <View style={styles.container}>
        <Text style={styles.header}>Compte</Text>
        <SettingsItem label="Email" value={user?.email} arrow={false} />
        <SettingsItem label="Nom d'utilisateur" value={user?.username} onPress={() => handleOpenInfoModal("Nom d'utilisateur", user?.username || "")} arrow={true}/>
        <SettingsItem label="Mot de passe" value="********" onPress={() => setModalVisible(true)} arrow={true}/>
        <SettingsItem label="Date de naissance" value={`${user?.birthDate}`} onPress={() => handleOpenInfoModal("Date de naissance", user?.birthDate || "")} arrow={true}/>
        <SettingsItem label="Poids (kg)" value={`${user?.weight} kg`} onPress={() => handleOpenInfoModal("Poids (kg)", user?.weight?.toString() || "")} arrow={true}/>
        <SettingsItem label="Taille (cm)" value={`${user?.height} cm`} onPress={() => handleOpenInfoModal("Taille (cm)", user?.height?.toString() || "")} arrow={true}/>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleResetAccount}>
          <Text style={styles.resetText}>Réinitialiser mon compte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={() => setInfoModalVisible(true)}>
          <Text style={styles.infoText}>En savoir plus sur le stockage des données</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={infoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>Stockage des données locales</Text>
              <Text style={styles.modalText}>
                Afin d'assurer la confidentialité et la sécurité de vos données personnelles, toutes les informations liées à votre compte, ainsi que vos médicaments, sont stockées localement sur votre appareil. Cela signifie que vos informations ne sont pas envoyées ou stockées sur des serveurs externes.
              </Text>
              <Text style={styles.modalText}>
                Ces données incluent votre nom, email, poids, taille, ainsi que les informations relatives aux médicaments que vous avez ajoutés à votre suivi. Les médicaments stockés localement comprennent leurs noms, doses, horaires et autres détails pertinents pour le suivi de votre traitement.
              </Text>
              <Text style={styles.modalText}>
                Elles sont utilisées uniquement pour améliorer l'expérience utilisateur et garantir une utilisation fluide de l'application, sans compromettre votre vie privée.
              </Text>
              <Text style={styles.modalText}>
                Vous pouvez à tout moment supprimer ces données en réinitialisant votre compte, ce qui effacera toutes les informations locales stockées sur votre appareil, y compris vos médicaments.
              </Text>
            </ScrollView>

            <TouchableOpacity style={styles.closeButton} onPress={() => setInfoModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ChangePasswordModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveChanges}
        actualPassword={actualPassword}
        setActualPassword={setActualPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
      />

      <InfoCompteModal
          visible={infoCompteModalVisible}
          onClose={() => setInfoCompteModalVisible(false)}
          onSave={handleSaveInfo}
          fieldName={selectedField}
          value={inputValue}
          setValue={setInputValue}
      />
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
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // Rouge
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',  // Taille 80%
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  retour: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  // Style pour le bouton de réinitialisation de compte
  resetButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',  
  },
  resetText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Style pour le bouton info
  infoButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SettingsPage;
