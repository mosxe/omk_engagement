import { useEffect } from 'react';
import { FilterCompass } from '../../../Filters';
import Results from './components/Results';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  useLazyGetResearchIssuesQuery,
  useLazyGetResearchZonesQuery,
  useLazyGetResearchIssuesCompareQuery,
  useLazyGetResearchZonesCompareQuery
} from 'store/apiSlice';
import { clearSelectedFilters } from 'store/filterSlice';
import { initialResearchIssues, initialResearchZones } from 'store/constants';
import { transformDataFilters, hasFilter } from 'helpers';
import { OrgTree } from 'types';

type Props = {
  dataOrg: OrgTree[] | undefined;
  isLoading: boolean;
};

const SectionCompass = ({ dataOrg, isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
  );
  const selectedFiltersIssuesCompare = useAppSelector(
    (state) => state.filters.researchIssues
  );
  const selectedFiltersZonesCompare = useAppSelector(
    (state) => state.filters.researchZones
  );
  const [
    getResearchIssues,
    {
      data: dataResearchIssues = initialResearchIssues,
      isFetching: isFetchingIssues,
      isError: isErrorIssues
    }
  ] = useLazyGetResearchIssuesQuery();
  const [
    getResearchZones,
    {
      data: dataResearchZones = initialResearchZones,
      isFetching: isFetchingZones,
      isError: isErrorZones
    }
  ] = useLazyGetResearchZonesQuery();

  const [getResearchIssuesCompare] = useLazyGetResearchIssuesCompareQuery();
  const [getResearchZonesCompare] = useLazyGetResearchZonesCompareQuery();

  useEffect(() => {
    getResearchIssues({
      filters: []
    });
    getResearchZones({
      filters: []
    });
  }, []);

  const handleApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataIssuesCompareFilters = hasFilter(selectedFiltersIssuesCompare);
    const dataZonesCompareFilters = hasFilter(selectedFiltersZonesCompare);

    getResearchIssues({
      filters: dataFilters
    });
    getResearchZones({
      filters: dataFilters
    });

    if (dataIssuesCompareFilters) {
      const dataIssuesTransformFilters = transformDataFilters(
        selectedFiltersIssuesCompare
      );
      getResearchIssuesCompare({
        filters: dataFilters,
        filtersCompare: dataIssuesTransformFilters
      });
    }

    if (dataZonesCompareFilters) {
      const dataZonesTransformFilters = transformDataFilters(
        selectedFiltersZonesCompare
      );
      getResearchZonesCompare({
        filters: dataFilters,
        filtersCompare: dataZonesTransformFilters
      });
    }
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'compass' }));
  };

  const isLoadingBtnApply = isFetchingIssues || isFetchingZones;
  const isDisabledBtnApply = !hasFilter(selectedFilters);

  return (
    <>
      <FilterCompass
        dataOrg={dataOrg}
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
      />
      <Results
        dataIssues={dataResearchIssues?.data}
        dataZones={dataResearchZones?.data}
        isErrorIssues={dataResearchIssues?.isError || isErrorIssues}
        isErrorZones={dataResearchZones?.isError || isErrorZones}
        isLoadingIssues={isFetchingIssues}
        isLoadingZones={isFetchingZones}
      />
    </>
  );
};

export default SectionCompass;
