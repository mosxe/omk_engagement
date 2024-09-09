import { useEffect } from 'react';
import { FilterIssues } from '../../../../../Filters';
import Content from './Content';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useLazyGetIssuesQuery } from 'store/apiSlice';
import { clearSelectedFilters } from 'store/filterSlice';
import { transformDataFilters, hasFilter } from 'helpers';
import { OrgTree } from 'types';

type Props = {
  dataOrg: OrgTree[] | undefined;
  isLoading: boolean;
};

const Issues = ({ dataOrg, isLoading }: Props) => {
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

  const isLoadingBtnApply = isLoadingUpdateIssues || isFetchingUpdate;
  const isDisabledBtnApply = !hasFilter(selectedFilters);
  const isErrorIssues = isError;
  const isLoadingIssues = isLoadingUpdateIssues || isFetchingUpdate;

  return (
    <>
      <FilterIssues
        dataOrg={dataOrg}
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
      />
      <Content
        data={data?.data}
        isLoading={isLoadingIssues}
        isError={isErrorIssues}
      />
    </>
  );
};

export default Issues;
