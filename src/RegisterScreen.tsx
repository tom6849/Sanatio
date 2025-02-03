import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const RegisterScreen = ({ onSignUpComplete } : {onSignUpComplete : any}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Simule l'inscription (AJOUTER APPEL API ICI SI NÉCESSAIRE)
    if (email && password) {
      console.log("Inscription réussie avec :", email);
      onSignUpComplete();
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="S'inscrire" onPress={handleRegister} />

      <Text style={styles.note}>
        En vous inscrivant, vous acceptez nos conditions d'utilisation.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
});

export default RegisterScreen;
