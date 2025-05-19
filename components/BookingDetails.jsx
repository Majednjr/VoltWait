import GoBack from 'components/GoBack.jsx';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, TouchableOpacity, Modal, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { checkOutBooking } from 'services/apiCheckIn.js';
import { useGlobalContext } from 'contexts/globalProvider.jsx';

const BookingDetails = ({ station, booking, onSetBookingData }) => {
  const { name, address, id, lat, lng, image } = station;
  const [almostExpired, setAlmostExpired] = useState(false);
  const { user } = useGlobalContext();

  function checkAlmostExpired(slotTime) {
    const currentTime = new Date();
    const slotDate = new Date(slotTime);
    const timeDifference = slotDate - currentTime;
    console.log(timeDifference);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    if (minutesDifference <= 30) {
      setAlmostExpired(true);
      return true;
    }

    return false;
  }

  async function handleCheckOut() {
    const almostExpired = checkAlmostExpired(booking.slot_time);

    // Proceed with checkout
    const data = await checkOutBooking(booking.id, user.id, almostExpired);

    onSetBookingData(null);
    router.push('/(tabs)/Map');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <View style={{ padding: 20, backgroundColor: '#65CE46' }}>
        <GoBack handleClick={() => onSetBookingData(null)} />
      </View>
      <View>
        <Image
          source={{
            uri:
              image ||
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
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ fontSize: 18, color: '#777' }}>Ev station</Text>
        <Text style={{ fontSize: 18, color: '#777' }}>{address}</Text>
        <Text style={{ fontSize: 18, color: '#777' }}>Plug: {booking.plug_type}</Text>
        <Text style={{ fontSize: 18, color: '#777' }}>
          Booked Slot: {booking.slot_time.split('T')[1]}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FF4D4D',
          padding: 15,
          borderRadius: 10,
          margin: 20,
          alignItems: 'center',
        }}
        onPress={() => {
          const isAlmostExpired = checkAlmostExpired(booking.slot_time);
          if (isAlmostExpired) {
            setAlmostExpired(true);
          } else {
            handleCheckOut();
            alert('Checked out successfully');
          }
        }}>
        <Text style={{ color: '#FFF', fontSize: '20' }}>Check Out</Text>
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
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${id}`
            );
          }}>
          <FontAwesome5 name="directions" size={24} color="#65CE46" />
        </TouchableOpacity>
      </View>

      <Modal transparent animationType="slide" visible={almostExpired}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 30,
              borderRadius: 10,
              width: '80%',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 30, fontWeight: 700, marginBottom: 10, color: 'red' }}>
              Alert!
            </Text>
            <Text style={{ fontSize: 20, color: '#444', marginBottom: 20, textAlign: 'center' }}>
              Are you sure you want to check out?
            </Text>
            <Text style={{ fontSize: 16, color: '#444', marginBottom: 20, textAlign: 'center' }}>
              Checking out less than 30 minutes before your slot time will result in a 72 hour ban
              from booking.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 12,
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
                marginBottom: 10,
              }}
              onPress={() => {
                handleCheckOut();
              }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Check Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#a2a2a2',
                padding: 12,
                borderRadius: 8,
                width: '100%',
                alignItems: 'center',
              }}
              onPress={() => {
                setAlmostExpired(false);
              }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BookingDetails;
