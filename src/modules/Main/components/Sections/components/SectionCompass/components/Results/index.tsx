import CompassIssues from '../Issues';
import CompassZones from '../Zones';
import { useGetFiltersCompassResultsQuery } from 'store/apiSlice';
import { initialFiltersCompassResults } from 'store/constants';

const Results = () => {
  const { data = initialFiltersCompassResults, isLoading } =
    useGetFiltersCompassResultsQuery();

  return (
    <>
      <CompassIssues data={data.filters} isLoading={isLoading} />
      <CompassZones data={data.filters} isLoading={isLoading} />
    </>
  );
};

export default Results;
