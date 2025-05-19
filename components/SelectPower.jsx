// BookingSlotSelector.tsx
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import supabase from 'services/supabase.js';

const SelectPower = ({ maxPower, setMaxPower }) => {
  const handleSlotClick = async (slot) => {
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
        <MaterialIcons name="offline-bolt" size={24} color="black" />
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Max Power Received</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        {/* number input */}
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            width: '10%',
            marginLeft: 35,
          }}
          value={maxPower}
          onChangeText={(text) => {
            // Optionally restrict to numbers only
            const numeric = text.replace(/[^0-9]/g, '');
            setMaxPower(numeric);
          }}
          keyboardType="numeric" // shows number pad
          placeholder="Enter a number"
        />
        <Text style={{ fontSize: 16, marginLeft: 10 }}>kW</Text>
      </View>

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

export default SelectPower;
