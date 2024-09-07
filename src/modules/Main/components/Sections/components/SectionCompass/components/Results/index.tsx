import CompassIssues from '../Issues';
import CompassZones from '../Zones';
import { useGetFiltersCompassResultsQuery } from 'store/apiSlice';
import { initialFiltersCompassResults } from 'store/constants';
import { KeyResult } from 'types';

type Props = {
  dataIssues: KeyResult[] | undefined;
  dataZones: KeyResult[] | undefined;
  isErrorIssues: boolean;
  isErrorZones: boolean;
  isLoadingIssues: boolean;
  isLoadingZones: boolean;
};

const Results = ({
  dataIssues,
  dataZones,
  isErrorIssues,
  isErrorZones,
  isLoadingIssues,
  isLoadingZones
}: Props) => {
  const { data = initialFiltersCompassResults, isLoading: isLoadingFilters } =
    useGetFiltersCompassResultsQuery();

  return (
    <>
      <CompassIssues
        data={dataIssues}
        dataFilters={data.data}
        isLoading={isLoadingIssues}
        isLoadingFilters={isLoadingFilters}
        isError={isErrorIssues}
      />
      <CompassZones
        data={dataZones}
        dataFilters={data.data}
        isLoading={isLoadingZones}
        isLoadingFilters={isLoadingFilters}
        isError={isErrorZones}
      />
    </>
  );
};

export default Results;
