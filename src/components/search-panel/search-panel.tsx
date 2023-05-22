import { ChangeEvent, useContext, useState } from 'react';

import { useScreenWidth } from '../../hooks/use-screen-width';
import { SearchPanelPropsType } from '../../types/props-type';

import styles from './search-panel.module.scss';
import { BurgerContext } from '../../context/context';


export const SearchPanel = ({ setSearchValue }: SearchPanelPropsType ) => {
  const [inputValue, setInputValue] = useState<string>('');

  const screenWidth = useScreenWidth();

  const { setCurrentPage } = useContext(BurgerContext);

  const searchPlacholderText = screenWidth && screenWidth <= 410
          ? 'Введите название...'
          : 'Введите название вакансии';

  const searchPanelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = () => {
    setSearchValue(inputValue);
    setCurrentPage(1);
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
