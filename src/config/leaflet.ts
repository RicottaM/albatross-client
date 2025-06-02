import L from 'leaflet';

export const containerStyle = {
  width: '100vw',
  height: '100vh',
};

export const customIcon = new L.Icon({
  iconUrl: '/png/marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

export const calculateCenter = (points: { latitude: number; longitude: number }[]) => {
  const latSum = points.reduce((sum, p) => sum + p.latitude, 0);
  const lngSum = points.reduce((sum, p) => sum + p.longitude, 0);
  return {
    lat: latSum / points.length,
    lng: lngSum / points.length,
  };
};
