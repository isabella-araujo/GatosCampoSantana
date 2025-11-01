import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoReorderThreeOutline, IoClose } from 'react-icons/io5';
import styles from './NavBar.module.css';
import Logo from '../../assets/Logo/Logo.svg';
import Button from '../Button/Button.jsx';
import IconButton from '../IconButton/IconButton.jsx';

const NavBar = ({ links, navButton, logoutButton }) => {
  const [menuMobile, setMenuMobile] = useState(false);
  const menuToggle = () => setMenuMobile(!menuMobile);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <ul className={`${styles.links} ${menuMobile ? styles.active : ''}`}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {navButton && (
        <Link to={navButton.to} className={styles.navButton}>
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
      <div className={styles.menuHamburger}>
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
