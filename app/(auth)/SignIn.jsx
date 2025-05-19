import CustomButton from 'components/CustomButton.jsx';
import FormField from 'components/FormField.jsx';
import GoBack from 'components/GoBack.jsx';
import Logo from 'components/Logo.jsx';
import { useGlobalContext } from 'contexts/globalProvider.jsx';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginWithEmail } from 'services/apiAuth.js';

const SignIn = () => {
  const [form, setform] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserDetails } = useGlobalContext();

  async function handleSignIn() {
    if (form.email === '' || form.password === '') {
      Alert.alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const { user, error } = await loginWithEmail(form.email, form.password);
    console.log(user, error);

    if (error) {
      setLoading(false);
      Alert.alert('Invalid Credentials');
    } else {
      setLoading(false);
      // Alert.alert('Login Successful');
      setUserDetails(user.user);
      router.push('/(tabs)/Map');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GoBack whereTo="Index" />
        <Logo />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View>
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
            title="Sign In"
            handlePress={handleSignIn}
            containerStyles={styles.signInButton}
            isLoading={loading}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
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
    marginTop: 10,
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
