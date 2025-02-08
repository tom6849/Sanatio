import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import OcrScanner from './components/ScanOrd';
import SearchMed from './components/SearchMed';
import ImgScan from '../img/ImgScan';
import ImgStock from '../img/ImgStock';
import ImgSearchMed from '../img/ImgSearchMed';
import Stock from './components/Stock';

const PharmacyMain = ({ navigation, route }: { navigation: any, route: any }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const pageWidth = Dimensions.get('window').width;
  const [pagePosition, setPagePosition] = useState(1); 

  useEffect(() => {
    if (route.params?.initialIndex !== undefined) {
      const initialIndex = route.params.initialIndex;
      setPagePosition(initialIndex + 1);
      scrollViewRef.current?.scrollTo({ x: initialIndex * pageWidth, animated: true });
    }
  }, [route.params?.initialIndex]);

  const onScrollHandler = (event: any) => {
    const scrollViewAbscissa = event.nativeEvent.contentOffset.x;
    const newPagePosition = Math.round(scrollViewAbscissa / pageWidth) + 1;
    if (newPagePosition !== pagePosition) {
      setPagePosition(newPagePosition);  
    }
  };

  const onIconPress = (index: number) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: index * pageWidth, animated: true });
      }
  };

  const circleBackgroundColor = ['transparent', 'transparent', 'transparent'];
  circleBackgroundColor[pagePosition - 1] = '#FFFFFF';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.positionIndicatorsRow}>
        <View style={styles.contours}>
          {circleBackgroundColor.map((color, index) => (
            <TouchableOpacity key={index} onPress={() => onIconPress(index)} style={[styles.positionIndicatorCircle, { backgroundColor: color }]}>
              {index === 0 && <ImgSearchMed size={40} color={color === '#FFFFFF' ? '#4D82F3' : '#FFFFFF'} />}
              {index === 1 && <ImgScan size={40} color={color === '#FFFFFF' ? '#4D82F3' : '#FFFFFF'} />}
              {index === 2 && <ImgStock size={40} color={color === '#FFFFFF' ? '#4D82F3' : '#FFFFFF'} />} 
            </TouchableOpacity>
          ))}
        </View>
      </View>
        
      <View style={styles.container1}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.onboardingScrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
        >
          <View style={styles.onboardingView}>
            <SearchMed />
          </View>
            
          <View style={styles.onboardingView}>
            <OcrScanner />
          </View>
            
          <View style={styles.onboardingView}>
            <Stock/>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingScrollView: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  onboardingView: {
    flex: 1,
    width: Dimensions.get('window').width,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  pageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  positionIndicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F3F6FB',
  },
  contours: {
    flex: 1, 
    padding: 5, 
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#7DA4F6',
    borderRadius: 20,
  },
  positionIndicatorCircle: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default PharmacyMain;
