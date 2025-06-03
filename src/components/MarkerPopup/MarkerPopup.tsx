import { MarkerPopupProps } from './MarkerPopup.types';
import './MarkerPopup.css';
import { CiSquareRemove } from 'react-icons/ci';

const MarkerPopup = ({ point, onDelete }: MarkerPopupProps) => {
  return (
    <>
      <div className="popup">
        <div className="popup-header">
          <span>{point.category?.name}</span>
        </div>
        <div className="popup-name">{point.name}</div>
        <div className="popup-actions">
          <div className="popup-icon-wrapper">
            <CiSquareRemove className="popup-icon" onClick={() => onDelete()} />
            <span className="custom-tooltip">Delete</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkerPopup;
