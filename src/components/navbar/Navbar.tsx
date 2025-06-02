import './Navbar.css';
import { BsDoorOpenFill } from 'react-icons/bs';
import { useAuth } from '@/hooks/useAuth';
import { NavbarProps } from './Navbar.types';

const Navbar = ({ username }: NavbarProps) => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/albatross-bigger.svg" alt="logo" className="logo-icon" />
        <h3>
          <span className="logo-highlight">Alba.</span>Tross
        </h3>
      </div>
      <ul>
        {username && (
          <>
            <li className="navbar-username">
              <span title="Sign out">{username}</span>
            </li>
            <li className="navbar-user-info">
              <div className="logout-icon-wrapper">
                <BsDoorOpenFill size={32} onClick={logout} />
                <span className="custom-tooltip">Sign out</span>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
