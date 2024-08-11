import styles from '../styles.module.scss';

type Props = {
  onApply: () => void;
  onReset: () => void;
  children: React.ReactNode;
};

const FilterContainer = ({ onApply, onReset, children }: Props) => {
  return (
    <div className={styles.filters}>
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
              // className={`${styles.filters__btn} ${styles.filters__btn_clear} ${
              //   selectedTags.length && styles.filters__btn_active
              // }`}
              type='button'
              // disabled={!selectedTags.length}
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
