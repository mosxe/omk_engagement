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
  useLazyGetKeyResultsQuery
} from 'store/apiSlice';
import {
  initialSpeedChart,
  initialCategoryChart,
  initialKeyResults
} from 'store/constants';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { clearSelectedFilters } from 'store/filterSlice';
import { transformDataFilters } from 'helpers';

const SectionEngagement = () => {
  const [
    updateSpeedChart,
    {
      data: dataSpeedChart = initialSpeedChart,
      isFetching: isFetchingSpeedChart
    }
  ] = useLazyGetSpeedDataQuery();
  const [
    updateCategoryChart,
    {
      data: dataCategoryChart = initialCategoryChart,
      isFetching: isFetchingCategoryChart
    }
  ] = useLazyGetCategoryDataQuery();
  const [updateFiltersEngagement, { isFetching }] =
    useLazyGetFilterEngagementDataQuery();
  const [
    updateKeyResults,
    {
      data: dataKeyResults = initialKeyResults,
      isFetching: isFetchingKeyResults
    }
  ] = useLazyGetKeyResultsQuery();

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
  }, []);

  const handleApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const filterSubs = selectedFilters.find((filter) => filter.name === 'subs');
    const viewChart =
      filterSubs !== undefined && filterSubs.value.length > 1
        ? 'bar'
        : 'doughnut';
    setViewChart(viewChart);

    await updateSpeedChart({
      filters: dataFilters
    });
    await updateCategoryChart({
      filters: dataFilters
    });
  };

  const handleReset = () => {
    console.log('handleReset');
    dispatch(clearSelectedFilters({ tab: 'engagement' }));
    updateFiltersEngagement({ filters: [], is_starting: false });
  };

  return (
    <>
      <FilterEngagement
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isFetching}
      />
      <EngagementResults
        data={dataSpeedChart.data}
        isLoading={isFetchingSpeedChart}
        view={viewChart}
      />
      <EngagementCategory
        data={dataCategoryChart.data}
        isLoading={true}
        // isLoading={isFetchingCategoryChart}
      />
      <Issues
        data={dataKeyResults.data_problems}
        isLoading={isFetchingKeyResults}
      />
      <Comments type='issue' />
      <Zones
        data={dataKeyResults.data_zones}
        isLoading={isFetchingKeyResults}
      />
      <Comments type='zone' />
    </>
  );
};

export default SectionEngagement;
