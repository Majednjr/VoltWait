import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const GoBack = ({ whereTo, handleClick }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (handleClick) {
          handleClick();
        } else {
          router.push(
            `/${whereTo}` // Navigate to the specified route
          );
        }
      }}>
      <View>
        {/* Left chevron icon */}
        <Text className="text-gray-500">←</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoBack;
