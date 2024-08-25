import { LoaderContent } from 'components/Loader';
import { Filters, Tab } from 'types';
import { isDisabledBtn } from 'helpers';
import styles from '../styles.module.scss';

type Props = {
  onApply: () => void;
  onReset: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  data: Filters[];
};

const FilterContainer = ({
  onApply,
  onReset,
  isLoading,
  children,
  data
}: Props) => {
  const isDisabledClearBtn = isDisabledBtn(data);

  return (
    <div className={styles.filters}>
      {isLoading && <LoaderContent position='absolute' />}
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__text}>
          Воспользуйтесь фильтром, чтобы посмотреть подборку материалов
        </div>
        <div className={styles.filters__container}>
          <div className={styles.filters__row}>{children}</div>
          <div className={styles.filters__row}>
            <button
              className={`${styles.filters__btn} ${styles.filters__btn_apply}`}
              // className={`${styles.filters__btn} ${
              //   selectedTags.length && styles.filters__btn_active
              // }`}
              type='button'
              // disabled
              // disabled={!selectedTags.length}
              // onClick={handleApplyFilters}
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
