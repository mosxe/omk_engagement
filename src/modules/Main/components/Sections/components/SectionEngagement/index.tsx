import { useState, useEffect } from 'react';
import { FilterEngagement } from '../../../Filters';
import EngagementResults from './components/EngagementResults';
import EngagementCategory from './components/EngagementCategory';
import Issues from './components/Issues';
import Zones from './components/Zones';
import Comments from './components/Comments';
import {
  useLazyGetSpeedDataQuery,
  useLazyGetCategoryDataQuery,
  useLazyGetKeyResultsQuery,
  useLazyGetCommentsQuery
} from 'store/apiSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { clearSelectedFilters } from 'store/filterSlice';
import { transformDataFilters, isDisabledBtn } from 'helpers';

const SectionEngagement = () => {
  const [
    updateSpeedChart,
    {
      data: dataSpeedChart,
      isFetching: isFetchingSpeedChart,
      isError: isErrorSpeedChart
    }
  ] = useLazyGetSpeedDataQuery();
  const [
    updateCategoryChart,
    {
      data: dataCategoryChart,
      isFetching: isFetchingCategoryChart,
      isError: isErrorCategoryChart
    }
  ] = useLazyGetCategoryDataQuery();

  const [
    updateKeyResults,
    {
      data: dataKeyResults,
      isFetching: isFetchingKeyResults,
      isError: isErrorKeyResults
    }
  ] = useLazyGetKeyResultsQuery();
  const [
    getComments,
    {
      data: dataComments,
      isFetching: isFetchingComments,
      isError: isErrorComments
    }
  ] = useLazyGetCommentsQuery();

  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );
  const [viewChart, setViewChart] = useState<'doughnut' | 'bar'>('doughnut');

  useEffect(() => {
    updateSpeedChart({
      filters: []
    });
    updateCategoryChart({ filters: [] });
    updateKeyResults({ filters: [] });
    getComments({ filters: [] });
  }, []);

  const handleApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const filterSubs = selectedFilters.find((filter) => filter.name === 'subs');
    const viewChart =
      filterSubs !== undefined && filterSubs.value.length > 1
        ? 'bar'
        : 'doughnut';
    setViewChart(viewChart);

    updateSpeedChart({
      filters: dataFilters
    });
    updateCategoryChart({
      filters: dataFilters
    });
    updateKeyResults({ filters: dataFilters });
    getComments({ filters: dataFilters });
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'engagement' }));
  };

  const isLoadingBtnApply =
    isFetchingSpeedChart ||
    isFetchingCategoryChart ||
    isFetchingKeyResults ||
    isFetchingComments;

  const isDisabledBtnApply = isDisabledBtn(selectedFilters);
  console.log(dataKeyResults);

  return (
    <>
      <FilterEngagement
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
      />
      <EngagementResults
        data={dataSpeedChart?.data}
        isLoading={isFetchingSpeedChart}
        isError={dataSpeedChart?.isError || isErrorSpeedChart}
        view={viewChart}
      />
      <EngagementCategory
        data={dataCategoryChart?.data}
        isLoading={isFetchingCategoryChart}
        isError={dataCategoryChart?.isError || isErrorCategoryChart}
      />
      <Issues
        data={dataKeyResults?.data.negative}
        year={dataKeyResults?.year}
        isLoading={isFetchingKeyResults}
        isError={dataKeyResults?.isError || isErrorKeyResults}
      />
      <Comments
        data={dataComments?.data}
        isLoading={isFetchingComments}
        isError={dataComments?.isError || isErrorComments}
      />
      <Zones
        data={dataKeyResults?.data.positive}
        isLoading={isFetchingKeyResults}
        isError={dataKeyResults?.isError || isErrorKeyResults}
      />
    </>
  );
};

export default SectionEngagement;
