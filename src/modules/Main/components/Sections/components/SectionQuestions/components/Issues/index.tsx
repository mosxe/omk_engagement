import { useEffect } from 'react';
import { FilterIssues } from '../../../../../Filters';
import Content from './Content';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useLazyGetIssuesQuery } from 'store/apiSlice';
import { clearSelectedFilters } from 'store/filterSlice';
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

  useEffect(() => {
    updateIssues({ filters: [] });
  }, []);

  const handleApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    updateIssues({
      filters: dataFilters
    });
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
