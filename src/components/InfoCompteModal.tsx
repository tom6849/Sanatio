import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View} from "react-native";
import DatePicker, {getToday} from "react-native-modern-datepicker";

interface EditInfoModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    fieldName: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InfoCompteModal: React.FC<EditInfoModalProps> = ({visible,onClose,onSave,fieldName,value,setValue,}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Modifier {fieldName}</Text>
                    {fieldName === "Date de naissance" ? (
                        <>
                            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                                <Text style={{ color: value ? "black" : "grey" }}>
                                    {value || "Date de naissance"}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DatePicker
                                    mode="calendar"
                                    minimumDate="1900/01/01"
                                    maximumDate={getToday()}
                                    selected={value}
                                    onDateChange={(date) => {
                                        setValue(date);
                                        setShowDatePicker(false);
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder={`Nouveau ${fieldName}`}
                            value={value}
                            onChangeText={setValue}
                            keyboardType={
                                fieldName === "Taille (cm)" || fieldName === "Poids (kg)" ? "numeric" : "default"
                            }
                        />
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                            <Text style={styles.saveButtonText}>Sauvegarder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
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
    }
});

export default InfoCompteModal;