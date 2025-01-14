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
        padding: 20,
        backgroundColor: '#F3F6FB',
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
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F6FB',
        paddingHorizontal: 20,
    },
    screenText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#002467',
        textAlign: 'center',
    },
});

export default Pharmacy;
