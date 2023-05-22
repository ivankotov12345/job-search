import { useState, useEffect, useMemo } from 'react';
import { Pagination } from '@mantine/core';

import { VacanciesCardsList } from '../../components/vacancies-cards-list';
import { EmptyList } from '../../components/empty-list';

import { VacancyType } from '../../types/vacancies-types';
import { useScreenWidth } from '../../hooks/use-screen-width';

import styles from './favorite-page.module.scss';

export const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState<VacancyType[]>([]);
  const [totalVacancies, setTotalVacancies] = useState<number>();

  const screenWidth = useScreenWidth();

  const paginationSize = screenWidth && screenWidth <= 450 ? 'sm' : 'md';

  const favVacanciesArr = useMemo<VacancyType[]>(() => {
    const favVacancies = localStorage.getItem('favorite');
    return favVacancies !== null ? JSON.parse(favVacancies) : [];
  }, []);

  const onRemove = (id: number) => {
    setFavoriteList(state => state.filter(vac => vac.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favoriteList));
  }, [favoriteList]);

  useEffect(() => {
    setFavoriteList(favVacanciesArr);
    setTotalVacancies(favVacanciesArr.length)
  }, [favVacanciesArr]);

  const ITEMS_PER_PAGE = 4;

  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<VacancyType[]>(favoriteList.slice(0, ITEMS_PER_PAGE));

  const pagesCount = totalVacancies ? Math.ceil(totalVacancies/ITEMS_PER_PAGE) : 1;

  useEffect(() => {
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE;
    setItems(favoriteList.slice(from, to));
  }, [page, favoriteList]);

  useEffect(() => {
    if(items.length === 0 && page > 1) {
      setPage(1);
    }
  }, [items, page]);

  return (
    <section className={styles.favorite_wrapper}>
      {items.length === 0
        ? <EmptyList />
        : <>
            <VacanciesCardsList vacanciesList={items} onRemove={onRemove} />
  
            {favoriteList.length > 4 && 
              <Pagination 
                total={pagesCount}
                onChange={setPage}
                size={paginationSize}
                classNames={{
                  control: styles.pagination_control,
                }} />}
          </>}  
    </section>
  )
}