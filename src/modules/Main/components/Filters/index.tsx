import { useEffect } from 'react';
import { OptionChange } from 'components/Select/types';
import FilterEngagement from './components/FilterEngagement';
import FilterCompass from './components/FilterCompass';
import { Filter, Tab, FilterName } from 'types';
import { transformDataFilters } from 'helpers';
import {
  useLazyGetFilterEngagementDataQuery,
  useLazyGetFilterCompassDataQuery,
  useLazyGetSpeedDataQuery
} from 'store/apiSlice';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  initialFiltersEngagement,
  initialFiltersCompass,
  initialSpeedChart
} from 'store/constants';
import styles from './styles.module.scss';

type Props = {
  tab: Tab;
};

const Filters = ({ tab }: Props) => {
  const [
    updateFiltersEngagement,
    { data: dataFiltersEngagement = initialFiltersEngagement }
  ] = useLazyGetFilterEngagementDataQuery();
  const [
    updateFiltersCompass,
    { data: dataFiltersCompass = initialFiltersCompass }
  ] = useLazyGetFilterCompassDataQuery();
  const [updateSpeedChart, { data: dataSpeedChart = initialSpeedChart }] =
    useLazyGetSpeedDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters
  );
  console.log(dataSpeedChart);
  useEffect(() => {
    updateFiltersEngagement({ filters: [], is_starting: true });
    updateFiltersCompass({ filters: [], is_starting: true });
  }, []);

  const onChange = async (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab, data: filterValues }));
    if (tab === 'engagement') {
      const dataFilters = transformDataFilters(
        selectedFilters.engagement,
        filterValues
      );
      await updateFiltersEngagement({
        filters: dataFilters,
        is_starting: false
      });
    } else if (tab === 'compass') {
      const dataFilters = transformDataFilters(
        selectedFilters.compass,
        filterValues
      );
      await updateFiltersCompass({
        filters: dataFilters,
        is_starting: false
      });
    }
  };

  const handleApplyFilters = async () => {
    if (tab === 'engagement') {
      const dataFilters = transformDataFilters(selectedFilters.engagement);
      await updateSpeedChart({
        filters: dataFilters
      });
    } else if (tab === 'compass') {
      const dataFilters = transformDataFilters(selectedFilters.compass);
      await updateFiltersCompass({
        filters: dataFilters,
        is_starting: false
      });
    }
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__wrapper}>
        <div className={styles.filters__text}>
          Воспользуйтесь фильтром, чтобы посмотреть подборку материалов
        </div>
        <div className={styles.filters__container}>
          <div className={styles.filters__row}>
            {tab === 'engagement' && (
              <FilterEngagement
                data={dataFiltersEngagement.filters}
                dataSelected={selectedFilters.engagement}
                onChange={onChange}
              />
            )}
            {tab === 'compass' && (
              <FilterCompass
                data={dataFiltersCompass.filters}
                dataSelected={selectedFilters.compass}
                onChange={onChange}
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
              // disabled
              // disabled={!selectedTags.length}
              onClick={handleApplyFilters}
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
