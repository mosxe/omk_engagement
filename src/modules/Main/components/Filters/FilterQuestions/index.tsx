import { useState, useEffect } from 'react';
import Select from 'components/Select';
import TreeSelect, { Node } from 'components/TreeSelect';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { Filter, FilterName, OrgTree } from 'types';
import { FilterProps } from '../index';
import { toast } from 'react-toastify';
import {
  useGetAllFiltersQuestionsDataQuery,
  useLazyGetOrgTreeQuery
} from 'store/apiSlice';
import { initialFiltersQuestions } from 'store/constants';
import {
  getFilterOptions,
  getValueSelect,
  getSelectedValuesTree
} from 'helpers';
import { updateSelectedFilters } from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';

const FilterQuestions = ({
  dataOrg,
  onApply,
  onReset,
  isLoading,
  isDisabled
}: FilterProps) => {
  const { data = initialFiltersQuestions, isLoading: isLoadingFilters } =
    useGetAllFiltersQuestionsDataQuery({ filters: [] });
  const [updateOrg, { isLoading: isLoadingOrg }] = useLazyGetOrgTreeQuery();

  const [treeData, setTreeData] = useState<Node[]>([]);
  const [selectedValue, setSelectedValue] = useState<string[] | OrgTree[]>([]);

  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.questions
  );

  useEffect(() => {
    if (dataOrg !== undefined) {
      const selectedValues = getSelectedValuesTree(dataOrg);
      setTreeData(dataOrg);
      setSelectedValue(selectedValues);
      const tempValues = selectedValues.map((node: OrgTree) => {
        return {
          value: node.value,
          label: ''
        };
      });
      const filterValues = {
        name: 'subs' as const,
        value: tempValues as Filter[]
      };
      dispatch(
        updateSelectedFilters({ tab: 'engagement', data: filterValues })
      );
    }
    // updateOrg(null).then((data) => {
    //   if (data.data?.data) {
    //     const selectedValues = getSelectedValuesTree(data.data.data);
    //     setTreeData(data.data.data);
    //     setSelectedValue(selectedValues);
    //     const tempValues = selectedValues.map((node: OrgTree) => {
    //       return {
    //         value: node.value,
    //         label: ''
    //       };
    //     });
    //     const filterValues = {
    //       name: 'subs' as const,
    //       value: tempValues as Filter[]
    //     };
    //     dispatch(
    //       updateSelectedFilters({ tab: 'engagement', data: filterValues })
    //     );
    //   }
    // });
  }, [dataOrg]);

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
  }, [selectedValue]);

  useEffect(() => {
    const values = getValueSelect(selectedFilters, 'subs');
    if (!values.length && selectedValue.length) {
      setSelectedValue([]);
    }
  }, [selectedFilters]);

  const onChange = async (options: OptionChange, filterName: FilterName) => {
    const filterValues = {
      name: filterName,
      value: options as Filter[]
    };
    dispatch(updateSelectedFilters({ tab: 'questions', data: filterValues }));
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
    dispatch(updateSelectedFilters({ tab: 'questions', data: filterValues }));
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

  const isLoadingFilter = isLoadingFilters || isLoading || isLoadingOrg;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
      text='Воспользуйтесь фильтром, чтобы посмотреть подборку материалов'
    >
      <div>
        <Select
          options={getFilterOptions(data.data, 'group')}
          defaultValue={getValueSelect(selectedFilters, 'group')}
          value={getValueSelect(selectedFilters, 'group')}
          onChange={(e) => onChange(e, 'group')}
          placeholder='Группа'
          width={180}
        />
      </div>
      <TreeSelect
        data={treeData}
        selectedValue={selectedValue}
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
          width={170}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'category')}
          defaultValue={getValueSelect(selectedFilters, 'category')}
          value={getValueSelect(selectedFilters, 'category')}
          onChange={(e) => onChange(e, 'category')}
          placeholder='Категория'
          width={160}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'sex')}
          defaultValue={getValueSelect(selectedFilters, 'sex')}
          value={getValueSelect(selectedFilters, 'sex')}
          onChange={(e) => onChange(e, 'sex')}
          placeholder='Пол'
          width={100}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'experience')}
          defaultValue={getValueSelect(selectedFilters, 'experience')}
          value={getValueSelect(selectedFilters, 'experience')}
          onChange={(e) => onChange(e, 'experience')}
          placeholder='Стаж работы'
          width={180}
        />
      </div>
      <div>
        <Select
          options={getFilterOptions(data.data, 'open_question')}
          defaultValue={getValueSelect(selectedFilters, 'open_question')}
          value={getValueSelect(selectedFilters, 'open_question')}
          onChange={(e) => onChange(e, 'open_question')}
          placeholder='Открытый вопрос'
          width={340}
        />
      </div>
    </FilterContainer>
  );
};

export default FilterQuestions;
