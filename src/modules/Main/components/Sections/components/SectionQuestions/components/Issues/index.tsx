import { useEffect } from 'react';
import { FilterIssues } from '../../../../../Filters';
import Content from './Content';
import NoData from '../../../../../NoData';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  useLazyGetIssuesQuery,
  useLazyGetCountRespondentCommentProblemQuery
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

const Issues = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.questions
  );
  const respondentsState = useAppSelector(
    (state) => state.filters.respondents.issues
  );

  const [
    updateIssues,
    {
      data,
      isLoading: isLoadingUpdateIssues,
      isFetching: isFetchingUpdate,
      isError
    }
  ] = useLazyGetIssuesQuery();
  const [
    getCountRespondent,
    { data: dataCountRespondent, isFetching: isFetchingCountRespondent }
  ] = useLazyGetCountRespondentCommentProblemQuery();

  const countRespondent =
    respondentsState !== undefined
      ? respondentsState
      : dataCountRespondent?.data ?? 0;

  useEffect(() => {
    getCountRespondent({ filters: [] });
    updateIssues({ filters: [] });
  }, []);

  useEffect(() => {
    if (dataCountRespondent?.data !== undefined) {
      dispatch(
        updateCountRespondents({
          tab: 'issues',
          data: dataCountRespondent.data
        })
      );
    }
  }, [dataCountRespondent]);

  const handleApply = async () => {
    const dataFilters = transformDataFilters(
      selectedFilters,
      undefined,
      'open_question'
    );
    const payloadRespondens = await getCountRespondent({
      filters: dataFilters
    });
    if (
      payloadRespondens.data !== undefined &&
      (payloadRespondens.data.data >= 10 || payloadRespondens.data.isShowAll)
    ) {
      updateIssues({
        filters: dataFilters
      });
    }
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'questions' }));
  };

  const isLoadingBtnApply =
    isLoadingUpdateIssues ||
    isFetchingUpdate ||
    isLoading ||
    isFetchingCountRespondent;
  const isDisabledBtnApply = !hasFilter(selectedFilters);
  const isErrorIssues = isError;

  if (
    respondentsState !== undefined &&
    countRespondent < 10 &&
    !dataCountRespondent?.isShowAll
  ) {
    return (
      <>
        <FilterIssues
          onApply={handleApply}
          onReset={handleReset}
          isLoading={isLoadingBtnApply}
          isDisabled={isDisabledBtnApply}
          countRespondent={countRespondent}
        />
        <div className={styles.section__content}>
          <NoData text='Количество респондентов недостаточно для построения данных' />
        </div>
      </>
    );
  }

  return (
    <>
      <FilterIssues
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
        countRespondent={countRespondent}
      />
      <Content
        data={data?.data}
        isLoading={isLoadingBtnApply}
        isError={isErrorIssues}
      />
    </>
  );
};

export default Issues;
