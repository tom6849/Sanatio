import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';


const OnBoarding = ({ navigation }: { navigation: any }) => {
  const [pagePosition, setPagePosition] = useState(1);

  const next = () => {
    const nextPage = pagePosition + 1;
    if (nextPage <= 3) {
      setPagePosition(nextPage);
    }
  };

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  const signIn = () => {
    navigation.navigate('Connect');
    
  };

  const onScrollHandler = (event: any) => {
    const scrollViewAbscissa = event.nativeEvent.contentOffset.x;
    const pageWidth = Dimensions.get('window').width;
    const newPagePosition = Math.round(scrollViewAbscissa / pageWidth) + 1;
    if (newPagePosition !== pagePosition) {
      setPagePosition(newPagePosition);  
    }
  };

  const circleBackgroundColor = ['transparent', 'transparent', 'transparent'];
  circleBackgroundColor[pagePosition - 1] = '#0073C5';

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
          <ScrollView
            style={styles.onboardingScrollView}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScrollHandler}
            scrollEventThrottle={16}
            contentOffset={{ x: (pagePosition - 1) * Dimensions.get('window').width, y: 0 }} 
          >
            <View style={styles.onboardingView}>
              <View style={styles.color}>
                <Image source={require('../img/logo.png')} style={styles.illustration} resizeMode="contain" />
              </View>
              <Svg viewBox="0 0 1440 320" style={styles.wave}>
                <Path fill="#0073C5" d="M0,160L17.1,144C34.3,128,69,96,103,80C137.1,64,171,64,206,74.7C240,85,274,107,309,138.7C342.9,171,377,213,411,229.3C445.7,245,480,235,514,218.7C548.6,203,583,181,617,192C651.4,203,686,245,720,250.7C754.3,256,789,224,823,208C857.1,192,891,192,926,181.3C960,171,994,149,1029,154.7C1062.9,160,1097,192,1131,186.7C1165.7,181,1200,139,1234,144C1268.6,149,1303,203,1337,224C1371.4,245,1406,235,1423,229.3L1440,224L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z" />
              </Svg>
              <View style={styles.textContainer}>
                <Text style={styles.welcomeTitle}>Bienvenue sur Sanatio !</Text>
                <Text style={styles.welcomeSubtitle}>
                  Gérez vos médicaments facilement et ne manquez jamais une prise.
                </Text>
              </View>
            </View>
            <View style={styles.onboardingView}>
                <View style={styles.color}>
                    <Image source={require('../img/chooseMed.png')} style={styles.illustration} resizeMode="contain" />
                </View>
                <Svg viewBox="0 0 1440 320" style={styles.wave1}>
                    <Path fill="#0073C5" d="M0,160L17.1,144C34.3,128,69,96,103,80C137.1,64,171,64,206,74.7C240,85,274,107,309,138.7C342.9,171,377,213,411,229.3C445.7,245,480,235,514,218.7C548.6,203,583,181,617,192C651.4,203,686,245,720,250.7C754.3,256,789,224,823,208C857.1,192,891,192,926,181.3C960,171,994,149,1029,154.7C1062.9,160,1097,192,1131,186.7C1165.7,181,1200,139,1234,144C1268.6,149,1303,203,1337,224C1371.4,245,1406,235,1423,229.3L1440,224L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z" />
                </Svg>
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeTitle}>Votre santé, simplifiée</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Choisissez parmi plus de 16 000 médicaments et gérez vos traitements en toute simplicité. 
                        Recevez des notifications pour ne jamais oublier une prise et scannez vos ordonnances pour un suivi facile.
                    </Text>
                </View>
            </View>
            <View style={styles.onboardingView}>
                <View style={styles.color}>
                <Image source={require('../img/logo.png')} style={styles.illustration} resizeMode="contain" />
                </View>
                <Svg viewBox="0 0 1440 320" style={styles.wave}>
                <Path fill="#0073C5" d="M0,160L17.1,144C34.3,128,69,96,103,80C137.1,64,171,64,206,74.7C240,85,274,107,309,138.7C342.9,171,377,213,411,229.3C445.7,245,480,235,514,218.7C548.6,203,583,181,617,192C651.4,203,686,245,720,250.7C754.3,256,789,224,823,208C857.1,192,891,192,926,181.3C960,171,994,149,1029,154.7C1062.9,160,1097,192,1131,186.7C1165.7,181,1200,139,1234,144C1268.6,149,1303,203,1337,224C1371.4,245,1406,235,1423,229.3L1440,224L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z" />
                </Svg>
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeTitle}>Prêt à commencer ?</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Créez un compte pour suivre vos médicaments et recevoir des rappels, ou connectez-vous si vous avez déjà un compte.
                    </Text>
                </View>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={next} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Passer</Text>
          </TouchableOpacity>

          <View style={styles.bottomOptions}>
            <View style={styles.positionIndicatorsRow}>
              {circleBackgroundColor.map((color, index) => (
                <View key={index} style={[styles.positionIndicatorCircle, { backgroundColor: color }]} />
              ))}
            </View>

            <TouchableOpacity onPress={signUp} style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>S’INSCRIRE GRATUITEMENT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={signIn} style={styles.signInButton}>
              <Text style={styles.signInButtonText}>SE CONNECTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#6C757D',
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  illustration: {
    width: 350,
    height: 350,
  },
  onboardingScrollView: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  onboardingView: {
    flex: 1,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  color: {
    height: '50%',
    width: '100%',
    backgroundColor: '#0073C5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0073C5',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  bottomOptions: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  signUpButton: {
    width: '80%',
    height: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  signUpButtonText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  signInButton: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#0073C5',
    fontWeight: 'bold',
  },
  positionIndicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    marginVertical: 10,
  },
  positionIndicatorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0073C5',
  },
  wave: {
    width: '100%',
    height: 100,
    transform: [{ rotate: '180deg' }],
    marginTop: -6,
  },
  wave1: {
    width: '100%',
    height: 100,
    transform: [{ rotateX: '180deg' }],
    marginTop: -6,
  },
});
export default OnBoarding