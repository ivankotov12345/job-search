import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';

import { Header } from '../header';
import { LoaderComponent } from '../loader';

import { BurgerContext } from '../../context/context';
import { AxiosAuthData, AxiosPaths, instance } from '../../axios/axios';
import { FilterParamsType } from '../../types/category-types'

import styles from './layout.module.scss';

export const Layout = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const [filterParams, setFilterParams] = useState<FilterParamsType>({
    category_key: '',
    payment_from: '',
    payment_to: '',
    no_agreement: 0,
  });

  const tokenData = useMemo(() => {
    const token = localStorage.getItem('token');
    return token !== null ? JSON.parse(token) : {};
  }, []);

  console.log(tokenData)

  const accessPath = `${AxiosPaths.auth}/?login=${AxiosAuthData.login}&password=${AxiosAuthData.password}&client_id=${AxiosAuthData.client_id}&client_secret=${AxiosAuthData.client_secret}&hr=${AxiosAuthData.hr}`;
  
  const refreshPath = `${AxiosPaths.refresh}/?refresh_token=${tokenData.refresh_token}&client_id=${AxiosAuthData.client_id}&client_secret=${AxiosAuthData.client_secret}`;

  useEffect(() => {
    setIsLoaded(false);
    if(!tokenData.access_token) {
      instance.get(accessPath)
      .then(({ data }) => {
        localStorage.setItem('token', JSON.stringify(data));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      })
    }
  }, [tokenData, accessPath]);

  useEffect(() => {
    const ttl = new Date(tokenData.ttl * 1000);
    const currDate = new Date();
    setIsLoaded(false);
    if(currDate >= ttl) {
      instance.get(refreshPath)
      .then(({ data }) => {
        localStorage.setItem('token', JSON.stringify(data));
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      })
    }

    setIsLoaded(true);
  }, [tokenData, refreshPath]);

  useEffect(() => {
    if(!localStorage.getItem('favorite')) {
      localStorage.setItem('favorite', JSON.stringify([]));
    }
  }, []);
  return (
    <BurgerContext.Provider value={{ isBurgerOpen, setIsBurgerOpen, filterParams, setFilterParams }}>
    <div className={isBurgerOpen 
                      ? classNames(styles.layout_wrapper, styles.layout_overflow)
                      : styles.layout_wrapper}>
      
      {!isLoaded && <LoaderComponent />}
      <Header />
      <main className={styles.main_outer}>
        <div className={styles.main_inner}>
          <Outlet />
        </div>
      </main>
    </div>
    </BurgerContext.Provider>
  )
}
