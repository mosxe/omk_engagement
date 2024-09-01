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
  useLazyGetFilterEngagementDataQuery,
  useLazyGetKeyResultsQuery,
  useLazyGetCommentsQuery
  // useGetAllFiltersEngagementDataQuery
} from 'store/apiSlice';
import { initialCategoryChart, initialKeyResults } from 'store/constants';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { clearSelectedFilters } from 'store/filterSlice';
import { transformDataFilters, isDisabledBtn } from 'helpers';

const SectionEngagement = () => {
  const [
    updateSpeedChart,
    { data: dataSpeedChart, isFetching: isFetchingSpeedChart }
  ] = useLazyGetSpeedDataQuery();
  const [
    updateCategoryChart,
    {
      data: dataCategoryChart = initialCategoryChart,
      isFetching: isFetchingCategoryChart
    }
  ] = useLazyGetCategoryDataQuery();
  const [updateFiltersEngagement] = useLazyGetFilterEngagementDataQuery();
  const [
    updateKeyResults,
    {
      data: dataKeyResults = initialKeyResults,
      isFetching: isFetchingKeyResults
    }
  ] = useLazyGetKeyResultsQuery();
  const [getComments, { data: dataComments, isFetching: isFetchingComments }] =
    useLazyGetCommentsQuery();

  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );
  const [viewChart, setViewChart] = useState<'doughnut' | 'bar'>('doughnut');

  useEffect(() => {
    updateSpeedChart({
      filters: [],
      random: Math.random()
    });
    updateCategoryChart({ filters: [], random: Math.random() });
    updateKeyResults({ filters: [], random: Math.random() });
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
      filters: dataFilters,
      random: Math.random()
    });
    updateCategoryChart({
      filters: dataFilters,
      random: Math.random()
    });
    updateKeyResults({ filters: dataFilters, random: Math.random() });
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
        view={viewChart}
      />
      <EngagementCategory
        data={dataCategoryChart.data}
        isLoading={isFetchingCategoryChart}
      />
      <Issues
        data={dataKeyResults.data_problems}
        isLoading={isFetchingKeyResults}
      />
      <Comments
        data={dataComments?.issues}
        type='issue'
        isLoading={isFetchingComments}
      />
      <Zones
        data={dataKeyResults.data_zones}
        isLoading={isFetchingKeyResults}
      />
      <Comments
        data={dataComments?.zones}
        type='zone'
        isLoading={isFetchingComments}
      />
    </>
  );
};

export default SectionEngagement;
