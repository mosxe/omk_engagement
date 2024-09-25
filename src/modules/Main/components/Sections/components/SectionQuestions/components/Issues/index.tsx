import { useEffect } from 'react';
import { FilterIssues } from '../../../../../Filters';
import Content from './Content';
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

type Props = {
  isLoading: boolean;
};

const Issues = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.issues
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
  const [getCountRespondent, { data: dataCountRespondent }] =
    useLazyGetCountRespondentCommentProblemQuery();

  useEffect(() => {
    updateIssues({ filters: [] });
  }, []);

  useEffect(() => {
    if (dataCountRespondent?.data !== undefined)
      dispatch(
        updateCountRespondents({
          tab: 'issues',
          data: dataCountRespondent.data
        })
      );
  }, [dataCountRespondent]);

  const handleApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    updateIssues({
      filters: dataFilters
    });
    getCountRespondent({ filters: dataFilters });
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'issues' }));
  };

  const isLoadingBtnApply =
    isLoadingUpdateIssues || isFetchingUpdate || isLoading;
  const isDisabledBtnApply = !hasFilter(selectedFilters);
  const isErrorIssues = isError;

  return (
    <>
      <FilterIssues
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
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
