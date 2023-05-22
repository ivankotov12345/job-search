import { Link } from 'react-router-dom';
import { Navigation } from '../navigation';

import { BurgerMenu } from '../burger-menu';

import { useScreenWidth } from '../../hooks/use-screen-width';
import { Paths } from '../../enums/paths';

import logo from './assets/logo.svg';

import styles from './header.module.scss';

export const Header = () => {
  const screenWidth = useScreenWidth();
  return (
    <header className={styles.header_outer}>
      <div className={styles.header_inner}>
        <Link to={Paths.root} className={styles.logo_wrapper}>
        <img src={logo} alt='logo' />
        
        <span className={styles.text_logo}>Jobored</span>
        </Link>

        {screenWidth && screenWidth > 900 && <Navigation />}
        {screenWidth && screenWidth <= 900 &&
          <BurgerMenu />}
      </div>
    </header>
  )
}
