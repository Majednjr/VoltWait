import haversine from 'haversine-distance';

const getDistanceInKm = (userLocation, station) => {
  if (!userLocation) return 'Unknown';
  const userCoords = { lat: userLocation.latitude, lng: userLocation.longitude };
  const stationCoords = {
    lat: station.geometry.location.lat,
    lng: station.geometry.location.lng,
  };
  const distance = haversine(userCoords, stationCoords); // in meters
  return (distance / 1000).toFixed(2);
};

export default getDistanceInKm;
