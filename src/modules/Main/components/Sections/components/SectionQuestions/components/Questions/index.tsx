import { useEffect } from 'react';
import { FilterQuestions } from '../../../../../Filters';
import Content from './Content';
import NoData from '../../../../../NoData';
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
import styles from '../../../../styles.module.scss';

type Props = {
  isLoading: boolean;
};

const Questions = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.questions
  );
  const respondentsState = useAppSelector(
    (state) => state.filters.respondents.questions
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
  const [
    getCountRespondent,
    { data: dataCountRespondent, isFetching: isFetchingCountRespondent }
  ] = useLazyGetCountRespondentOpenQuestionQuery();

  const countRespondent =
    respondentsState !== undefined
      ? respondentsState
      : dataCountRespondent?.data ?? 0;

  useEffect(() => {
    getCountRespondent({ filters: [] });
    updateOpenQuestions({ filters: [] });
  }, []);

  useEffect(() => {
    if (dataCountRespondent?.data !== undefined) {
      dispatch(
        updateCountRespondents({
          tab: 'questions',
          data: dataCountRespondent.data
        })
      );
    }
  }, [dataCountRespondent]);

  const handleApply = async () => {
    const dataFilters = transformDataFilters(
      selectedFilters,
      undefined,
      'problems'
    );
    const payloadRespondens = await getCountRespondent({
      filters: dataFilters
    });
    if (
      payloadRespondens.data !== undefined &&
      (payloadRespondens.data.data >= 10 || payloadRespondens.data.isShowAll)
    ) {
      updateOpenQuestions({
        filters: dataFilters
      });
    }
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'questions' }));
  };

  const isLoadingBtnApply =
    isLoadingUpdateQuestions ||
    isFetchingUpdate ||
    isLoading ||
    isFetchingCountRespondent;

  const isDisabledBtnApply = !hasFilter(selectedFilters);
  const isErrorQuestions = isError;

  if (
    respondentsState !== undefined &&
    countRespondent < 10 &&
    !dataCountRespondent?.isShowAll
  ) {
    return (
      <>
        <FilterQuestions
          onApply={handleApply}
          onReset={handleReset}
          isLoading={isLoadingBtnApply}
          isDisabled={isDisabledBtnApply}
          countRespondent={countRespondent}
        />
        <div className={styles.section__content}>
          <NoData isRespondents />
        </div>
      </>
    );
  }

  return (
    <>
      <FilterQuestions
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
        countRespondent={countRespondent}
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
