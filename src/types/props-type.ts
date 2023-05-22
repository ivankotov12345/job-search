import { FilterParamsType } from './category-types';
import { VacancyType } from './vacancies-types';

export type VacancyCardsPropsType = {
    vacanciesList: VacancyType[] | undefined,
    onRemove?: (id: number) => void,
}

export type SearchPanelPropsType = {
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
}

export type FilterPanelPropsType = {
    setFilterParams: React.Dispatch<React.SetStateAction<FilterParamsType>>,
}

export type RightSectionPropsType = {
    filterMenuActive: boolean,
}

export type VacancyCardPropsType = {
    vacancy: VacancyType,
    favVacanciesArr: VacancyType[],
    vacancyTitle: string,
    vacancySalaty: string,
    textStyle: string,
    onRemove?: (id: number) => void,
}