import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <img src="/404.png" alt="404 Not Found" width={'20%'} className="notfound-image" />
      <div className="notfound-content">
        <p>Page not found.</p>
        <img src="/curved-arrow.svg" className="home-icon" width={64} onClick={() => navigate('/home')} />
      </div>
    </div>
  );
};

export default NotFound;
