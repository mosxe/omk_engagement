import { useEffect, useState } from 'react';
import Select from 'components/Select';
import Table from 'components/Table';
import FIlterContainer from '../../../../../Filters/FIlterContainer';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  updateResearchZonesFilters,
  clearResearchZonesFilters
} from 'store/filterSlice';
import { useLazyGetResearchZonesQuery } from 'store/apiSlice';
import { initialResearchZones } from 'store/constants';
import {
  getFilterOptions,
  getValueSelect,
  transformDataFilters,
  isDisabledBtn
} from 'helpers';
import { Filters, Filter, FilterName } from 'types';
import { OptionChange } from 'components/Select/types';
import styles from './styles.module.scss';

type Props = {
  data: Filters[];
  isLoading: boolean;
};

const CompassZones = ({ data, isLoading }: Props) => {
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.researchZones
  );
  const [
    getResearchZones,
    { data: dataResearchIssues = initialResearchZones, isFetching }
  ] = useLazyGetResearchZonesQuery();

  useEffect(() => {
    getResearchZones({ filters: [] });
  }, []);

  const onApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const hasFilters = isDisabledBtn(selectedFilters);
    getResearchZones({ filters: dataFilters });

    if (!hasFilters) {
      setIsShowTable(true);
    }
  };

  const onReset = () => {
    dispatch(clearResearchZonesFilters());
    setIsShowTable(false);
  };

  const onChange = (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateResearchZonesFilters(filterValues));
  };

  const isLoadingApplyBtn = isLoading || isFetching;
  const isDisabledBtnApply = isDisabledBtn(selectedFilters);

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
              data={selectedFilters}
              text='Воспользуйтесь фильтром, чтобы сравнить результаты'
            >
              <Select
                options={getFilterOptions(data, 'year')}
                onChange={(e) => onChange(e, 'year')}
                value={getValueSelect(selectedFilters, 'year')}
                placeholder='Год'
                width={140}
                isDisabled={isLoading}
              />
            </FIlterContainer>
          </div>
          <div className={styles['compass-zones__row']}>
            <div>
              <Table
                data={dataResearchIssues.data.main}
                isLoading={isFetching}
                isSorting={true}
              />
            </div>
            {isShowTable && (
              <div>
                <Table
                  data={dataResearchIssues.data.main}
                  isLoading={isFetching}
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
