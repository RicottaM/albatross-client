import { useEffect, useState } from 'react';
import { MarkerPopupProps } from './MarkerPopup.types';
import './MarkerPopup.css';
import { CiSquareRemove, CiEdit } from 'react-icons/ci';

const MarkerPopup = ({ point, onDelete, onUpdate, categories, markerRef }: MarkerPopupProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(point.name);
  const [editedCategoryId, setEditedCategoryId] = useState(point.categoryId);

  const handleAccept = () => {
    onUpdate(point.id, editedName, point.latitude, point.longitude, editedCategoryId);
    console.log(point.id, editedName, point.latitude, point.longitude, editedCategoryId);
    setIsEditing(false);
  };

  const handleReject = () => {
    setIsEditing(false);
    setEditedName(point.name);
    setEditedCategoryId(point.categoryId);

    if (markerRef) {
      setTimeout(() => {
        markerRef.openPopup();
      }, 0);
    }
  };

  useEffect(() => {
    if (isEditing && markerRef) {
      setTimeout(() => {
        markerRef.openPopup();
      }, 0);
    }
  }, [isEditing, markerRef]);

  return (
    <div className="popup">
      {isEditing && <h3>Edit point</h3>}
      <div className="popup-header">
        {isEditing ? (
          <select className="popup-select" value={editedCategoryId} onChange={(e) => setEditedCategoryId(Number(e.target.value))}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        ) : (
          <h3>{point.category?.name}</h3>
        )}
      </div>

      <div className="popup-name">
        {isEditing ? <input className="popup-input" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : point.name}
      </div>

      <div className="popup-actions">
        {isEditing ? (
          <div className="popup-edit-wrapper">
            <button className="popup-confirm" onClick={handleAccept}>
              Save
            </button>
            <button className="popup-confirm" onClick={handleReject}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="popup-icon-wrapper">
              <CiEdit className="popup-icon" onClick={() => setIsEditing(true)} />
              <span className="custom-tooltip">Edit</span>
            </div>
            <div className="popup-icon-wrapper">
              <CiSquareRemove className="popup-icon" onClick={() => onDelete()} />
              <span className="custom-tooltip">Delete</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarkerPopup;
