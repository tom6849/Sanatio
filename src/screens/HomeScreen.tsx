import { View, StyleSheet } from 'react-native';
import HeaderHome from '../components/HeaderHome';
import MedicationRecap from '../components/MedicationRecap';
import QuickAction from '../components/QuickAction';
import Notifications from '../notification/notification';


const HomeScreen = ({ navigation }: { navigation: any }) => {

    
    return (
    <View style={styles.container}>
        <HeaderHome ></HeaderHome>
        <View style={styles.info} >
            <MedicationRecap></MedicationRecap>
            <Notifications/>
            <QuickAction navigation={navigation}></QuickAction>
        </View>
    </View>
    );
    
};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        info: {
            flex: 1, 
            marginHorizontal: 32,
            marginVertical: 16
        },
    });




    export default HomeScreen;
