import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const TabIcon = ({ iconName, color, name, focused }) => {
  return (
    <View style={[styles.container, focused && styles.focused]}>
      <FontAwesome name={iconName} size={24} color={color} />
      <Text style={[styles.label, { color }]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
    paddingTop: 10,
  },
  focused: {
    color: '#65CE46',
  },
  label: {
    fontSize: 12,
  },
});

const TabsLayout = () => {
  // Define tabs data
  const tabs = [
    {
      name: 'Map',
      iconName: 'map',
    },
    {
      name: 'Account',
      iconName: 'user',
    },
    {
      name: 'Bookings',
      iconName: 'calendar-check-o',
    },
    {
      name: 'More',
      iconName: 'ellipsis-h ',
    },
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#65CE46',
        tabBarInactiveTintColor: '#444447',
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          height: 95,
        },
      }}>
      {tabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon iconName={tab.iconName} name={tab.title} color={color} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
