import { useEffect } from 'react';
import { FilterEngagement } from '../../../Filters';
import EngagementResults from './components/EngagementResults';
import EngagementCategory from './components/EngagementCategory';
import Issues from './components/Issues';
import Zones from './components/Zones';
import CategoryChart from './components/EngagementCategory';
import {
  useLazyGetSpeedDataQuery,
  useLazyGetCategoryDataQuery
} from 'store/apiSlice';
import { initialSpeedChart, initialCategoryChart } from 'store/constants';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { transformDataFilters } from 'helpers';

const SectionEngagement = () => {
  const [updateSpeedChart, { data: dataSpeedChart = initialSpeedChart }] =
    useLazyGetSpeedDataQuery();
  const [
    updateCategoryChart,
    { data: dataCategoryChart = initialCategoryChart }
  ] = useLazyGetCategoryDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );

  useEffect(() => {
    updateSpeedChart({
      filters: []
    });
    updateCategoryChart({ filters: [] });
  }, []);

  const handleApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
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
      <EngagementResults data={dataSpeedChart.data} />
      <EngagementCategory data={dataCategoryChart.data} />
      <Issues />
      <Zones />
    </>
  );
};

export default SectionEngagement;
