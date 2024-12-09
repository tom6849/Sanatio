    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import Photo from '../../img/ImgPhoto'
    import ImgSearch from '../../img/ImgSearch'
    import ImgEffetSecondaire from '../../img/ImgEffetSecondaire'


      const getIcon = (logo: string): React.ReactNode => {
        switch (logo) {
          case 'photo':
            return <Photo/>;
          case 'search':
            return <ImgSearch/>;
          case 'effet':
            return <ImgEffetSecondaire/>;
        }
      };

      

    const Action: React.FC<{logo: string, desc: string}> = ({ logo , desc}) => {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    {getIcon(logo)}
                </View>
                <Text style={styles.title}>{desc}</Text>
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
