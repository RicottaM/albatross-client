export const calculateCenter = (points: { latitude: number; longitude: number }[]) => {
  const latSum = points.reduce((sum, p) => sum + p.latitude, 0);
  const lngSum = points.reduce((sum, p) => sum + p.longitude, 0);
  return {
    lat: latSum / points.length,
    lng: lngSum / points.length,
  };
};
