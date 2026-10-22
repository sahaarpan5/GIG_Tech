import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewWelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Logo only — no text */}
      <View style={styles.logoHeader}>
        <View style={styles.logoBadge}>
          <Image
            source={require('../../assets/genlogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Smaller hero image */}
      <View style={styles.heroWrap}>
        <Image
          source={require('../../assets/gigworker.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.headline}>
          Find gigs near you.{'\n'}Earn on your schedule.
        </Text>

        <Text style={styles.subtext}>
          Trusted by 50,000+ workers across India.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('NewLoginScreen')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Get Started Now</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F9FA',
  },

  /* Logo header — logo only, centered */
  logoHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 62 : 44,
    paddingBottom: 18,
   
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#EAF5F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D4E9EC',
    shadowColor: '#047282',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  logoImage: {
    width: 80,
    height: 80,
  },

  /* Smaller hero — fixed height instead of flex */
  heroWrap: {
    height: 400,
    marginHorizontal: 28,
    marginTop: 8,
    backgroundColor: '#F2F9FA',
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '90%',
    height: '100%',
  },

  /* Content */
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    justifyContent: 'space-between',
  },
  headline: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 38,
    letterSpacing: -0.5,
    color: '#0A2E33',
  },
  subtext: {
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7A7C',
    marginTop: 12,
  },

  /* CTA */
  primaryButton: {
    flexDirection: 'row',
    borderRadius: 14,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEA92F',
    shadowColor: '#FEA92F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  buttonArrow: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },

  /* Footer */
  footerText: {
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 12,
    color: '#8A9698',
    textAlign: 'center',
    marginTop: 18,
  },
});

export default NewWelcomeScreen;