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
