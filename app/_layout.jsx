import GlobalProvider from 'contexts/globalProvider.jsx';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

const Layout = () => {
  return (
    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, statusBarBackgroundColor: '#65CE46' }}
          />
          <Stack.Screen name="StationDetails" options={{ headerShown: false }} />
          <Stack.Screen name="CheckInDetails" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </GlobalProvider>
    </>
  );
};

export default Layout;
