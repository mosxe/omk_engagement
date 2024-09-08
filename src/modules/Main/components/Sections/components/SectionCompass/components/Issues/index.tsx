import { useState } from 'react';
import Select from 'components/Select';
import Table from 'components/Table';
import FIlterContainer from '../../../../../Filters/FIlterContainer';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  updateResearchIssuesFilters,
  clearResearchIssuesFilters
} from 'store/filterSlice';
import { useLazyGetResearchIssuesCompareQuery } from 'store/apiSlice';
import {
  getFilterOptions,
  getValueSelect,
  transformDataFilters,
  isDisabledBtn
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

const CompassIssues = ({
  data,
  dataFilters,
  isLoading,
  isLoadingFilters,
  isError
}: Props) => {
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selectedFiltersCompare = useAppSelector(
    (state) => state.filters.researchIssues
  );
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
  );
  const [
    getResearchIssuesCompare,
    {
      data: dataResearchIssuesCompare,
      isFetching: isFetchingCompare,
      isError: isErrorCompare
    }
  ] = useLazyGetResearchIssuesCompareQuery();

  const onApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataFiltersCompare = transformDataFilters(selectedFiltersCompare);
    setIsShowTable(true);

    try {
      const payload = await getResearchIssuesCompare({
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
    dispatch(clearResearchIssuesFilters());
  };

  const onChange = (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateResearchIssuesFilters(filterValues));
  };

  const isLoadingApplyBtn = isLoading || isFetchingCompare || isLoadingFilters;
  const isDisabledBtnApply = isDisabledBtn(selectedFiltersCompare);
  const dataTable = isError || data === undefined ? [] : data;
  const dataTableCompare =
    isErrorCompare ||
    dataResearchIssuesCompare === undefined ||
    dataResearchIssuesCompare.isError
      ? []
      : dataResearchIssuesCompare.data;

  return (
    <section className={styles['compass-issues']}>
      <div className={styles['compass-issues__header']}>
        <h2>Проблематика, выявленная в результате исследования</h2>
      </div>
      <div className={styles['compass-issues__wrapper']}>
        <div className={styles['compass-issues__container']}>
          <div className={styles['compass-issues__title']}>
            Зоны развития в подразделениях
          </div>
          <div className={styles['compass-issues__filters']}>
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
          <div className={styles['compass-issues__row']}>
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

export default CompassIssues;
