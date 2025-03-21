import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 52.2298,
  lng: 21.0122,
};

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />
    </LoadScript>
  );
};

export default Map;
