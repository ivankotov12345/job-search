import { Link } from 'react-router-dom';

import { Paths } from '../../enums/paths';

import empty from './assets/svg/empty.svg';

import styles from './empty-list.module.scss';


export const EmptyList = () => {
  return (
    <div className={styles.empty_wrapper}>
        <img src={empty} alt='nothing was found' />

        <h1 className={styles.empty_header}>Упс, здесь еще ничего нет!</h1>
        
        <Link to={Paths.root} className={styles.home_link}>Поиск вакансий</Link>
    </div>
  )
}
