import { Point } from '@/models/Point';
import { Category } from '@/models/Category';
import { Marker } from 'leaflet';

export interface MarkerPopupProps {
  point: Point;
  categories: Category[];
  onDelete: () => void;
  onUpdate: (id: number, name: string, lat: number, lng: number, categoryId: number) => void;
  markerRef?: Marker | null;
}
