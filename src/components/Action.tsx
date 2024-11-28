    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Photo from '../img/ImgPhoto'

    const Action = () => {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Photo/>
                </View>
                <Text style={styles.title}>Ajouter une ordonnance</Text>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection : 'row'
        },
        info: {
            marginRight : 12,
            height : 42,
            width : 42,
            backgroundColor : 'white',
            justifyContent :'center',
            elevation : 1,
            alignItems : 'center',
            borderRadius : 7    

        },
        title:{
            fontWeight : 'regular',
            fontSize : 14,
            color : '#292F35'

        }
        
    });

    export default Action;
