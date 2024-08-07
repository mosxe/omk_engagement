import Select from 'components/Select';
import { OptionChange, Option } from 'components/Select/types';
import Navs from '../Navs';
import Description from '../Description';
import { Filters as IFilters } from 'types';
import { getFilterOptions, getDefaultValue } from 'helpers';
import styles from './styles.module.scss';

type Props = {
  data: IFilters[];
  subCode: string;
  // role: Role;
  // navRole: Role;
  // tags: Tags;
  // onClickNav: (role: Role) => void;
  // onChangeTag: (e: React.ChangeEvent<HTMLInputElement>, label: string) => void;
  // onShow: () => void;
  // onClear: () => void;
  // dataHRBP: IResponseItem;
};

const Filters = ({ data, subCode }: Props) => {
  const onChange = (options: OptionChange) => {
    console.log(options);
  };

  return (
    <div className={styles.filters}>
      <Navs />
      <Description />
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__text}>
          Воспользуйтесь фильтром, чтобы посмотреть подборку материалов
        </div>
        <div className={styles.filters__container}>
          <div className={styles.filters__row}>
            <Select
              options={getFilterOptions(data, 'group')}
              onChange={onChange}
              placeholder='Группа'
              width={180}
            />
            <Select
              options={getFilterOptions(data, 'subs')}
              defaultValue={getDefaultValue(data, subCode)}
              onChange={onChange}
              placeholder='Подразделение/БЕ'
              width={230}
            />
            <Select
              options={getFilterOptions(data, 'city')}
              onChange={onChange}
              placeholder='Город'
              width={170}
            />
          </div>
          <div className={styles.filters__row}>
            <button
              className={`${styles.filters__btn} ${styles.filters__btn_apply}`}
              // className={`${styles.filters__btn} ${
              //   selectedTags.length && styles.filters__btn_active
              // }`}
              type='button'
              disabled
              // disabled={!selectedTags.length}
              // onClick={onShow}
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
              // onClick={onClear}
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
