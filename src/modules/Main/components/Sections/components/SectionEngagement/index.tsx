import { useState, useEffect } from 'react';
import { FilterEngagement } from '../../../Filters';
import EngagementResults from './components/EngagementResults';
import EngagementCategory from './components/EngagementCategory';
import Issues from './components/Issues';
import Zones from './components/Zones';
import Comments from './components/Comments';
import NoData from '../../../NoData';
import {
  useLazyGetSpeedDataQuery,
  useLazyGetCategoryDataQuery,
  useLazyGetKeyResultsQuery,
  useLazyGetCommentsQuery,
  useLazyGetCountRespondentEngegamentQuery
} from 'store/apiSlice';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  clearSelectedFilters,
  updateCountRespondents
} from 'store/filterSlice';
import { transformDataFilters, hasFilter } from 'helpers';
import styles from '../../styles.module.scss';

type Props = {
  isLoading: boolean;
};

const SectionEngagement = ({ isLoading }: Props) => {
  const [
    updateSpeedChart,
    {
      data: dataSpeedChart,
      isFetching: isFetchingSpeedChart,
      isError: isErrorSpeedChart
    }
  ] = useLazyGetSpeedDataQuery();
  const [
    updateCategoryChart,
    {
      data: dataCategoryChart,
      isFetching: isFetchingCategoryChart,
      isError: isErrorCategoryChart
    }
  ] = useLazyGetCategoryDataQuery();

  const [
    updateKeyResults,
    {
      data: dataKeyResults,
      isFetching: isFetchingKeyResults,
      isError: isErrorKeyResults
    }
  ] = useLazyGetKeyResultsQuery();
  const [
    getComments,
    {
      data: dataComments,
      isFetching: isFetchingComments,
      isError: isErrorComments
    }
  ] = useLazyGetCommentsQuery();
  const [
    getCountRespondent,
    { data: dataCountRespondent, isFetching: isFetchingCountRespondent }
  ] = useLazyGetCountRespondentEngegamentQuery();

  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters
  );
  const respondentsState = useAppSelector(
    (state) => state.filters.respondents.engagement
  );
  const [viewChart, setViewChart] = useState<'doughnut' | 'bar'>('doughnut');

  const countRespondent =
    respondentsState !== undefined
      ? respondentsState
      : dataCountRespondent?.data ?? 0;

  useEffect(() => {
    getCountRespondent({ filters: [] });
    updateSpeedChart({
      filters: []
    });
    updateCategoryChart({ filters: [] });
    updateKeyResults({ filters: [] });
    getComments({ filters: [] });
  }, []);

  useEffect(() => {
    if (dataCountRespondent?.data !== undefined) {
      dispatch(
        updateCountRespondents({
          tab: 'engagement',
          data: dataCountRespondent.data
        })
      );
    }
  }, [dataCountRespondent]);

  const handleApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters, [
      'group',
      'subs',
      'city'
    ]);
    const filterSubs = selectedFilters.find((filter) => filter.name === 'subs');
    const viewChart =
      filterSubs !== undefined && filterSubs.value.length > 1
        ? 'bar'
        : 'doughnut';
    const payloadRespondens = await getCountRespondent({
      filters: dataFilters
    });

    if (
      payloadRespondens.data !== undefined &&
      (payloadRespondens.data.data >= 10 || payloadRespondens.data.isShowAll)
    ) {
      setViewChart(viewChart);
      updateSpeedChart({
        filters: dataFilters
      });
      updateCategoryChart({
        filters: dataFilters
      });
      updateKeyResults({ filters: dataFilters });
      getComments({ filters: dataFilters });
    }
  };

  const handleReset = () => {
    dispatch(clearSelectedFilters());
  };

  const isLoadingBtnApply =
    isFetchingSpeedChart ||
    isFetchingCategoryChart ||
    isFetchingKeyResults ||
    isFetchingComments ||
    isLoading ||
    isFetchingCountRespondent;

  const isDisabledBtnApply = !hasFilter(selectedFilters);

  if (
    respondentsState !== undefined &&
    countRespondent < 10 &&
    !dataCountRespondent?.isShowAll
  ) {
    return (
      <>
        <FilterEngagement
          onApply={handleApply}
          onReset={handleReset}
          isLoading={isLoadingBtnApply}
          isDisabled={isDisabledBtnApply}
          countRespondent={countRespondent}
        />
        <div className={styles.section__content}>
          <NoData isRespondents />
        </div>
      </>
    );
  }

  return (
    <>
      <FilterEngagement
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
        countRespondent={countRespondent}
      />
      <EngagementResults
        data={dataSpeedChart?.data}
        isLoading={isFetchingSpeedChart}
        isError={dataSpeedChart?.isError || isErrorSpeedChart}
        view={viewChart}
      />
      <EngagementCategory
        data={dataCategoryChart?.data}
        isLoading={isFetchingCategoryChart}
        isError={dataCategoryChart?.isError || isErrorCategoryChart}
      />
      <Issues
        data={dataKeyResults?.data.negative}
        year={dataKeyResults?.year}
        isLoading={isFetchingKeyResults}
        isError={dataKeyResults?.isError || isErrorKeyResults}
      />
      <Comments
        data={dataComments?.data}
        isLoading={isFetchingComments}
        isError={dataComments?.isError || isErrorComments}
      />
      <Zones
        data={dataKeyResults?.data.positive}
        isLoading={isFetchingKeyResults}
        isError={dataKeyResults?.isError || isErrorKeyResults}
      />
    </>
  );
};

export default SectionEngagement;
