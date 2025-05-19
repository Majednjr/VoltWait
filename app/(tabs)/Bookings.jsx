import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from 'contexts/globalProvider.jsx';
import { getBookingsByUserId } from 'services/apiCheckIn.js';
import BookingDetails from 'components/BookingDetails.jsx';

const Bookings = () => {
  const { user } = useGlobalContext();
  const userId = user.id;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  function isExpired(slotTime) {
    const currentTime = new Date();
    const slotDate = new Date(slotTime);
    return currentTime > slotDate;
  }

  useEffect(() => {
    async function fetchBookings(userId) {
      setLoading(true);
      try {
        const data = await getBookingsByUserId(userId);
        setBookings(data);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings(userId);
  }, [userId, bookings]);

  return selectedBooking ? (
    <BookingDetails
      booking={selectedBooking}
      onSetBookingData={setSelectedBooking}
      station={selectedBooking.stationDetails}
    />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5', padding: 20 }}>
      <View>
        <Text style={{ color: '#2A2A2A', fontSize: 20, fontWeight: 700 }}>
          Manage and view your bookings
        </Text>
      </View>
      <ScrollView>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <View
              key={booking.id}
              style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>{booking.stationDetails.name}</Text>
              <Text style={{ color: '#888', marginTop: 5 }}>{booking.date}</Text>
              {isExpired(booking.slot_time) ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF4D4D',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 30,
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>Expired</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setSelectedBooking(booking)}
                  style={{
                    backgroundColor: '#65CE46',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 30,
                    width: '80%',
                    alignSelf: 'center',
                  }}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>Manage Active Booking</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>
            No bookings found.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;
