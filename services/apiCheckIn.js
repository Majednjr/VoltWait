import supabase from './supabase.js';

import dayjs from 'dayjs';
import { getUserById } from './apiAuth.js';

export async function addNewBooking(userId, station, bookingSlot, power) {
  const today = dayjs().format('YYYY-MM-DD');
  const dateTime = `${today}T${bookingSlot}`;

  let rewardCount = 0;

  getUserById(userId)
    .then((res) => {
      const userData = res.data[0];
      rewardCount = userData.reward_count;
    })
    .catch((err) => {
      console.error('Error fetching user data:', err);
    });

  const { error } = await supabase
    .from('stations')
    .upsert(
      {
        station_id: station.id,
        name: station.name,
        lat: station.lat,
        lng: station.lng,
        address: station.address,
        image: station.image,
      },
      { onConflict: 'station_id' }
    )
    .select();

  if (error) {
    console.error('Error adding new booking:', error);
    return;
  }

  const { data: bookingData, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      user_id: userId,
      station_id: station.id,
      slot_time: dateTime,
      date: today,
      power,
      plug_type: 'Type 2',
    })
    .select();

  if (bookingError) {
    console.error('Error adding new booking:', bookingError);
    return;
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .update({ is_banned: null, reward_count: rewardCount + 5 })
    .eq('id', userId)
    .select();

  return { bookingData, bookingError };
}

export async function getBookingsByUserId(userId) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('slot_time', { ascending: true });

  const stationIds = data.map((booking) => booking.station_id);
  const stationDetails = await Promise.all(stationIds.map((id) => getStationDetails(id)));

  data.forEach((booking, index) => {
    booking.stationDetails = stationDetails[index];
  });

  if (error) {
    console.error('Error fetching bookings:', error);
    return;
  }

  return data;
}

export async function getStationDetails(stationId) {
  const { data, error } = await supabase
    .from('stations')
    .select('*')
    .eq('station_id', stationId)
    .single();

  if (error) {
    console.error('Error fetching station details:', error);
    return;
  }

  return data;
}

export async function checkOutBooking(bookingId, userId, almostExpired) {
  if (almostExpired) {
    const today = dayjs().format('YYYY-MM-DD');
    const dateTime = `${today}T${new Date().toISOString().split('T')[1]}`;
    const { error } = await supabase.from('users').update({ is_banned: dateTime }).eq('id', userId);

    if (error) {
      console.error('Error checking out booking:', error);
      return;
    }
  }

  const { data: userData } = await getUserById(userId);
  const rewardCount = userData[0].reward_count;
  const { error: userError } = await supabase
    .from('users')
    .update({ reward_count: rewardCount - 5 })
    .eq('id', userId);

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error('Error checking out booking:', error);
    return;
  }

  return true;
}

export async function checkIsBanned(userId) {
  const { data } = await getUserById(userId);
  console.log('checkIsBanned', data);

  const banDate = data[0].is_banned;
  console.log('banDate', banDate);

  if (!banDate) {
    return false;
  }
  const isLessThan72Hours = dayjs().diff(dayjs(banDate), 'hour') < 72;

  return isLessThan72Hours;
}

export async function getRewardCount(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('reward_count')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching reward count:', error);
    return;
  }

  return data.reward_count;
}

export async function redeemReward(userId) {
  const rewardCount = await getRewardCount(userId);

  const { data, error } = await supabase
    .from('users')
    .update({ reward_count: rewardCount - 50 })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error redeeming reward:', error);
    return;
  }

  return data;
}
