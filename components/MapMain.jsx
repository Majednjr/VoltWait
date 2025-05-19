import haversine from 'haversine-distance';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const GOOGLE_MAPS_API_KEY = 'AIzaSyACIPX5XFP26M8U8V0fDYESwGY4A7domWc'; // replace this

const MapMain = () => {
  const [location, setLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchChargingStations(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchChargingStations = async (lat, lng) => {
    try {
      const radius = 5000;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=charging+station&location=${lat},${lng}&radius=${radius}&key=${GOOGLE_MAPS_API_KEY}`;
      console.log('Fetching URL:', url);

      const res = await fetch(url);
      const json = await res.json();
      setStations(json.results);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getDistanceInKm = (userCoords, station) => {
    if (!userCoords || !station?.geometry?.location) return 'Unknown';
    const from = { lat: userCoords.latitude, lng: userCoords.longitude };
    const to = {
      lat: station.geometry.location.lat,
      lng: station.geometry.location.lng,
    };
    return (haversine(from, to) / 1000).toFixed(2);
  };

  const handleCheckIn = (station) => {
    router.push({
      pathname: '/StationDetails',
      params: {
        stationName: station.name,
        stationAddress: station.formatted_address,
        stationId: station.place_id,
        stationLat: station.geometry.location.lat,
        stationLng: station.geometry.location.lng,
        stationImageUri:
          Array.isArray(station.photos) && station.photos[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${station.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
            : null,
        stationRating: station.rating,
      },
    });
  };

  if (!location || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#65CE46" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {stations.map((station, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: station.geometry.location.lat,
              longitude: station.geometry.location.lng,
            }}
            pinColor="#65CE46"
            onPress={() => setSelectedStation(station)}
          />
        ))}
      </MapView>

      {selectedStation && (
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.cardTitle}>{selectedStation.name}</Text>
            <TouchableOpacity
              style={{ padding: 8, borderRadius: 50, backgroundColor: '#777373' }}
              onPress={() => setSelectedStation(null)}>
              <FontAwesome name="times" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardSubtitle}>
            {getDistanceInKm(location, selectedStation)} km away
          </Text>

          <TouchableOpacity
            style={styles.checkInButton}
            onPress={() => handleCheckIn(selectedStation)}>
            <Text style={styles.checkInText}>Check In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MapMain;

const styles = StyleSheet.create({
  container: {
    height: '105%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  checkInButton: {
    backgroundColor: '#65CE46',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkInText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
