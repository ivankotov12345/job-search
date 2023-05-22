import { useContext, useEffect, useRef } from 'react';
import { Burger } from '@mantine/core';
import classNames from 'classnames';

import { Navigation } from '../navigation';
import { FilterMenu } from '../filter-menu';

import { BurgerContext } from '../../context/context';
import { useScreenWidth } from '../../hooks/use-screen-width';

import styles from './burger-menu.module.scss';

export const BurgerMenu = () => {
  const { isBurgerOpen, setIsBurgerOpen } = useContext(BurgerContext);

  const screenWidth = useScreenWidth();

  const burgerSize = screenWidth && screenWidth <= 460 ? 'md' : 'lg';
  
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const clickOutsideMenu = (event: MouseEvent) => {
      if(isBurgerOpen 
          && !menuRef.current?.contains(event.target as Node) 
          && !burgerRef.current?.contains(event.target as Node)) {
        setIsBurgerOpen(!isBurgerOpen);
        event.preventDefault();
        event.stopPropagation();
      }
    }
    document.addEventListener('click', clickOutsideMenu);
  });

  const burgerMenuToggle = () => {
    setIsBurgerOpen(!isBurgerOpen)
  }
  return (
    <>
      <Burger
        size={burgerSize}
        ref={burgerRef}
        opened={isBurgerOpen}
        onClick={burgerMenuToggle}
        classNames={{
          root: styles.burger,
        }} />
      <div className={isBurgerOpen 
          ? classNames(styles.aside_outer, styles.aside_outer_active)
          : styles.aside_outer}>
        <div className={styles.aside_inner} ref={menuRef}>
          <Navigation />
          <FilterMenu />
        </div>
      </div>
    </>
  )
}
