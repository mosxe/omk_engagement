import { FilterEngagement } from '../../../Filters';
import EngagementResults from './components/EngagementResults';
import CategoryChart from './components/CategoryChart';
import { useLazyGetSpeedDataQuery } from 'store/apiSlice';
import { initialSpeedChart } from 'store/constants';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { transformDataFilters } from 'helpers';

const SectionEngagement = () => {
  const [updateSpeedChart, { data: dataSpeedChart = initialSpeedChart }] =
    useLazyGetSpeedDataQuery();
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );

  const handleApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
    await updateSpeedChart({
      filters: dataFilters
    });
  };

  const handleReset = () => {
    console.log('handleReset');
  };

  return (
    <>
      <FilterEngagement onApply={handleApply} onReset={handleReset} />
      <EngagementResults />
      {/* <CategoryChart /> */}
    </>
  );
};

export default SectionEngagement;
