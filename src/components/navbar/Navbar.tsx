import './Navbar.css';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/albatross.svg" alt="logo" className="logo-icon" />
        <h2>
          <span className="logo-highlight">Alba.</span>Tross
        </h2>
      </div>
      <ul>
        <li>Documents</li>
        <li>Points</li>
        <li>Account</li>
      </ul>
    </nav>
  );
};

//<FaUser size={24} style={{ marginTop: 5 }} />

export default Navbar;
