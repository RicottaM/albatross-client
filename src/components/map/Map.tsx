import { MapContainer, TileLayer, Marker, ZoomControl, useMap, Popup } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import { containerStyle, customIcon } from '@/config/leaflet';
import { calculateCenter } from '@/utils/geo';
import { usePoints } from '@/hooks/usePoints';
import { UserPoint } from '@/models/UserPoint';
import MarkerPopup from '@/components/MarkerPopup/MarkerPopup';
import Alert from '@/components/Alert/Alert';
import 'leaflet/dist/leaflet.css';
import './Map.css';

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
  const { getUserPoints, deletePoint } = usePoints();

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
          <Marker key={userPoint.point.id} position={[userPoint.point.latitude, userPoint.point.longitude]} icon={customIcon}>
            <Popup>
              <MarkerPopup
                point={userPoint.point}
                onDelete={async () => {
                  try {
                    await deletePoint(userPoint.point.id);
                    setUserPoints((prev) => prev.filter((u) => u.point.id !== userPoint.point.id));
                  } catch {
                    setError('Failed to delete point.');
                  }
                }}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
