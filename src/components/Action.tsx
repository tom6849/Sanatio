import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Photo from '../img/ImgPhoto';
import ImgSearch from '../img/ImgSearch';
import ImgDoctor from '../img/ImgDoctor';

const getIcon = (logo: string): React.ReactNode => {
  switch (logo) {
    case 'photo':
      return <Photo />;
    case 'search':
      return <ImgSearch />;
    case 'doctor':
      return <ImgDoctor />;
    default:
      return null;
  }
};

const Action: React.FC<{ logo: string }> = ({ logo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {getIcon(logo)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    height: 42,
    width: 42,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    elevation: 1,
  },
  title: {
    fontWeight: 'regular',
    fontSize: 14,
    color: '#292F35',
  },
});

export default Action;
