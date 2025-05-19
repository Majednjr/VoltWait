import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const CustomButton = ({
  title,
  handlePress,
  containerStyles = {},
  isLoading,
  textStyles = {},
  icon = '',
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.buttonBase, containerStyles, isLoading && styles.disabled]}
      disabled={isLoading}>
      {icon && <FontAwesome name={icon} size={20} color="#777373" />}

      <Text style={[styles.textBase, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  textBase: {
    fontSize: 20,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
