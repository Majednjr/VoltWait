import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#4d4d4d90"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12, // Add space between fields
  },
  title: {
    fontFamily: 'Tajawal', // Replace with your font family
    fontSize: 14,
    color: '#b0b0b0', // Gray color
  },
  inputContainer: {
    height: 64,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    width: '100%',
    color: '#333', // primary text color
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default FormField;
