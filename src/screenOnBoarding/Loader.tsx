import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Text, View } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { Easing } from 'react-native';

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

const Loader = () => {
  const dashOffset = useRef(new Animated.Value(768)).current;
  const blueDashOffset = useRef(new Animated.Value(768)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    Animated.loop(
      Animated.parallel([
        Animated.timing(dashOffset, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(blueDashOffset, {
          toValue: 0,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [dashOffset, blueDashOffset, fadeIn]);

  return (
    <View style={styles.loading}>
      <View style={styles.container}>
      <Svg viewBox="0 0 1440 320"  style={styles.svg}>
          <Path fill="white" d="M0,128L6.2,154.7C12.3,181,25,235,37,218.7C49.2,203,62,117,74,117.3C86.2,117,98,203,111,197.3C123.1,192,135,96,148,58.7C160,21,172,43,185,58.7C196.9,75,209,85,222,101.3C233.8,117,246,139,258,160C270.8,181,283,203,295,197.3C307.7,192,320,160,332,160C344.6,160,357,192,369,176C381.5,160,394,96,406,74.7C418.5,53,431,75,443,80C455.4,85,468,75,480,80C492.3,85,505,107,517,128C529.2,149,542,171,554,186.7C566.2,203,578,213,591,229.3C603.1,245,615,267,628,240C640,213,652,139,665,128C676.9,117,689,171,702,165.3C713.8,160,726,96,738,80C750.8,64,763,96,775,117.3C787.7,139,800,149,812,133.3C824.6,117,837,75,849,85.3C861.5,96,874,160,886,197.3C898.5,235,911,245,923,224C935.4,203,948,149,960,138.7C972.3,128,985,160,997,149.3C1009.2,139,1022,85,1034,96C1046.2,107,1058,181,1071,192C1083.1,203,1095,149,1108,112C1120,75,1132,53,1145,37.3C1156.9,21,1169,11,1182,10.7C1193.8,11,1206,21,1218,32C1230.8,43,1243,53,1255,48C1267.7,43,1280,21,1292,32C1304.6,43,1317,85,1329,133.3C1341.5,181,1354,235,1366,229.3C1378.5,224,1391,160,1403,149.3C1415.4,139,1428,181,1434,202.7L1440,224L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"></Path>
      </Svg>
        <Svg width="128" height="96">
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#0066CC" stopOpacity="1" />
              <Stop offset="100%" stopColor="#66CCFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <Polyline
            points="0.314 47.908, 28 47.908, 43.686 96, 86 0, 100 48, 128 48"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <AnimatedPolyline
            points="0.314 47.908, 28 47.908, 43.686 96, 86 0, 100 48, 128 48"
            fill="none"
            stroke="#66CCFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="384, 768"
            strokeDashoffset={blueDashOffset}
          />
        </Svg>

        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: blueDashOffset.interpolate({
                inputRange: [0, 768],
                outputRange: [0.5, 1],
              }),
            },
          ]}
        />

        <Animated.Text style={[styles.companyName, { opacity: fadeIn }]}>
          Sanatio
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    position: 'relative',
  },
  container: {
    width: '100%',
    height: '90%', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0066CC',
    position: 'relative',
    padding: 0, 
    margin: 0, 
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100, 
    zIndex: 1,
    marginTop : -5
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 102, 204, 0.3)',
    borderRadius: 10,
  },
  companyName: {
    position: 'absolute',
    bottom: 20,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});


export default Loader;
