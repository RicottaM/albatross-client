import './Alert.css';
import { AlertProps } from './Alert.types';

const Alert = ({ title, message, onClose }: AlertProps) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h3>{title}</h3>
        <div className="alert-message">{message}</div>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Alert;
