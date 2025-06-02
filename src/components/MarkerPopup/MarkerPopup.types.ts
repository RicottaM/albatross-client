import { Point } from '@/models/Point';

export type MarkerPopupProps = {
  point: Point;
  onClose?: () => void;
};
