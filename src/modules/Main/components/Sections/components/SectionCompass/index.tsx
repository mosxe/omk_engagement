import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FilterCompass } from '../../../Filters';
import Results from './components/Results';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  useLazyGetResearchIssuesQuery,
  useLazyGetResearchZonesQuery,
  useLazyGetResearchIssuesCompareQuery,
  useLazyGetResearchZonesCompareQuery
} from 'store/apiSlice';
import {
  clearSelectedFilters,
  changeShowResearchTable
} from 'store/filterSlice';
import { initialResearchIssues, initialResearchZones } from 'store/constants';
import { transformDataFilters, hasFilter } from 'helpers';

type Props = {
  isLoading: boolean;
};

const SectionCompass = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.compass
  );
  const selectedFiltersIssuesCompare = useAppSelector(
    (state) => state.filters.researchIssues
  );
  const selectedFiltersZonesCompare = useAppSelector(
    (state) => state.filters.researchZones
  );
  const [
    getResearchIssues,
    {
      data: dataResearchIssues = initialResearchIssues,
      isFetching: isFetchingIssues,
      isError: isErrorIssues
    }
  ] = useLazyGetResearchIssuesQuery();
  const [
    getResearchZones,
    {
      data: dataResearchZones = initialResearchZones,
      isFetching: isFetchingZones,
      isError: isErrorZones
    }
  ] = useLazyGetResearchZonesQuery();

  const [
    getResearchIssuesCompare,
    {
      data: dataResearchIssuesCompare,
      isError: isErrorIssuesCompare,
      isFetching: isFetchingIssuesCompare
    }
  ] = useLazyGetResearchIssuesCompareQuery();
  const [
    getResearchZonesCompare,
    {
      data: dataResearchZonesCompare,
      isError: isErrorZonesCompare,
      isFetching: isFetchingZonesCompare
    }
  ] = useLazyGetResearchZonesCompareQuery();

  useEffect(() => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataIssuesCompareFilters = hasFilter(selectedFiltersIssuesCompare);
    const dataZonesCompareFilters = hasFilter(selectedFiltersZonesCompare);

    getResearchIssues({
      filters: dataFilters
    });
    getResearchZones({
      filters: dataFilters
    });

    if (dataIssuesCompareFilters) {
      const dataIssuesTransformFilters = transformDataFilters(
        selectedFiltersIssuesCompare
      );
      getResearchIssuesCompare({
        filters: dataFilters,
        filtersCompare: dataIssuesTransformFilters
      });
    }

    if (dataZonesCompareFilters) {
      const dataZonesTransformFilters = transformDataFilters(
        selectedFiltersZonesCompare
      );
      getResearchZonesCompare({
        filters: dataFilters,
        filtersCompare: dataZonesTransformFilters
      });
    }
  }, []);

  const handleApply = () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataIssuesCompareFilters = hasFilter(selectedFiltersIssuesCompare);
    const dataZonesCompareFilters = hasFilter(selectedFiltersZonesCompare);

    getResearchIssues({
      filters: dataFilters
    });
    getResearchZones({
      filters: dataFilters
    });

    if (dataIssuesCompareFilters) {
      const dataIssuesTransformFilters = transformDataFilters(
        selectedFiltersIssuesCompare
      );
      getResearchIssuesCompare({
        filters: dataFilters,
        filtersCompare: dataIssuesTransformFilters
      });
    }

    if (dataZonesCompareFilters) {
      const dataZonesTransformFilters = transformDataFilters(
        selectedFiltersZonesCompare
      );
      getResearchZonesCompare({
        filters: dataFilters,
        filtersCompare: dataZonesTransformFilters
      });
    }
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters({ tab: 'compass' }));
  };

  const onApplyIssuesCompare = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataFiltersCompare = transformDataFilters(
      selectedFiltersIssuesCompare
    );
    dispatch(changeShowResearchTable({ tab: 'issues', isShow: true }));

    try {
      const payload = await getResearchIssuesCompare({
        filters: dataFilters,
        filtersCompare: dataFiltersCompare
      }).unwrap();

      if (payload.data === undefined || payload.isError) {
        toast('Произошла ошибка');
      }
    } catch (e) {
      toast('Произошла ошибка');
      console.error(e);
    }
  };

  const onApplyZonesCompare = async () => {
    const dataFilters = transformDataFilters(selectedFilters);
    const dataFiltersCompare = transformDataFilters(
      selectedFiltersZonesCompare
    );
    dispatch(changeShowResearchTable({ tab: 'questions', isShow: true }));

    try {
      const payload = await getResearchZonesCompare({
        filters: dataFilters,
        filtersCompare: dataFiltersCompare
      }).unwrap();

      if (payload.data === undefined || payload.isError) {
        toast('Произошла ошибка');
      }
    } catch (e) {
      toast('Произошла ошибка');
      console.error(e);
    }
  };

  const isLoadingBtnApply = isFetchingIssues || isFetchingZones || isLoading;
  const isDisabledBtnApply = !hasFilter(selectedFilters);

  return (
    <>
      <FilterCompass
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
      />
      <Results
        dataIssues={dataResearchIssues?.data}
        dataIssuesCompare={dataResearchIssuesCompare?.data}
        dataZones={dataResearchZones?.data}
        dataZonesCompare={dataResearchZonesCompare?.data}
        isErrorIssues={dataResearchIssues?.isError || isErrorIssues}
        isErrorIssuesCompare={
          dataResearchIssuesCompare?.isError || isErrorIssuesCompare
        }
        isErrorZonesCompare={
          dataResearchZonesCompare?.isError || isErrorZonesCompare
        }
        isErrorZones={dataResearchZones?.isError || isErrorZones}
        isLoadingIssues={isFetchingIssues}
        isLoadingZones={isFetchingZones}
        onApplyIssuesCompare={onApplyIssuesCompare}
        onApplyZonesCompare={onApplyZonesCompare}
        isFetchingIssuesCompare={isFetchingIssuesCompare}
        isFetchingZonesCompare={isFetchingZonesCompare}
      />
    </>
  );
};

export default SectionCompass;
