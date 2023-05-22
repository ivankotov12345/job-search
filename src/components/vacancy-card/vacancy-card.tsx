import { SyntheticEvent, useState, useEffect } from 'react';

import { VacancyCardPropsType } from '../../types/props-type'

import location from './assets/svg/location.svg'

import styles from './vacancy-card.module.scss'

export const VacancyCard = ({ vacancy, 
        favVacanciesArr, 
        vacancyTitle, 
        vacancySalaty,
        textStyle, 
        onRemove }: VacancyCardPropsType) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  useEffect(() => {
    const fav = favVacanciesArr.filter(fav => fav.id === vacancy.id)
    if(fav[0]) {
      setIsFavorite(true);
    }
  }, [favVacanciesArr, vacancy]);

  const salary = (paymentFrom: number, paymentTo: number) => {
    if(paymentFrom === 0 && paymentTo === 0) return null
    else if(paymentFrom === 0) {
      return (
        <span className={vacancySalaty}>з/п {paymentTo} rub</span>
      )
    } else if(paymentTo === 0) {
      return (
        <span className={vacancySalaty}>з/п от {paymentFrom} rub</span>
      )
    } else {
      return (
        <span className={vacancySalaty}>з/п {paymentFrom} - {paymentTo} rub</span>
      )
    };
  };

  const addToFavList = () => {
    if(!favVacanciesArr.includes(vacancy)) {
      favVacanciesArr.push(vacancy);
    }
    localStorage.setItem('favorite', JSON.stringify(favVacanciesArr));
  };

  const removeFromFavList = () => {
    const filteredFavVacanciesArr = favVacanciesArr.filter(favVacancy => favVacancy.id !== vacancy.id);
    localStorage.setItem('favorite', JSON.stringify(filteredFavVacanciesArr));
  };
  
  const favHandle = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isFavorite) {
      addToFavList();
      setIsFavorite(true);
    } else {
      onRemove?.(vacancy.id);
      removeFromFavList();
      setIsFavorite(false);
    };
  };

  return (
    <article className={styles.vacancy_card}>
      <div className={styles.vacancy_head_wrapper}>
        <h2 className={vacancyTitle}>{vacancy.profession}</h2>
  
        <button type='button' onClick={favHandle} className={styles.fav_button}>
          <div className={isFavorite 
                ? styles.fav_button_star_filled
                : styles.fav_button_star} />
        </button>
      </div>

      <p className={styles.vacancy_info}>
        {salary(vacancy.payment_from, vacancy.payment_to)}
        <span className={styles.bullet}>•</span>
        <span className={textStyle}>{vacancy.type_of_work.title}</span>
      </p>

      <div className={styles.vacancy_location}>
        <img src={location} alt='location logo' />
        <span className={textStyle}>{vacancy.town.title}</span>
      </div>
    </article>
  )
}
