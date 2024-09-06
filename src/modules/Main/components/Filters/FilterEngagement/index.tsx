import { useState, useEffect } from 'react';
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
import { updateSelectedFilters } from 'store/filterSlice';
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

  const [updateOrg, { isLoading: isLoadingOrg }] = useLazyGetOrgTreeQuery();

  const {
    data = initialFiltersEngagement,
    isLoading: isLoadingFilters
  } = useGetAllFiltersEngagementDataQuery({ filters: [] });

  const [treeData, setTreeData] = useState<Node[]>([]);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  useEffect(() => {
    updateOrg(null).then((data) => {
      if (data.data?.data) {
        setTreeData(data.data.data);
      }
    });
  }, []);

  const onChange = (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
  };

  const onChangeTreeSelect = (values: string[]) => {
    setSelectedValue(values);
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
    dispatch(updateSelectedFilters({ tab: 'engagement', data: filterValues }));
  };

  const loadData = async (treeNode: Node) => {
    try {
      const payload = await updateOrg(String(treeNode.value)).unwrap();
      if (payload.data === undefined || payload.isError) {
        toast('Произошла ошибка');
      } else {
        const tempTreeData = treeData.map((node) => {
          const tempNode = { ...node };
          if (tempNode.value === treeNode.value) {
            tempNode.children = payload.data;
          }
          return tempNode;
        });
        setTreeData(tempTreeData);
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
      <Select
        options={getFilterOptions(data.data, 'group')}
        defaultValue={getValueSelect(selectedFilters, 'group')}
        onChange={(e) => onChange(e, 'group')}
        value={getValueSelect(selectedFilters, 'group')}
        placeholder='Группа'
        width={300}
        isDisabled={isLoadingFilter}
      />
      <TreeSelect
        data={treeData}
        selectedValue={selectedValue}
        onLoad={loadData}
        onChange={onChangeTreeSelect}
      />
      <Select
        options={getFilterOptions(data.data, 'city')}
        defaultValue={getValueSelect(selectedFilters, 'city')}
        onChange={(e) => onChange(e, 'city')}
        value={getValueSelect(selectedFilters, 'city')}
        placeholder='Город'
        width={200}
        isDisabled={isLoadingFilter}
      />
    </FilterContainer>
  );
};

export default FilterEngagement;
