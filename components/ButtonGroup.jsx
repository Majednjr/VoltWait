import { View } from 'react-native';
import React from 'react';

const ButtonGroupAuth = ({ children, direction }) => {
  if (direction === 'row') {
    return <View className="mt-5 flex-row justify-between space-x-2">{children}</View>;
  } else {
    return <View className="mt-5 flex-col space-y-2">{children}</View>;
  }
};

export default ButtonGroupAuth;
