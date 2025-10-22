import { useState } from 'react';
import './styles.css';
import Logo from '../../assets/Logo.svg';
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button';
import IconButton from '../IconButton';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';

const NavBar = ({ links, navButton, logoutButton }) => {
  const [menuMobile, setMenuMobile] = useState(false);
  const menuToggle = () => setMenuMobile(!menuMobile);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <ul className={`navbar-links ${menuMobile ? 'active' : ''}`}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end
              className={({ isActive }) => (isActive ? 'active' : ' ')}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {navButton && (
        <Link to={navButton.to} className="navbar-btn">
          <Button variant="secondary" size="small">
            {navButton.label}
          </Button>
        </Link>
      )}
      {logoutButton && (
        <Button
          variant="secondary"
          size="small"
          onClick={logoutButton.handleClick}
        >
          {logoutButton.label}
        </Button>
      )}
      <div className="navbar-menuHamburger">
        {menuMobile ? (
          <IconButton
            onClick={menuToggle}
            icon={IoClose}
            color="var( --color-primary-blue)"
            size={42}
          />
        ) : (
          <IconButton
            onClick={menuToggle}
            icon={IoReorderThreeOutline}
            color="var( --color-primary-blue)"
            size={48}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
