import { useEffect, useState, useContext } from 'react';
import { Loader, Pagination } from '@mantine/core';

import { SearchPanel } from '../../components/search-panel';
import { FilterMenu } from '../../components/filter-menu';
import { VacanciesCardsList } from '../../components/vacancies-cards-list';
import { EmptyList } from '../../components/empty-list';

import { AxiosPaths, instance } from '../../axios/axios';
import { VacancyType } from '../../types/vacancies-types';
import { useScreenWidth } from '../../hooks/use-screen-width';
import { BurgerContext } from '../../context/context';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [vacanciesList, setVacanciesList] = useState<VacancyType[]>();
  const [totalVacancies, setTotalVacancies] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>('');

  const screenWidth = useScreenWidth();

  const paginationSize = screenWidth && screenWidth <= 450 ? 'sm' : 'md';

  const { filterParams, currentPage, setCurrentPage } = useContext(BurgerContext);

  const ITEMS_PER_PAGE = 4;
  const pagesCount = totalVacancies ? Math.ceil(totalVacancies/ITEMS_PER_PAGE) : 1;

  const vacanciesRequest = `${AxiosPaths.vacancies}?published=1&keyword=${searchValue}&catalogues=${filterParams.category_key}&payment_from=${filterParams.payment_from}&payment_to=${filterParams.payment_to}&no_agreement=${filterParams.no_agreement}&page=${currentPage - 1}&count=${ITEMS_PER_PAGE}/`; 
  
  useEffect(() => {
    setIsLoaded(false);
    instance.get(vacanciesRequest)
    .then(({ data }) => {
      const vacanciesArr = data.objects
        .map((vacancy: VacancyType) => vacancy = {
          id: vacancy.id,
          profession: vacancy.profession,
          firm_name: vacancy.firm_name,
          town: {
              title: vacancy.town.title,
          },
          type_of_work: {
              title: vacancy.type_of_work.title,
          },
          payment_from: vacancy.payment_from,
          payment_to: vacancy.payment_to,
          vacancyRichText: vacancy.vacancyRichText
        });
      if(data.total > 500) {
        setTotalVacancies(500);
      } else {
        setTotalVacancies(data.total);
      }
      setVacanciesList(vacanciesArr);
      setIsLoaded(true);
    })
    .catch((error) => {
      console.log(error);
      setIsLoaded(true);
    })
  }, [vacanciesRequest, currentPage]);
  return (
      <>
      {vacanciesList?.length === 0
      ? <EmptyList />
      : <>
          {screenWidth && screenWidth > 900 &&
          <aside>
            <FilterMenu />
          </aside>}

          <section className={styles.vacancies_wrapper}>
            {!isLoaded &&
            <div className={styles.loader_wrapper}> 
              <Loader variant='dots' />
            </div>}
            <SearchPanel setSearchValue={setSearchValue} />
    
            <VacanciesCardsList vacanciesList={vacanciesList} />
    
            <div className={styles.pagination_container}>
              {pagesCount !== 1 &&
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage} 
                  total={pagesCount}
                  boundaries={1}
                  size={paginationSize}
                  classNames={{
                    control: styles.pagination_control,
                  }} />}
            </div>
          </section>
      </>}
    </>
  )
}
