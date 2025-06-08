import { MapContainer, TileLayer, Marker, ZoomControl, useMap, Popup } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { containerStyle, customIcon } from '@/config/leaflet';
import { calculateCenter } from '@/utils/geo';
import { usePoints } from '@/hooks/usePoints';
import { UserPoint } from '@/models/UserPoint';
import { Category } from '@/models/Category';
import MarkerPopup from '@/components/MarkerPopup/MarkerPopup';
import Alert from '@/components/Alert/Alert';
import AddPointPopup from '../AddPointPopup/AddPointPopup';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useCategories } from '@/hooks/useCatagories';

const MapClickHandler = ({ onRightClick }: { onRightClick: (latlng: { lat: number; lng: number }) => void }) => {
  const map = useMap();

  useEffect(() => {
    const handleRightClick = (e: L.LeafletMouseEvent) => {
      onRightClick(e.latlng);
    };

    map.on('contextmenu', handleRightClick);
    return () => {
      map.off('contextmenu', handleRightClick);
    };
  }, [map, onRightClick]);

  return null;
};

const SetMapCenter = ({ center }: { center: { lat: number; lng: number } }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);

  return null;
};

const PopupCloseHandler = ({ onClose }: { onClose: () => void }) => {
  const map = useMap();

  useEffect(() => {
    const handleClose = () => onClose();
    map.on('popupclose', handleClose);

    return () => {
      map.off('popupclose', handleClose);
    };
  }, [map, onClose]);

  return null;
};

const Map = () => {
  const [userPoints, setUserPoints] = useState<UserPoint[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newMarker, setNewMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getUserPoints, deletePoint, createPoint } = usePoints();
  const { getCategories } = useCategories();

  const newMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    getUserPoints()
      .then(setUserPoints)
      .catch(() => setError('Failed to load points.'));

    getCategories()
      .then(setCategories)
      .catch(() => setError('Failed to load categories'));
  }, []);

  useEffect(() => {
    if (newMarker && newMarkerRef.current) {
      setTimeout(() => {
        newMarkerRef.current?.openPopup();
      }, 0);
    }
  }, [newMarker]);

  const center = useMemo(() => {
    if (userPoints.length === 0) return { lat: 54.352, lng: 18.6466 };

    const coords = userPoints
      .filter((u) => u.point && u.point.latitude && u.point.longitude)
      .map((u) => ({
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
        <MapClickHandler onRightClick={(latlng) => setNewMarker(latlng)} />
        <PopupCloseHandler onClose={() => setNewMarker(null)} />
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

        {newMarker && (
          <Marker position={[newMarker.lat, newMarker.lng]} icon={customIcon} ref={newMarkerRef}>
            <Popup position={[newMarker.lat, newMarker.lng]}>
              <AddPointPopup
                categories={categories}
                onAdd={async (name, categoryId) => {
                  try {
                    await createPoint(name, newMarker.lat, newMarker.lng, categoryId);
                    const updatedPoints = await getUserPoints();
                    setUserPoints(updatedPoints);
                    setNewMarker(null);
                  } catch (error) {
                    setNewMarker(null);
                    setError(error instanceof Error ? error.message : 'Failed to create point.');
                  }
                }}
              />
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
