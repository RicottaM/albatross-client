import { useState } from 'react';
import './AddPointPopup.css';

const AddPointPopup = ({ onAdd, categories }: { onAdd: (name: string, categoryId: number) => void; categories: { id: number; name: string }[] }) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);

  return (
    <div className="popup">
      <h3>Add point</h3>
      <input className="popup-input" type="text" placeholder="Point name" value={name} onChange={(e) => setName(e.target.value)} />
      <select className="popup-select" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="popup-confirm" onClick={() => onAdd(name, categoryId)}>
        Add
      </button>
    </div>
  );
};

export default AddPointPopup;
