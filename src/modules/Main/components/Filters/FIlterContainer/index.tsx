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
  countRespondent: number;
  isRow?: boolean;
  isShowCountRespondent?: boolean;
};

const FilterContainer = ({
  onApply,
  onReset,
  isLoading,
  isDisabled,
  children,
  data,
  text,
  countRespondent,
  isRow = false,
  isShowCountRespondent = true
}: Props) => {
  const isDisabledClearBtn = !hasFilter(data);

  const classNameBtns = isRow
    ? `${styles.filters__row} ${styles.filters__row_end}`
    : styles.filters__col;

  return (
    <div className={styles.filters}>
      {isLoading && <LoaderContent position='absolute' />}
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__box}>
          <span className={styles.filters__text}>{text}</span>
          {isShowCountRespondent && (
            <span className={styles.filters__text}>
              Кол-во респондентов: {countRespondent}
            </span>
          )}
        </div>
        <div className={styles.filters__container}>
          <div className={styles.filters__row}>{children}</div>
          <div className={classNameBtns}>
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
