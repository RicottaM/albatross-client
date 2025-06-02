import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import { usePoints } from '@/hooks/usePoints';
import { UserPoint } from '@/models/UserPoint';
import Alert from '@/components/alert/Alert';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const customIcon = new L.Icon({
  iconUrl: '/marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

const calculateCenter = (points: { latitude: number; longitude: number }[]) => {
  const latSum = points.reduce((sum, p) => sum + p.latitude, 0);
  const lngSum = points.reduce((sum, p) => sum + p.longitude, 0);
  return {
    lat: latSum / points.length,
    lng: lngSum / points.length,
  };
};

const SetMapCenter = ({ center }: { center: { lat: number; lng: number } }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);

  return null;
};

const Map = () => {
  const [userPoints, setUserPoints] = useState<UserPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { getUserPoints } = usePoints();

  useEffect(() => {
    getUserPoints()
      .then((points) => {
        setUserPoints(points);
      })
      .catch(() => {
        setError('Failed to load points.');
      });
  }, []);

  const center = useMemo(() => {
    if (userPoints.length === 0) return { lat: 54.352, lng: 18.6466 };
    const coords = userPoints.map((u) => ({
      latitude: u.point.latitude,
      longitude: u.point.longitude,
    }));
    return calculateCenter(coords);
  }, [userPoints]);

  return (
    <>
      {error && <Alert title="Error" message={error} onClose={() => setError(null)} />}

      <MapContainer center={[center.lat, center.lng]} zoom={13} style={containerStyle} zoomControl={false}>
        <SetMapCenter center={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="bottomright" />

        {userPoints.map((userPoint) => (
          <Marker key={userPoint.point.id} position={[userPoint.point.latitude, userPoint.point.longitude]} icon={customIcon} />
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
