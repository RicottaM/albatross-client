import './Navbar.css';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { NavbarProps } from './Navbar.types';

const Navbar = ({ username }: NavbarProps) => {
  const { logout } = useAuth();

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
        {username && (
          <li className="navbar-user-info">
            <FaUser size={18} />
            <span>{username}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
