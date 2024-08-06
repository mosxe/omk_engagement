import Select from 'components/Select';
import Navs from '../Navs';
import Description from '../Description';
import styles from './styles.module.scss';

// type Props = {
//   role: Role;
//   navRole: Role;
//   tags: Tags;
//   onClickNav: (role: Role) => void;
//   onChangeTag: (e: React.ChangeEvent<HTMLInputElement>, label: string) => void;
//   onShow: () => void;
//   onClear: () => void;
//   dataHRBP: IResponseItem;
// };

const Filters = () => {
  return (
    <div className={styles.filters}>
      <Navs />
      <Description />
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__text}>
          Воспользуйтесь фильтром, чтобы посмотреть подборку материалов
        </div>
        <div className={styles.filters__container}>
          <Select />
          <div className={styles.filters__btns}>
            <button
              // className={`${styles.filters__btn} ${
              //   selectedTags.length && styles.filters__btn_active
              // }`}
              type='button'
              // disabled={!selectedTags.length}
              // onClick={onShow}
            >
              Показать подборку
            </button>
            <button
              // className={`${styles.filters__btn} ${styles.filters__btn_clear} ${
              //   selectedTags.length && styles.filters__btn_active
              // }`}
              type='button'
              // disabled={!selectedTags.length}
              // onClick={onClear}
            >
              Очистить фильтр
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
