import { ChangeEvent, useState } from 'react';

import { useScreenWidth } from '../../hooks/use-screen-width';
import { SearchPanelPropsType } from '../../types/props-type';

import styles from './search-panel.module.scss';


export const SearchPanel = ({ setSearchValue, setCurrentPage }: SearchPanelPropsType ) => {
  const [inputValue, setInputValue] = useState<string>('');

  const screenWidth = useScreenWidth();

  const searchPlacholderText = screenWidth && screenWidth <= 410
          ? 'Введите название...'
          : 'Введите название вакансии';

  const searchPanelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = () => {
    setSearchValue(inputValue);
    setCurrentPage(0);
  };
  return (
    <form className={styles.panel_form}>
      <input
        data-elem='search-input'
        type='search' 
        placeholder={searchPlacholderText} 
        className={styles.panel} 
        onChange={searchPanelChange} />
      
      <input
        data-elem='search-button'
        type='button' 
        value='Поиск' 
        className={styles.button_search} 
        onClick={handleSubmit} />
    </form>
  )
}
