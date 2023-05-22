import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Paths } from '../../enums/paths'
import { BurgerContext } from '../../context/context';

import styles from './navigation.module.scss';

export const Navigation = () => {
  const { setIsBurgerOpen } = useContext(BurgerContext);

  const handleMenuLinkClick = () => {
    setIsBurgerOpen(false);
  };
  return (
    <nav className={styles.navigation}>
    <ul>
      <li>
        <NavLink 
          to={Paths.vacancies} 
          className={({ isActive }) => isActive
          ? classNames(styles.nav_link, styles.active)
          : styles.nav_link}
          onClick={handleMenuLinkClick}>
        Поиск вакансий
        </NavLink>
      </li>
      
      <li>
        <NavLink 
          to={Paths.favorite}
          className={({ isActive }) => isActive
          ? classNames(styles.nav_link, styles.active)
          : styles.nav_link}
          onClick={handleMenuLinkClick}>
          Избранное
          </NavLink>
      </li>
    </ul>
  </nav>
  )
}
