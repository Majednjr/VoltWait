import { View, Text, StyleSheet, Image } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      {/* add image */}
      <Image source={require('../assets/logo.jpg')} style={{ width: 100, height: 100 }} />
      {/* Placeholder for logo image */}
      <Text style={styles.text}>VoltWait</Text>
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 75, // equivalent to bg-red-400
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#65CE46', // Replace with your actual primary color hex code
  },
});

export default Logo;
