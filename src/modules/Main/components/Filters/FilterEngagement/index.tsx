import { useEffect } from 'react';
import { toast } from 'react-toastify';
import TreeSelect, { Node } from 'components/TreeSelect';
import Select from 'components/Select';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { FilterName, Filter } from 'types';
import { FilterProps } from '../index';
import { getFilterOptions, getValueSelect } from 'helpers';
import { initialFiltersEngagement } from 'store/constants';
import {
  useLazyGetOrgTreeQuery,
  useGetAllFiltersEngagementDataQuery
} from 'store/apiSlice';
import {
  updateSelectedFilters,
  updateSubs,
  updateSelectedSubs
} from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

const FilterEngagement = ({
  onApply,
  onReset,
  isLoading,
  isDisabled
}: FilterProps) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );
  const subsState = useAppSelector((state) => state.filters.subs.engagement);
  const selectedSubs = useAppSelector(
    (state) => state.filters.selectedSubs.engagement
  );

  const [updateOrg, { isLoading: isLoadingOrg }] = useLazyGetOrgTreeQuery();
  const { data = initialFiltersEngagement, isLoading: isLoadingFilters } =
    useGetAllFiltersEngagementDataQuery({ filters: [] });

  useEffect(() => {
    const labels = document.querySelectorAll(
      '.rc-tree-select-selection-overflow .rc-tree-select-selection-overflow-item'
    );
    labels.forEach((node, index) => {
      if (labels.length - 1 !== index) {
        const textElem = node.querySelector(
          '.rc-tree-select-selection-item'
        ) as HTMLElement;
        if (textElem) {
          const title = textElem.getAttribute('title') as string;
          textElem.innerText =
            labels.length < 3 || labels.length - 2 === index
              ? title
              : title + ',';
        }
      }
    });
  }, [selectedSubs]);

  useEffect(() => {
    const values = getValueSelect(selectedFilters, 'subs');
    if (!values.length && selectedSubs.length) {
      dispatch(updateSelectedSubs({ tab: 'engagement', data: [] }));
    }
  }, [selectedFilters]);

  const onChange = (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
  };

  const onChangeTreeSelect = (values: string[]) => {
    const tempValues = values.map((val: string) => {
      return {
        value: val,
        label: ''
      };
    });
    const filterValues = {
      name: 'subs' as const,
      value: tempValues as Filter[]
    };
    dispatch(updateSelectedSubs({ tab: 'engagement', data: values }));
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
  };

  const loadData = async (treeNode: Node) => {
    try {
      const payload = await updateOrg(String(treeNode.value)).unwrap();
      if (payload.data === undefined || payload.isError) {
        toast('Произошла ошибка');
      } else {
        const tempTreeData = subsState.map((node) => {
          const tempNode = { ...node };
          if (tempNode.value === treeNode.value) {
            tempNode.children = payload.data;
          }
          return tempNode;
        });
        dispatch(updateSubs({ tab: 'engagement', data: tempTreeData }));
      }
    } catch (e) {
      toast('Произошла ошибка');
      console.error(e);
    }
  };

  const isLoadingFilter = isLoadingFilters || isLoadingOrg || isLoading;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
      text='Воспользуйтесь фильтром, чтобы посмотреть подборку материалов'
    >
      <div style={{ width: '200px' }}>
        <Select
          options={getFilterOptions(data.data, 'group')}
          defaultValue={getValueSelect(selectedFilters, 'group')}
          value={getValueSelect(selectedFilters, 'group')}
          onChange={(e) => onChange(e, 'group')}
          placeholder='Группа'
          isDisabled={isLoadingFilter}
        />
      </div>
      <TreeSelect
        data={subsState}
        selectedValue={selectedSubs}
        onLoad={loadData}
        onChange={onChangeTreeSelect}
      />
      <div>
        <Select
          options={getFilterOptions(data.data, 'city')}
          defaultValue={getValueSelect(selectedFilters, 'city')}
          value={getValueSelect(selectedFilters, 'city')}
          onChange={(e) => onChange(e, 'city')}
          placeholder='Город'
          width={200}
          isDisabled={isLoadingFilter}
        />
      </div>
    </FilterContainer>
  );
};

export default FilterEngagement;
