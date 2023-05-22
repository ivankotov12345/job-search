import { createContext } from 'react';
import { FilterParamsType } from '../types/category-types';

export type BurgerContextType = {
    isBurgerOpen: boolean,
    setIsBurgerOpen: (isOpen: boolean) => void,
    filterParams: FilterParamsType,
    setFilterParams: (filterParams: FilterParamsType) => void,
    currentPage: number,
    setCurrentPage: (page: number) => void
}

export const BurgerContext = createContext<BurgerContextType>({ 
    isBurgerOpen: false,
    setIsBurgerOpen: () => {},
    filterParams: {
        category_key: '',
        payment_from: '',
        payment_to: '',
        no_agreement: 0
      },
    setFilterParams: () => {},
    currentPage: 1,
    setCurrentPage: () => {} });
    