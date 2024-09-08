import { useState } from 'react';
import Select from 'components/Select';
import Table from 'components/Table';
import FIlterContainer from '../../../../../Filters/FIlterContainer';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  updateResearchZonesFilters,
  clearResearchZonesFilters
} from 'store/filterSlice';
import { useLazyGetResearchZonesCompareQuery } from 'store/apiSlice';
import {
  getFilterOptions,
  getValueSelect,
  transformDataFilters,
  hasFilter
} from 'helpers';
import { toast } from 'react-toastify';
import { Filters, Filter, FilterName, KeyResult } from 'types';
import { OptionChange } from 'components/Select/types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResult[] | undefined;
  dataFilters: Filters[];
  isLoading: boolean;
  isLoadingFilters: boolean;
  isError: boolean;
};

const CompassZones = ({
  data,
  dataFilters,
  isLoading,
  isLoadingFilters,
  isError
}: Props) => {
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selectedFiltersCompare = useAppSelector(
    (state) => state.filters.researchZones
  );
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
  );
  const [
    getResearchZonesCompare,
    {
      data: dataResearcZonesCompare,
      isFetching: isFetchingCompare,
      isError: isErrorCompare
    }
  ] = useLazyGetResearchZonesCompareQuery();

  const onApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataFiltersCompare = transformDataFilters(selectedFiltersCompare);
    setIsShowTable(true);

    try {
      const payload = await getResearchZonesCompare({
        filters: dataFilters,
        filtersCompare: dataFiltersCompare
      }).unwrap();

      if (payload.data === undefined || payload.isError) {
        toast('Произошла ошибка');
      }
    } catch (e) {
      toast('Произошла ошибка');
      console.error(e);
    }
  };

  const onReset = () => {
    dispatch(clearResearchZonesFilters());
  };

  const onChange = (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateResearchZonesFilters(filterValues));
  };

  const isLoadingApplyBtn = isLoading || isFetchingCompare || isLoadingFilters;
  const isDisabledBtnApply = !hasFilter(selectedFiltersCompare);
  const dataTable = isError || data === undefined ? [] : data;
  const dataTableCompare =
    isErrorCompare ||
    dataResearcZonesCompare === undefined ||
    dataResearcZonesCompare.isError
      ? []
      : dataResearcZonesCompare.data;

  return (
    <section className={styles['compass-zones']}>
      <div className={styles['compass-zones__header']}>
        <h2>
          Сильные стороны, выявленные в результате исследования вовлеченности
        </h2>
      </div>
      <div className={styles['compass-zones__wrapper']}>
        <div className={styles['compass-zones__container']}>
          <div className={styles['compass-zones__title']}>
            Зоны развития в подразделениях
          </div>
          <div className={styles['compass-zones__filters']}>
            <FIlterContainer
              onApply={onApply}
              onReset={onReset}
              isLoading={isLoadingApplyBtn}
              isDisabled={isDisabledBtnApply}
              data={selectedFiltersCompare}
              text='Воспользуйтесь фильтром, чтобы сравнить результаты'
            >
              <div>
                <Select
                  options={getFilterOptions(dataFilters, 'subs')}
                  value={getValueSelect(selectedFiltersCompare, 'subs')}
                  onChange={(e) => onChange(e, 'subs')}
                  placeholder='Подразделение/БЕ'
                  width={230}
                  isDisabled={isLoading}
                />
              </div>
              <div>
                <Select
                  options={getFilterOptions(dataFilters, 'year')}
                  onChange={(e) => onChange(e, 'year')}
                  value={getValueSelect(selectedFiltersCompare, 'year')}
                  placeholder='Год'
                  width={140}
                  isDisabled={isLoading}
                />
              </div>
            </FIlterContainer>
          </div>
          <div className={styles['compass-zones__row']}>
            <div>
              <Table data={dataTable} isLoading={isLoading} isSorting={true} />
            </div>
            {isShowTable && (
              <div>
                <Table
                  data={dataTableCompare}
                  isLoading={isLoading || isFetchingCompare}
                  isSorting={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompassZones;
