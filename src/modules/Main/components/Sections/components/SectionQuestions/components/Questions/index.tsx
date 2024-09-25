import { useEffect } from 'react';
import { FilterQuestions } from '../../../../../Filters';
import Content from './Content';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  useLazyGetOpenQuestionsQuery,
  useLazyGetCountRespondentOpenQuestionQuery
} from 'store/apiSlice';
import {
  clearSelectedFilters,
  updateCountRespondents
} from 'store/filterSlice';
import { transformDataFilters, hasFilter } from 'helpers';

type Props = {
  isLoading: boolean;
};

const Questions = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.questions
  );

  const [
    updateOpenQuestions,
    {
      data,
      isLoading: isLoadingUpdateQuestions,
      isFetching: isFetchingUpdate,
      isError
    }
  ] = useLazyGetOpenQuestionsQuery();
  const [getCountRespondent, { data: dataCountRespondent }] =
    useLazyGetCountRespondentOpenQuestionQuery();

  useEffect(() => {
    updateOpenQuestions({ filters: [] });
  }, []);

  useEffect(() => {
    if (dataCountRespondent?.data !== undefined)
      dispatch(
        updateCountRespondents({
          tab: 'questions',
          data: dataCountRespondent.data
        })
      );
  }, [dataCountRespondent]);

  const handleApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    updateOpenQuestions({
      filters: dataFilters
    });
    getCountRespondent({ filters: dataFilters });
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'questions' }));
  };

  const isLoadingBtnApply =
    isLoadingUpdateQuestions || isFetchingUpdate || isLoading;

  const isDisabledBtnApply = !hasFilter(selectedFilters);
  const isErrorQuestions = isError;

  return (
    <>
      <FilterQuestions
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
      />
      <Content
        data={data?.data}
        isLoading={isLoadingBtnApply}
        isError={isErrorQuestions}
      />
    </>
  );
};

export default Questions;
