import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { VacancyCard } from '../../components/vacancy-card';
import { LoaderComponent } from '../../components/loader';

import { AxiosPaths, instance } from '../../axios/axios';
import { VacancyType } from '../../types/vacancies-types';

import styles from './vacancy-page.module.scss';

export const VacancyPage = () => {
  const [vacancy, setVacancy] = useState<VacancyType>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const favVacancies = localStorage.getItem('favorite');
  const favVacanciesArr: VacancyType[] = favVacancies !== null ? JSON.parse(favVacancies) : null;

  const { pathname } = useLocation();

  const vacancyId = pathname.split('/')[2];

  const vacancyTitle = styles.vacancy_title;
  const vacancySalary = styles.salary;
  const textStyle = styles.text;

  useEffect(() => {
    setIsLoaded(false);
    instance.get(`${AxiosPaths.vacancies}${vacancyId}/`)
      .then(({ data }) => {
        const vacancyData = {
          id: data.id,
          profession: data.profession,
          firm_name: data.firm_name,
          town: {
              title: data.town.title,
          },
          type_of_work: {
              title: data.type_of_work.title,
          },
          payment_from: data.payment_from,
          payment_to: data.payment_to,
          vacancyRichText: data.vacancyRichText
        };
        setVacancy(vacancyData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
      })
  }, [vacancyId]);
  
  const createMarkUp = () => {
    if(!vacancy) return
    return {
      __html: vacancy?.vacancyRichText,
    }
  };

  if(!isLoaded) {
    return <LoaderComponent />
  }
  return (
    <div>
      {vacancy && 
        <VacancyCard 
          vacancy={vacancy} 
          favVacanciesArr={favVacanciesArr} 
          vacancyTitle={vacancyTitle}
          vacancySalaty={vacancySalary}
          textStyle={textStyle} />}

      <div className={styles.description_wrapper} dangerouslySetInnerHTML={createMarkUp()} />
    </div>
  )
}
