import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { NavbarProps } from './Navbar.types';
import './Navbar.css';

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
                <FiSettings size={20} onClick={() => {}} />
                <span className="custom-tooltip">User panel</span>
              </div>
              <div className="logout-icon-wrapper">
                <FiLogOut size={20} onClick={logout} />
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
