import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Choice from './components/Choice';
import { createStackNavigator } from '@react-navigation/stack';
import SearchMed from './components/SearchMed';
import OcrScanner from './components/ScanOrd';

const Stack = createStackNavigator();

const PharmacyMain = ({ navigation }: { navigation: any }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Add a Medication</Text>
        <Pressable
            style={styles.choiceButton}
            onPress={() => navigation.navigate('ScanScreen')}
        >
            <Choice value={1} />
        </Pressable>
        <Pressable
            style={styles.choiceButton}
            onPress={() => navigation.navigate('SearchMedScreen')}
        >
            <Choice value={2} />
        </Pressable>
    </View>
);

// Stack Navigator
const Pharmacy = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PharmacyMain"
                component={PharmacyMain}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ScanScreen"
                component={OcrScanner}
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: '#F3F6FB' },
                }}
            />
            <Stack.Screen
                name="SearchMedScreen"
                component={SearchMed} 
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: '#F3F6FB' },
                }}
            />
        </Stack.Navigator>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '7%',
        backgroundColor: '#F3F6FB',
        alignItems:"center",
        gap:"100%"
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#002467',
        textAlign: 'center',
        marginBottom: 20,
    },
    choiceButton: {
        flex: 1,
        width:"80%",
    },
});

export default Pharmacy;
