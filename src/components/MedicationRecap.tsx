import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Medicaments from '../components/Medicaments'
import { useMedication } from '../context/MedicationContext';

const MedicationRecap = () => {
    const { medToday } = useMedication();
    const todayIso = new Date().toISOString().split('T')[0];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aujourd'hui</Text>
            {medToday.length > 0 ? (
                <ScrollView
                    style={styles.info}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {medToday.map((medicationToday) => (
                        <View style={styles.medicament} key={medicationToday.id}>
                            <Medicaments medication={medicationToday} calendarDate={todayIso} />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.centeredContainer}>
                    <Text style={styles.infoMed}>
                        Pas de médicament à prendre aujourd'hui
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '40%',
    },
    title: {
        color: "#0073C5", 
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 10,
    },
    scrollContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    medicament: {
        marginRight: 16,
    },
    infoMed: {
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center',
        color: '#34495e', 
        marginTop: 20,
        marginHorizontal: 30,
        lineHeight: 36,
        paddingVertical: 25,
        backgroundColor: '#ecf0f1', 
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#0073C5', 
        
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MedicationRecap;
