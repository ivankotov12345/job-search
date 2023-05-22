import { useEffect, useState, useContext } from 'react';
import { NumberInput, Select, SelectItem } from '@mantine/core';

import { AxiosPaths, instance } from '../../axios/axios';
import { BurgerContext } from '../../context/context';
import { RightSection } from './right-section';
import { CategoryType } from '../../types/category-types';

import styles from './filter-menu.module.scss';

export const FilterMenu = () => {
  const [categories, setCategories] = useState<(string | SelectItem)[]>([{
    value: '',
    label: '',
    disabled: false,
    key: 0,
  }]);
  const [categoryValue, setCategoryValue] = useState<string | null>('');
  const [paymentFromValue, setPaymentFromValue] = useState<number | ''>('');
  const [paymentToValue, setPaymentToValue] = useState<number | ''>('');
  const [filterMenuActive, setFilterMenuActive] = useState<boolean>(false);

  const { setFilterParams, setIsBurgerOpen } = useContext(BurgerContext);

  const agrementValue = paymentFromValue || paymentFromValue ? 1 : ''; 

  useEffect(() => {
    instance.get(AxiosPaths.catalogues)
      .then(({ data }) => {
        const categoriesArr = data.reduce((newArr: SelectItem, category: CategoryType, index: number) => {
          newArr[index] = {
            value: `${category.key}`,
            label: category.title.length < 31 ? category.title : category.title_trimmed,
            disabled: false,
          };

          return newArr;
        }, [{}])

        setCategories(categoriesArr);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  const handleSubmit = () => {
    setFilterParams({
      category_key: categoryValue,
      payment_from: paymentFromValue,
      payment_to: paymentToValue,
      no_agreement: agrementValue,
    });
    setIsBurgerOpen(false);
  };

  const filterMenuToggle = () => {
    setFilterMenuActive(!filterMenuActive);
  };

  const closeMenu = () => {
    setFilterMenuActive(false);
  };

  const onRemoveFiltersClick = () => {
    setCategoryValue('');
    setPaymentFromValue('');
    setPaymentToValue('');
    setFilterParams({
      category_key: null,
      payment_from: '',
      payment_to: '',
      no_agreement: '',
    });
    setIsBurgerOpen(false);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.head_wrapper}>
        <h2 className={styles.form_header}>Фильтры</h2>
        <button type='button' className={styles.remove_filters_button} onClick={onRemoveFiltersClick}>
          <span>Сбросить все</span>
          <div className={styles.clear} />
        </button>
      </div>

      <Select
        data-elem='industry-select'
        label='Отрасль'
        placeholder='Выберите отрасль'
        value={categoryValue}
        rightSection={<RightSection filterMenuActive={filterMenuActive} />}
        onChange={setCategoryValue}
        onClick={filterMenuToggle}
        onDropdownClose={closeMenu}
        data={categories}
        classNames={{
          input: styles.input_wrapper,
          rightSection: styles.right_section,
          dropdown: styles.dropdown,
          item: styles.dropdown_item,
          label: styles.label,
        }} />
      
        <div className={styles.salary_wrapper}>
        <NumberInput
          data-elem='salary-from-input'
          label='Оклад'
          aria-label='Оклад от' 
          placeholder='От'
          startValue={1000}
          step={1000}
          value={paymentFromValue}
          onChange={setPaymentFromValue}
          classNames={{
            input: styles.input_wrapper,
            label: styles.label,
            control: styles.salary_range_control,
            rightSection: styles.number_right_section,
          }} />

        <NumberInput
          data-elem='salary-to-input' 
          placeholder='До'
          aria-label='Оклад до'
          startValue={1000}
          step={1000}
          value={paymentToValue}
          onChange={setPaymentToValue}
          classNames={{
            control: styles.salary_range_control,
            input: styles.input_wrapper,
            rightSection: styles.number_right_section,
          }} />
      </div>
      <input
        data-elem='search-button' 
        type='button' 
        value='Применить' 
        className={styles.button_submit} 
        onClick={handleSubmit} />
    </form>
  )
}
