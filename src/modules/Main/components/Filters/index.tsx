import { OptionChange, Option } from 'components/Select/types';
// import Description from '../Description';
import FilterEngagement from './components/FilterEngagement';
import FilterCompass from './components/FilterCompass';
import { Filters as IFilters, Filter, Tab, FilterName } from 'types';
import { getFilterOptions, getDefaultValue } from 'helpers';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import styles from './styles.module.scss';

type Props = {
  data: IFilters[];
  subCode: string;
  tab: Tab;
  // role: Role;
  // navRole: Role;
  // tags: Tags;
  // onClickNav: (role: Role) => void;
  // onChangeTag: (e: React.ChangeEvent<HTMLInputElement>, label: string) => void;
  // onShow: () => void;
  // onClear: () => void;
  // dataHRBP: IResponseItem;
};

const Filters = ({ data, subCode, tab }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters
  );

  // console.log(selectedFilters);

  const onChange = (options: OptionChange, filterName: FilterName) => {
    // console.log(filterName);
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab, data: filterValues }));
  };

  return (
    <div className={styles.filters}>
      {/* <Description /> */}
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__text}>
          Воспользуйтесь фильтром, чтобы посмотреть подборку материалов
        </div>
        <div className={styles.filters__container}>
          <div className={styles.filters__row}>
            {tab === 'engagement' && (
              <FilterEngagement
                data={data}
                dataSelected={selectedFilters}
                onChange={onChange}
                subCode={subCode}
              />
            )}
            {tab === 'compass' && (
              <FilterCompass
                data={data}
                dataSelected={selectedFilters}
                onChange={onChange}
                subCode={subCode}
              />
            )}
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
