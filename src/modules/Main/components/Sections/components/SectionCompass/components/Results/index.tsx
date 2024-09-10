import CompassIssues from '../Issues';
import CompassZones from '../Zones';
import { useGetFiltersCompassResultsQuery } from 'store/apiSlice';
import { initialFiltersCompassResults } from 'store/constants';
import { KeyResult } from 'types';

type Props = {
  dataIssues: KeyResult[] | undefined;
  dataIssuesCompare: KeyResult[] | undefined;
  dataZones: KeyResult[] | undefined;
  dataZonesCompare: KeyResult[] | undefined;
  isErrorIssues: boolean;
  isErrorIssuesCompare: boolean;
  isErrorZones: boolean;
  isErrorZonesCompare: boolean;
  isLoadingIssues: boolean;
  isLoadingZones: boolean;
  onApplyIssuesCompare: () => Promise<any>;
  onApplyZonesCompare: () => Promise<any>;
  isFetchingIssuesCompare: boolean;
  isFetchingZonesCompare: boolean;
};

const Results = ({
  dataIssues,
  dataIssuesCompare,
  isErrorIssuesCompare,
  dataZones,
  dataZonesCompare,
  isErrorIssues,
  isErrorZones,
  isErrorZonesCompare,
  isLoadingIssues,
  isLoadingZones,
  onApplyIssuesCompare,
  onApplyZonesCompare,
  isFetchingIssuesCompare,
  isFetchingZonesCompare
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
        dataCompare={dataIssuesCompare}
        isErrorCompare={isErrorIssuesCompare}
        onApplyCompare={onApplyIssuesCompare}
        isFetchingCompare={isFetchingIssuesCompare}
      />
      <CompassZones
        data={dataZones}
        dataFilters={data.data}
        isLoading={isLoadingZones}
        isLoadingFilters={isLoadingFilters}
        isError={isErrorZones}
        dataCompare={dataZonesCompare}
        isErrorCompare={isErrorZonesCompare}
        onApplyCompare={onApplyZonesCompare}
        isFetchingCompare={isFetchingZonesCompare}
      />
    </>
  );
};

export default Results;
