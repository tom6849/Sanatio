import React, { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import ButtonValidate from './ButtonValidate';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

type AgendaItem = {
    name: string;
    time: string;
    endroit : string;
    id : string;
    date : string;
  };
const Item = (item: AgendaItem) => {
    return (
        <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.organisation}>
        <Image source={require('../../img/PilePlus.png')} style={styles.image} resizeMode="cover" />
        <View  style={styles.valeur}>
          <Text style={styles.itemTime}>{item.time}</Text>
          <Text style={styles.itemTime}>{item.endroit}</Text>
          <ButtonValidate id={item.id} date={item.date}/>
        </View>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        padding: 16,
        backgroundColor: 'white',
        rowGap : 4,  
        borderRadius: 10,
        elevation: 2,
        marginRight :10
      },
      organisation : {
        flexDirection: 'row',
        columnGap : 16
      },
      valeur : {
        flex: 1,
        rowGap : 4
      },
      itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"#292F35"
      },
      itemTime: {
        fontSize: 14,
        color: '#292F35',
      },
      image:{
        height: windowHeight * 0.10,
        width: windowWidth * 0.20,
      }
});

export default Item;
