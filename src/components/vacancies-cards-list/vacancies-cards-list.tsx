import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { VacancyCard } from '../vacancy-card';

import { VacancyCardsPropsType } from '../../types/props-type';
import { VacancyType } from '../../types/vacancies-types';

import styles from './vacancies-cards-list.module.scss';

export const VacanciesCardsList = ({ vacanciesList, onRemove }: VacancyCardsPropsType) => {
  const { pathname } = useLocation();
  
  const favVacanciesArr = useMemo<VacancyType[]>(() => {
    const favVacancies = localStorage.getItem('favorite');
    return favVacancies !== null ? JSON.parse(favVacancies) : [];
  }, []);

  const vacancyTitle = styles.vacancy_title;
  const vacancySalary = styles.salary;
  const textStyle = styles.text;
  return (
    <>
    <ul className={styles.vacancies_list}>
      {vacanciesList?.map((vacancy) => (
        <li key={vacancy.id} data-elem={`vacancy-${vacancy.id}`}>
          <Link to={`${pathname}/${vacancy.id}`} className={styles.vacancy_link}>
            <VacancyCard 
              vacancy={vacancy} 
              favVacanciesArr={favVacanciesArr} 
              vacancyTitle={vacancyTitle}
              vacancySalaty={vacancySalary}
              textStyle={textStyle}
              onRemove={onRemove} />
          </Link>
        </li>
      ))}
    </ul>
    </>
  )
}
