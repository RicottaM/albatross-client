import { useState } from 'react';
import { AddPointPopupProps } from './AddPointPopup.styles';
import './AddPointPopup.css';

const AddPointPopup = ({ onAdd, categories, initialName = '', initialCategoryId, buttonLabel = 'Add', title = 'Add point' }: AddPointPopupProps) => {
  const [name, setName] = useState(initialName);
  const [categoryId, setCategoryId] = useState<number>(initialCategoryId ?? (categories[0]?.id || 1));

  return (
    <div className="popup">
      <h3>{title}</h3>
      <input className="popup-input" type="text" placeholder="Point name" value={name} onChange={(e) => setName(e.target.value)} />
      <select className="popup-select" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="popup-confirm" onClick={() => onAdd(name, categoryId)}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default AddPointPopup;
