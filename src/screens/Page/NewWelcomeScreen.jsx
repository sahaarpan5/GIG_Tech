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

/* Gig-related, role-neutral imagery */
const GIG_IMAGES = [
  {
    uri: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80&auto=format&fit=crop',
    label: 'Easy Start',
  },
  {
    uri: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80&auto=format&fit=crop',
    label: 'Get Paid',
  },
  {
    uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop',
    label: 'Anywhere',
  },
];

const NewWelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Decorative background circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />
      <View style={styles.bgCircle4} />

      {/* ============ LOGO ============ */}
      <View style={styles.logoHeader}>
        <View style={styles.logoGlowRing}>
          <View style={styles.logoBadge}>
            <Image
              source={require('../../assets/genlogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* ============ GIG IMAGE COLLAGE ============ */}
      <View style={styles.collageWrap}>
        {GIG_IMAGES.map((img, i) => (
          <View
            key={i}
            style={[
              styles.collageCard,
              i === 0 && styles.collageCard1,
              i === 1 && styles.collageCard2,
              i === 2 && styles.collageCard3,
            ]}
          >
            <Image source={{ uri: img.uri }} style={styles.collageImage} />
            <View style={styles.collageLabelWrap}>
              <Text style={styles.collageLabel}>{img.label}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* ============ CONTENT ============ */}
      <View style={styles.content}>
        <View>
          <Text style={styles.headline}>
            Find opportunities.{'\n'}
            <Text style={styles.headlineAccent}>Earn on your terms.</Text>
          </Text>

          <Text style={styles.subtext}>
            Trusted by 50,000+ people across India.
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.replace('NewLoginScreen')}
            activeOpacity={0.85}
          >
            <View style={styles.primaryButtonGlow} />
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <View style={styles.arrowCircle}>
              <Text style={styles.buttonArrow}>→</Text>
            </View>
          </TouchableOpacity>

          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#047282',
    overflow: 'hidden',
  },

  /* Background circles */
  bgCircle1: {
    position: 'absolute', top: -110, right: -90,
    width: 300, height: 300, borderRadius: 150,
    backgroundColor: 'rgba(254,169,47,0.22)',
  },
  bgCircle2: {
    position: 'absolute', top: 180, left: -120,
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: 'rgba(123,92,255,0.18)',
  },
  bgCircle3: {
    position: 'absolute', bottom: 120, right: -100,
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(123,224,168,0.16)',
  },
  bgCircle4: {
    position: 'absolute', top: -40, left: -50,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  /* Logo */
  logoHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 62 : 44,
    paddingBottom: 10,
  },
  logoGlowRing: {
    width: 118, height: 118, borderRadius: 59,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  logoBadge: {
    width: 92, height: 92, borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#FEA92F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45, shadowRadius: 20, elevation: 12,
  },
  logoImage: { width: 70, height: 70 },

  /* Collage */
  collageWrap: {
    height: 280,
    marginTop: 8,
    position: 'relative',
  },
  collageCard: {
    position: 'absolute',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, shadowRadius: 16, elevation: 10,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  collageCard1: {
    width: 150, height: 180,
    left: 24, top: 20,
    transform: [{ rotate: '-6deg' }],
  },
  collageCard2: {
    width: 150, height: 180,
    right: 24, top: 40,
    transform: [{ rotate: '5deg' }],
  },
  collageCard3: {
    width: 140, height: 160,
    left: '50%', marginLeft: -70, top: 100,
    transform: [{ rotate: '-2deg' }],
  },
  collageImage: { width: '100%', height: '100%' },
  collageLabelWrap: {
    position: 'absolute', bottom: 10, left: 10,
    backgroundColor: 'rgba(4,114,130,0.9)',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 10,
  },
  collageLabel: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 11, fontWeight: '700',
    color: '#FFFFFF', letterSpacing: 0.3,
  },

  /* Content */
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    justifyContent: 'space-between',
  },
  headline: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 30, fontWeight: '700',
    lineHeight: 38, letterSpacing: -0.6,
    color: '#FFFFFF', textAlign: 'center',
  },
  headlineAccent: { color: '#FEA92F' },
  subtext: {
    fontFamily: 'InstrumentSans-Regular',
    fontSize: 15, lineHeight: 22,
    color: 'rgba(255,255,255,0.82)',
    marginTop: 12, textAlign: 'center',
  },

  /* CTA */
  primaryButton: {
    flexDirection: 'row',
    borderRadius: 18, height: 62,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FEA92F',
    shadowColor: '#FEA92F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55, shadowRadius: 20, elevation: 12,
    overflow: 'hidden', position: 'relative',
  },
  primaryButtonGlow: {
    position: 'absolute', top: -30, left: 20,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  primaryButtonText: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 18, fontWeight: '700',
    color: '#FFFFFF', letterSpacing: 0.3,
  },
  arrowCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
    marginLeft: 12,
  },
  buttonArrow: {
    fontSize: 18, color: '#FFFFFF',
    fontWeight: '700', marginTop: -2,
  },

  /* Trust pills */
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 18,
  },
  trustPill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4, marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  trustIcon: { fontSize: 11, marginRight: 5 },
  trustText: {
    fontFamily: 'InstrumentSans-Bold',
    fontSize: 11, fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default NewWelcomeScreen;