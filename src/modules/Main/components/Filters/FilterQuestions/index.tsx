import { useEffect } from 'react';
import Select from 'components/Select';
import TreeSelect, { Node } from 'components/TreeSelect';
import FilterContainer from '../FIlterContainer';
import { OptionChange } from 'components/Select/types';
import { Filter, FilterName } from 'types';
import { FilterProps } from '../index';
import { toast } from 'react-toastify';
import {
  useGetAllFiltersQuestionsDataQuery,
  useLazyGetOrgTreeQuery,
  useGetCountRespondentOpenQuestionQuery
} from 'store/apiSlice';
import { initialFiltersQuestions } from 'store/constants';
import { getFilterOptions, getValueSelect } from 'helpers';
import {
  updateSelectedFilters,
  updateSubs,
  updateSelectedSubs
} from 'store/filterSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import styles from '../styles.module.scss';

const FilterQuestions = ({
  onApply,
  onReset,
  // isLoading,
  isDisabled
}: FilterProps) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.questions
  );
  const subsState = useAppSelector((state) => state.filters.subs.questions);
  const selectedSubs = useAppSelector(
    (state) => state.filters.selectedSubs.questions
  );
  const respondentsState = useAppSelector(
    (state) => state.filters.respondents.questions
  );

  const { data = initialFiltersQuestions, isLoading: isLoadingFilters } =
    useGetAllFiltersQuestionsDataQuery({ filters: [] });
  const [updateOrg, { isLoading: isLoadingOrg }] = useLazyGetOrgTreeQuery();
  const { data: dataCountRespondent } = useGetCountRespondentOpenQuestionQuery({
    filters: []
  });

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
      dispatch(updateSelectedSubs({ tab: 'questions', data: [] }));
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
    dispatch(updateSelectedSubs({ tab: 'questions', data: values }));
    dispatch(updateSelectedFilters({ tab: 'questions', data: filterValues }));
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
        dispatch(updateSubs({ tab: 'questions', data: tempTreeData }));
      }
    } catch (e) {
      toast('Произошла ошибка');
      console.error(e);
    }
  };

  const isLoadingFilter = isLoadingFilters || isLoadingOrg;

  const countRespondentEngagement =
    respondentsState !== undefined
      ? respondentsState
      : dataCountRespondent?.data ?? 0;

  return (
    <FilterContainer
      onApply={onApply}
      onReset={onReset}
      isLoading={isLoadingFilter}
      isDisabled={isDisabled}
      data={selectedFilters}
      text='Воспользуйтесь фильтром, чтобы посмотреть подборку материалов'
      countRespondent={countRespondentEngagement}
    >
      <div className={styles.filters_group}>
        <Select
          options={getFilterOptions(data.data, 'group')}
          defaultValue={getValueSelect(selectedFilters, 'group')}
          value={getValueSelect(selectedFilters, 'group')}
          onChange={(e) => onChange(e, 'group')}
          placeholder='Группа'
          width={180}
          isMulti={false}
        />
      </div>
      <TreeSelect
        data={subsState}
        selectedValue={selectedSubs}
        onLoad={loadData}
        onChange={onChangeTreeSelect}
      />
      <div className={styles.filters_city}>
        <Select
          options={getFilterOptions(data.data, 'city')}
          defaultValue={getValueSelect(selectedFilters, 'city')}
          value={getValueSelect(selectedFilters, 'city')}
          onChange={(e) => onChange(e, 'city')}
          placeholder='Город'
          width={170}
        />
      </div>
      <div className={styles.filters_category}>
        <Select
          options={getFilterOptions(data.data, 'category')}
          defaultValue={getValueSelect(selectedFilters, 'category')}
          value={getValueSelect(selectedFilters, 'category')}
          onChange={(e) => onChange(e, 'category')}
          placeholder='Категория'
          width={160}
        />
      </div>
      <div className={styles.filters_experience}>
        <Select
          options={getFilterOptions(data.data, 'experience')}
          defaultValue={getValueSelect(selectedFilters, 'experience')}
          value={getValueSelect(selectedFilters, 'experience')}
          onChange={(e) => onChange(e, 'experience')}
          placeholder='Стаж работы'
          width={180}
        />
      </div>
      <div className={styles.filters_sex}>
        <Select
          options={getFilterOptions(data.data, 'sex')}
          defaultValue={getValueSelect(selectedFilters, 'sex')}
          value={getValueSelect(selectedFilters, 'sex')}
          onChange={(e) => onChange(e, 'sex')}
          placeholder='Пол'
          width={100}
        />
      </div>
      <div className={styles.filters_open_question}>
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
