import CompassIssues from '../Issues';
import CompassZones from '../Zones';
import { useGetFiltersCompassResultsQuery } from 'store/apiSlice';
import { initialFiltersCompassResults } from 'store/constants';

const Results = () => {
  const { data = initialFiltersCompassResults, isLoading } =
    useGetFiltersCompassResultsQuery();

  return (
    <>
      <CompassIssues data={data.data} isLoading={isLoading} />
      <CompassZones data={data.data} isLoading={isLoading} />
    </>
  );
};

export default Results;
