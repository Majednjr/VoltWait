import CustomButton from 'components/CustomButton.jsx';
import FormField from 'components/FormField.jsx';
import GoBack from 'components/GoBack.jsx';
import Logo from 'components/Logo.jsx';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUpWithEmail } from 'services/apiAuth.js';

const SignIn = () => {
  const [form, setform] = useState({
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    userName: '',
  });
  const [step, setStep] = useState('mobile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignUp() {
    if (form.email === '' || form.password === '' || form.mobile === '' || form.userName === '') {
      Alert.alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const { data, error } = await signUpWithEmail(
      form.email,
      form.password,
      form.userName,
      form.mobile
    );

    if (error) {
      setLoading(false);
      Alert.alert('Error creating account');
    } else {
      setLoading(false);
      // setUserDetails(user.user);
      // router.push('/Home');
      Alert.alert('Account created successfully');
      router.push('/SignIn');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GoBack whereTo="Index" />
        <Logo />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Create An Account</Text>
        </View>

        <View style={styles.imageContainer}>
          {/* Optional image */}
          {/* <Image source={images.signinImage} style={styles.image} /> */}
        </View>

        {step === 'mobile' && (
          <View>
            <FormField
              value={form.userName}
              handleChangeText={(e) => setform({ ...form, userName: e })}
              otherStyles={styles.formField}
              placeholder="User Name"
            />
            <FormField
              value={form.mobile}
              handleChangeText={(e) => setform({ ...form, mobile: e })}
              otherStyles={styles.formField}
              placeholder="Mobile Number"
            />
            <FormField
              value={form.email}
              handleChangeText={(e) => setform({ ...form, email: e })}
              otherStyles={styles.formField}
              placeholder="Email"
            />

            <FormField
              value={form.password}
              handleChangeText={(e) => setform({ ...form, password: e })}
              otherStyles={styles.formField}
              placeholder="Password"
            />

            <CustomButton
              title="Register"
              handlePress={handleSignUp}
              containerStyles={styles.signInButton}
              isLoading={loading}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 28,
  },
  scrollContent: {
    height: '100%',
  },
  welcomeContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  image: {
    width: 173,
    height: 133,
  },
  formField: {
    marginTop: 0,
  },
  signInButton: {
    marginTop: 28,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#65CE46',
    borderRadius: 12,
  },
  errorText: {
    marginTop: 12,
    color: 'red',
  },
});

export default SignIn;
