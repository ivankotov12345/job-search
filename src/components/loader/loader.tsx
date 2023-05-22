import { Loader } from "@mantine/core";

import styles from './loader.module.scss';

export const LoaderComponent = () => {
  return (
    <div className={styles.loader_wrapper}>
        <Loader size={'lg'} />
    </div>
  )
}
