import { LoaderContent } from 'components/Loader';
import { Filters } from 'types';
import { hasFilter } from 'helpers';
import styles from '../styles.module.scss';

type Props = {
  onApply: () => void;
  onReset: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  children: React.ReactNode;
  data: Filters[];
  text: string;
};

const FilterContainer = ({
  onApply,
  onReset,
  isLoading,
  isDisabled,
  children,
  data,
  text
}: Props) => {
  const isDisabledClearBtn = !hasFilter(data);

  return (
    <div className={styles.filters}>
      {isLoading && <LoaderContent position='absolute' />}
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__text}>{text}</div>
        <div className={styles.filters__container}>
          <div className={styles.filters__row}>{children}</div>
          <div className={styles.filters__col}>
            <button
              className={`${styles.filters__btn} ${styles.filters__btn_apply}`}
              type='button'
              disabled={isDisabled}
              onClick={onApply}
            >
              Применить
            </button>
            <button
              className={`${styles.filters__btn} ${styles.filters__btn_clear}`}
              type='button'
              disabled={isDisabledClearBtn}
              onClick={onReset}
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
