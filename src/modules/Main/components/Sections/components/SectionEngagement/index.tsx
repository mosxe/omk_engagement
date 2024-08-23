import { useState, useEffect } from 'react';
import { FilterEngagement } from '../../../Filters';
import EngagementResults from './components/EngagementResults';
import EngagementCategory from './components/EngagementCategory';
import Issues from './components/Issues';
import Zones from './components/Zones';
import Comments from './components/Comments';
import CategoryChart from './components/EngagementCategory';
import {
  useLazyGetSpeedDataQuery,
  useLazyGetCategoryDataQuery
} from 'store/apiSlice';
import { initialSpeedChart, initialCategoryChart } from 'store/constants';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { transformDataFilters } from 'helpers';

const SectionEngagement = () => {
  const [
    updateSpeedChart,
    { data: dataSpeedChart = initialSpeedChart, isLoading: isLoadingSpeedChart }
  ] = useLazyGetSpeedDataQuery();
  const [
    updateCategoryChart,
    { data: dataCategoryChart = initialCategoryChart }
  ] = useLazyGetCategoryDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );
  const [viewChart, setViewChart] = useState<'doughnut' | 'bar'>('bar');

  console.log(selectedFilters);

  useEffect(() => {
    updateSpeedChart({
      filters: []
    });
    updateCategoryChart({ filters: [] });
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
  };

  return (
    <>
      <FilterEngagement onApply={handleApply} onReset={handleReset} />
      <EngagementResults
        data={dataSpeedChart.data}
        isLoading={isLoadingSpeedChart}
        view={viewChart}
      />
      <EngagementCategory data={dataCategoryChart.data} />
      <Issues />
      <Comments />
      <Zones />
      <Comments />
    </>
  );
};

export default SectionEngagement;
