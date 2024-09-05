﻿import { useState, useEffect } from 'react';
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
import {
  initialCategoryChart,
  initialKeyResults,
  initialComments
} from 'store/constants';
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

  const [
    updateKeyResults,
    {
      data: dataKeyResults = initialKeyResults,
      isFetching: isFetchingKeyResults
    }
  ] = useLazyGetKeyResultsQuery();
  const [
    getComments,
    { data: dataComments = initialComments, isFetching: isFetchingComments }
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
        data={dataKeyResults.data.negative}
        isLoading={isFetchingKeyResults}
      />
      <Comments data={dataComments.data} isLoading={isFetchingComments} />
      <Zones
        data={dataKeyResults.data.positive}
        isLoading={isFetchingKeyResults}
      />
    </>
  );
};

export default SectionEngagement;
