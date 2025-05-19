import { FontAwesome } from '@expo/vector-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { View, Text } from 'react-native';

const MapOption = ({ option, icon }) => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, gap: 5 }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          padding: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome name={icon} size={20} color="#777373" />
      </View>
      <Text style={{ textAlign: 'center' }}>{option}</Text>
    </View>
  );
};

const MapOptions = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: '60%',
        alignSelf: 'center',
        position: 'absolute',
        top: 720,
      }}>
      <MapOption option="Search" icon="search" />
      <MapOption option="Nearby" icon="map-pin" />
    </View>
  );
};

export default MapOptions;
