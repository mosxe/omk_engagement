import { useEffect } from 'react';
import { FilterCompass } from '../../../Filters';
// import Compass from './components/Compass';
import Results from './components/Results';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  useLazyGetResearchIssuesQuery,
  useLazyGetResearchZonesQuery
} from 'store/apiSlice';
import { clearSelectedFilters } from 'store/filterSlice';
import { initialResearchIssues, initialResearchZones } from 'store/constants';
import { transformDataFilters, isDisabledBtn } from 'helpers';

const SectionCompass = () => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
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
    getResearchIssues({
      filters: dataFilters
    });
    getResearchZones({
      filters: dataFilters
    });
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'compass' }));
  };

  const isLoadingBtnApply = isFetchingIssues || isFetchingZones;

  const isDisabledBtnApply = isDisabledBtn(selectedFilters);

  return (
    <>
      <FilterCompass
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
      />
      {/* <Compass /> */}
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
