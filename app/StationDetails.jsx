import GoBack from 'components/GoBack.jsx';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const StationDetails = () => {
  const {
    stationName,
    stationAddress,
    stationId,
    stationLat,
    stationLng,
    stationImageUri,
    stationRating,
  } = useLocalSearchParams();
  console.log('StationDetails:', {
    stationName,
    stationAddress,
    stationId,
    stationLat,
    stationLng,
    stationImageUri,
    stationRating,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <View style={{ padding: 20, backgroundColor: '#65CE46' }}>
        <GoBack whereTo="Map" />
      </View>
      <View>
        <Image
          source={{
            uri:
              stationImageUri ||
              'https://media.istockphoto.com/id/1462935431/photo/focus-closeup-ev-car-and-charger-with-blur-background-for-progressive-concept.jpg?s=612x612&w=0&k=20&c=A2fpyarNWgEsnbqX_yYXmCglgq810ZlRg0lKESk7tJQ=',
          }}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          margin: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Text style={{ fontSize: 16, marginTop: 10 }}>
          Rating: {`${isNaN(+stationRating) ? 'NA' : stationRating} ⭐`}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{stationName}</Text>
        <Text style={{ fontSize: 18, color: '#777' }}>Ev station</Text>
        <Text style={{ fontSize: 18, color: '#777' }}>{stationAddress}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#65CE46',
          padding: 15,
          borderRadius: 10,
          margin: 20,
          alignItems: 'center',
        }}
        onPress={() => {
          router.push({
            pathname: 'CheckInDetails',
            params: {
              stationName,
              stationAddress,
              stationId,
              stationLat,
              stationLng,
              stationImageUri,
            },
          });
        }}>
        <Text style={{ color: '#FFF', fontSize: '20' }}>Check In</Text>
      </TouchableOpacity>
      <View style={{ padding: 20, backgroundColor: '#fff' }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            width: 50,
            height: 50,
            backgroundColor: '#65CE4647',
            padding: 10,
            borderRadius: 50,
          }}
          onPress={() => {
            // Open Google Maps or any other navigation app
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${stationLat},${stationLng}`
            );
          }}>
          <FontAwesome5 name="directions" size={24} color="#65CE46" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StationDetails;
