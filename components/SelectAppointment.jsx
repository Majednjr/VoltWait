// BookingSlotSelector.tsx
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from 'services/supabase.js';

const generateTimeSlots = () => {
  const slots = [];
  let start = dayjs().startOf('day');
  const end = dayjs().endOf('day');

  while (start.isBefore(end)) {
    slots.push(start.format('HH:mm'));
    start = start.add(20, 'minute');
  }

  return slots;
};

const BookingSlotSelector = ({ stationId, selectedSlot, setSelectedSlot }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const today = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('slot_time')
        .eq('date', today)
        .eq('station_id', stationId);

      if (error) {
        console.error('Error fetching booked slots:', error);
        return;
      }

      const booked = data.map((item) => dayjs(item.slot_time).format('HH:mm'));
      setBookedSlots(booked);
    };

    if (modalVisible) fetchBookedSlots();
  }, [modalVisible, stationId]);

  useEffect(() => {
    const allSlots = generateTimeSlots();
    const available = allSlots.filter(
      (slot) => !bookedSlots.includes(slot) && dayjs(`${today}T${slot}`).isAfter(dayjs())
    );
    setAvailableSlots(available);
  }, [bookedSlots]);

  const handleSlotClick = async (slot) => {
    setSelectedSlot(slot);
    setModalVisible(false);
    // const dateTime = `${today}T${slot}`;

    // const { error } = await supabase
    //   .from('bookings')
    //   .insert([{ station_id: stationId, slot_time: dateTime, date: today }]);

    // if (error) {
    //   console.error('Error booking slot:', error);
    //   return;
    // }

    // setBookedSlots((prev) => [...prev, slot]);
    // alert(`Slot ${slot} booked successfully`);
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <AntDesign name="clockcircle" size={24} color="black" />
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Select a time slot</Text>
      </View>
      {selectedSlot && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 35,
              color: '#65CE46',
            }}>{`Selected Slot: ${selectedSlot}`}</Text>
        </View>
      )}
      {!selectedSlot && (
        <TouchableOpacity title="View Slots" onPress={() => setModalVisible(true)}>
          <Text style={{ color: '#65CE46', fontSize: 16, marginLeft: 35 }}>
            View Available Slots
          </Text>
        </TouchableOpacity>
      )}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.container}>
          <Text style={styles.title}>Available Slots for Station</Text>
          <FlatList
            data={availableSlots}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.slot} onPress={() => handleSlotClick(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      {/* Seperator */}
      <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 22, marginBottom: 10 },
  slot: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
});

export default BookingSlotSelector;
