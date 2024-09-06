import { useEffect, useState } from 'react';
import Select from 'components/Select';
import Table from 'components/Table';
// import TreeSelect, { Node } from 'components/TreeSelect';
import FIlterContainer from '../../../../../Filters/FIlterContainer';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  updateResearchIssuesFilters,
  clearResearchIssuesFilters
} from 'store/filterSlice';
import { useLazyGetResearchIssuesQuery } from 'store/apiSlice';
import { initialResearchIssues } from 'store/constants';
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

const CompassIssues = ({ data, isLoading }: Props) => {
  const [isShowTable, setIsShowTable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.researchIssues
  );
  const [
    getResearchIssues,
    { data: dataResearchIssues = initialResearchIssues, isFetching }
  ] = useLazyGetResearchIssuesQuery();

  // const [treeData, setTreeData] = useState<Node[]>([
  //   {
  //     key: 1,
  //     value: 1,
  //     title: 'Node 1',
  //     children: [],
  //     isLeaf: true
  //   },
  //   {
  //     key: 2,
  //     value: 2,
  //     title: 'Node 2',
  //     children: [],
  //     isLeaf: false
  //   }
  // ]);
  // const [selectedValue, setSelectedValue] = useState<string | undefined>(
  //   undefined
  // );

  useEffect(() => {
    getResearchIssues({ filters: [] });
  }, []);

  const onApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const hasFilters = isDisabledBtn(selectedFilters);
    getResearchIssues({ filters: dataFilters });

    if (!hasFilters) {
      setIsShowTable(true);
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

  const isLoadingApplyBtn = isLoading || isFetching;
  const isDisabledBtnApply = isDisabledBtn(selectedFilters);

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
              // isLoading={false}
              isLoading={isLoadingApplyBtn}
              isDisabled={isDisabledBtnApply}
              data={selectedFilters}
              text='Воспользуйтесь фильтром, чтобы сравнить результаты'
            >
              {/* <TreeSelect
                data={treeData}
                selectedValue={selectedValue}
                onLoad={loadData}
                onChange={onChangeTreeSelect}
              /> */}
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
          <div className={styles['compass-issues__row']}>
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

export default CompassIssues;
