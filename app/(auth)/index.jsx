import CustomButton from 'components/CustomButton.jsx';
import Logo from 'components/Logo.jsx';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logo />

        <View style={{ marginTop: 20, marginBottom: 100 }}>
          <Text style={styles.title}>Find Charging Stations</Text>
          <Text style={styles.subtitle}>
            Select nearby station from the map, navigate or book a slot
          </Text>
        </View>

        {/* Row layout for Sign In/Sign Up buttons */}
        <View style={styles.authButtonsRow}>
          <View style={styles.authButtonLeft}>
            <CustomButton
              title="Sign In"
              textStyles={styles.textWhite}
              containerStyles={styles.signInButton}
              handlePress={() => {
                // go to sign in page
                router.push('/SignIn');
              }}
            />
          </View>
          <View style={styles.authButtonRight}>
            <CustomButton
              title="Sign Up"
              textStyles={styles.textPrimary}
              containerStyles={styles.signUpButton}
              handlePress={() => {
                // go to sign up page
                router.push('/SignUp');
              }}
            />
          </View>
        </View>

        <View style={styles.orContainer}>
          <Text style={styles.orText}>OR</Text>
        </View>

        {/* Column layout for OAuth buttons */}
        <View style={styles.oauthContainer}>
          <View style={styles.oauthButton}>
            <CustomButton
              title="Continue with Apple"
              textStyles={styles.textBlack}
              containerStyles={styles.oauthBtnStyle}
              icon="apple"
            />
          </View>
          <View>
            <CustomButton
              title="Continue with Google"
              textStyles={styles.textBlack}
              containerStyles={styles.oauthBtnStyle}
              icon="google"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 28,
    flex: 1,
  },
  scrollContent: {
    height: '100%',
  },
  title: {
    fontSize: 20,
    color: '#65CE46',
  },
  subtitle: {
    fontSize: 20,
    color: '#000',
  },
  authButtonsRow: {
    marginTop: 20,
    flexDirection: 'row',
  },
  authButtonLeft: {
    flex: 1,
    marginRight: 4,
  },
  authButtonRight: {
    flex: 1,
    marginLeft: 4,
  },
  signInButton: {
    backgroundColor: '#65CE46',
    borderRadius: 12,
  },
  signUpButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  orContainer: {
    marginTop: 20,
  },
  orText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  oauthContainer: {
    marginTop: 20,
  },
  oauthButton: {
    marginBottom: 20,
  },
  oauthBtnStyle: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  textWhite: {
    color: '#fff',
  },
  textPrimary: {
    color: '#65CE46',
  },
  textBlack: {
    color: '#000',
  },
});

export default Index;
