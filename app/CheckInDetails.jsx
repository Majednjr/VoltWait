import GoBack from 'components/GoBack.jsx';
import BookingSlotSelector from 'components/SelectAppointment.jsx';
import SelectPower from 'components/SelectPower.jsx';
import { useGlobalContext } from 'contexts/globalProvider.jsx';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addNewBooking, checkIsBanned } from 'services/apiCheckIn.js';

const CheckInDetails = () => {
  const { stationName, stationAddress, stationId, stationImageUri, stationLat, stationLng } =
    useLocalSearchParams();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [maxPower, setMaxPower] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkInData, setCheckInData] = useState(null);
  const { user, userDetails } = useGlobalContext();
  const [isBanned, setIsBanned] = useState(false);
  console.log(userDetails);

  useEffect(() => {
    const checkBannedStatus = async () => {
      const isBanned = await checkIsBanned(userDetails.id);
      console.log('isBanned', isBanned);
      setIsBanned(isBanned);
    };

    checkBannedStatus();
  }, []);

  async function handleCheckIn() {
    if (selectedSlot === null || maxPower === null) {
      alert('Please select a slot and power');
      return;
    }

    console.log('isBanned', userDetails.isBanned);

    if (isBanned) {
      alert('You are banned from booking');
      return;
    }

    setLoading(true);
    const stationData = {
      name: stationName,
      address: stationAddress,
      id: stationId,
      image: stationImageUri,
      lat: stationLat,
      lng: stationLng,
    };

    const { bookingData, bookingError } = await addNewBooking(
      user.id,
      stationData,
      selectedSlot,
      maxPower
    );

    if (bookingError) {
      setLoading(false);
      setError(bookingError);
      alert('Error creating booking');
    }

    if (bookingData) {
      setLoading(false);
      setCheckInData(bookingData);
      console.log(bookingData);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ padding: 20, backgroundColor: '#65CE46' }}>
        <GoBack whereTo="Map" />
      </View>
      <View style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Text style={{ fontSize: 18, color: '#444447', fontWeight: 700 }}>Charging Now</Text>
        <Text
          style={{
            fontSize: 16,
            color: '#444447',
            fontWeight: 500,
          }}>{`${stationName} | ${stationAddress}`}</Text>
        <Text style={{ fontSize: 12, color: '#444447', fontWeight: 300 }}>EV station</Text>
      </View>
      <View>
        <BookingSlotSelector
          stationId={stationId}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
        <SelectPower maxPower={maxPower} setMaxPower={setMaxPower} />
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#65CE46',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            width: '80%',
            alignSelf: 'center',
          }}
          onPress={() => {
            handleCheckIn();
          }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Check In</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Loading...</Text>
        </View>
      )}

      {checkInData && (
        <Modal transparent animationType="slide" visible={!!checkInData}>
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
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                Booking Confirmed!
              </Text>
              <Text style={{ fontSize: 16, color: '#444', marginBottom: 20 }}>
                You have successfully checked in at {stationName}.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#65CE46',
                  padding: 12,
                  borderRadius: 8,
                  width: '100%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setCheckInData(null);
                  router.push('/Map');
                }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default CheckInDetails;
