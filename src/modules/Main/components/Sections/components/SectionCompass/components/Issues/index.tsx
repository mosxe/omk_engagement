import Select from 'components/Select';
import Table from 'components/Table';
import FIlterContainer from '../../../../../Filters/FIlterContainer';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  updateResearchIssuesFilters,
  clearResearchIssuesFilters
} from 'store/filterSlice';
import { getFilterOptions, getValueSelect, hasFilter } from 'helpers';
import { Filters, Filter, FilterName, KeyResult } from 'types';
import { OptionChange } from 'components/Select/types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResult[] | undefined;
  dataCompare: KeyResult[] | undefined;
  dataFilters: Filters[];
  isLoading: boolean;
  isLoadingFilters: boolean;
  isError: boolean;
  isErrorCompare: boolean;
  isFetchingCompare: boolean;
  onApplyCompare: () => Promise<any>;
};

const CompassIssues = ({
  data,
  dataCompare,
  dataFilters,
  isLoading,
  isLoadingFilters,
  isFetchingCompare,
  isError,
  isErrorCompare,
  onApplyCompare
}: Props) => {
  const dispatch = useAppDispatch();
  const selectedFiltersCompare = useAppSelector(
    (state) => state.filters.researchIssues
  );
  const isShowTable = useAppSelector(
    (state) => state.filters.researchTable.issues
  );

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
  const isDisabledBtnApply = !hasFilter(selectedFiltersCompare);
  const dataTable = isError || data === undefined ? [] : data;

  const dataTableCompare =
    isErrorCompare || dataCompare === undefined ? [] : dataCompare;

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
              onApply={onApplyCompare}
              onReset={onReset}
              isLoading={isLoadingApplyBtn}
              isDisabled={isDisabledBtnApply}
              data={selectedFiltersCompare}
              text='Воспользуйтесь фильтром, чтобы сравнить результаты'
              isRow={true}
              countRespondent={0}
              isShowCountRespondent={false}
            >
              <div className={styles['compass-issues__subs']}>
                <Select
                  options={getFilterOptions(dataFilters, 'subs')}
                  value={getValueSelect(selectedFiltersCompare, 'subs')}
                  onChange={(e) => onChange(e, 'subs')}
                  placeholder='Подразделение/БЕ'
                  width={230}
                  isDisabled={isLoading}
                />
              </div>
              <div className={styles['compass-issues__year']}>
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
