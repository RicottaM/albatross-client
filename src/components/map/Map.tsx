import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const Map = () => {
  return (
    <MapContainer center={[54.352, 18.6466]} zoom={13} style={containerStyle} zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default Map;
