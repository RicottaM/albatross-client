import './MarkerPopup.css';
import { MarkerPopupProps } from './MarkerPopup.types';

const MarkerPopup = ({ point }: MarkerPopupProps) => {
  return (
    <div className="popup">
      <div className="popup-header">
        <span>{point.category?.name}</span>
      </div>
      <div className="popup-name">{point.name}</div>
    </div>
  );
};

export default MarkerPopup;
