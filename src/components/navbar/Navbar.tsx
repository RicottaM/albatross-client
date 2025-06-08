import { useAuth } from '@/hooks/useAuth';
import { NavbarProps } from './Navbar.types';
import { VscSignOut } from 'react-icons/vsc';
import './Navbar.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { FaCircleUser } from 'react-icons/fa6';

const Navbar = ({ username, categories, selectedCategory, onCategoryChange }: NavbarProps) => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/svg/albatross-traced.svg" alt="logo" className="logo-icon" />
        <h3>
          <span className="logo-highlight">Alba.</span>Tross
        </h3>
      </div>
      <ul>
        <li>Category:</li>
        <li className="select-wrapper">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value === '*' ? '*' : Number(e.target.value))}
          >
            <option value="*">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </li>
        {username && (
          <div className="navbar-user">
            <li className="navbar-username">
              <span title="Sign out">{username}</span>
            </li>
            <li className="navbar-user-info">
              <div className="logout-icon-wrapper">
                <PiSignOutBold size={26} onClick={logout} />
                <span className="custom-tooltip">Sign out</span>
              </div>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
