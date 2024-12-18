﻿import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FilterCompass } from '../../../Filters';
import Results from './components/Results';
import NoData from '../../../NoData';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  useLazyGetResearchIssuesQuery,
  useLazyGetResearchZonesQuery,
  useLazyGetResearchIssuesCompareQuery,
  useLazyGetResearchZonesCompareQuery,
  useLazyGetCountRespondentCompasQuery
} from 'store/apiSlice';
import {
  clearSelectedFilters,
  changeShowResearchTable,
  updateCountRespondents
} from 'store/filterSlice';
import { initialResearchIssues, initialResearchZones } from 'store/constants';
import { transformDataFilters, hasFilter } from 'helpers';
import styles from '../../styles.module.scss';

type Props = {
  isLoading: boolean;
};

const SectionCompass = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters
  );
  const selectedFiltersIssuesCompare = useAppSelector(
    (state) => state.filters.researchIssues
  );
  const selectedFiltersZonesCompare = useAppSelector(
    (state) => state.filters.researchZones
  );
  const respondentsState = useAppSelector(
    (state) => state.filters.respondents.compass
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
  const [
    getCountRespondent,
    { data: dataCountRespondent, isFetching: isFetchingCountRespondent }
  ] = useLazyGetCountRespondentCompasQuery();

  const countRespondent =
    respondentsState !== undefined
      ? respondentsState
      : dataCountRespondent?.data ?? 0;

  useEffect(() => {
    const dataFilters = transformDataFilters(selectedFilters, [
      'group',
      'subs',
      'city',
      'category',
      'experience',
      'sex',
      'age',
      'problems',
      'strong_point'
    ]);
    const dataIssuesCompareFilters = hasFilter(selectedFiltersIssuesCompare);
    const dataZonesCompareFilters = hasFilter(selectedFiltersZonesCompare);
    getCountRespondent({ filters: dataFilters });
    getResearchIssues({
      filters: dataFilters
    });
    getResearchZones({
      filters: dataFilters
    });

    if (dataIssuesCompareFilters) {
      const dataIssuesTransformFilters = transformDataFilters(
        selectedFiltersIssuesCompare,
        ['subs', 'year']
      );
      getResearchIssuesCompare({
        filters: dataFilters,
        filtersCompare: dataIssuesTransformFilters
      });
    }

    if (dataZonesCompareFilters) {
      const dataZonesTransformFilters = transformDataFilters(
        selectedFiltersZonesCompare,
        ['subs', 'year']
      );
      getResearchZonesCompare({
        filters: dataFilters,
        filtersCompare: dataZonesTransformFilters
      });
    }
  }, []);

  useEffect(() => {
    if (dataCountRespondent?.data !== undefined) {
      dispatch(
        updateCountRespondents({
          tab: 'compass',
          data: dataCountRespondent.data
        })
      );
    }
  }, [dataCountRespondent]);

  const handleApply = async () => {
    const dataFilters = transformDataFilters(selectedFilters, [
      'group',
      'subs',
      'city',
      'category',
      'experience',
      'sex',
      'age',
      'problems',
      'strong_point'
    ]);
    const dataIssuesCompareFilters = hasFilter(selectedFiltersIssuesCompare);
    const dataZonesCompareFilters = hasFilter(selectedFiltersZonesCompare);

    const payloadRespondens = await getCountRespondent({
      filters: dataFilters
    });

    if (
      payloadRespondens.data !== undefined &&
      (payloadRespondens.data.data >= 10 || payloadRespondens.data.isShowAll)
    ) {
      getResearchIssues({
        filters: dataFilters
      });
      getResearchZones({
        filters: dataFilters
      });

      getCountRespondent({ filters: dataFilters });

      if (dataIssuesCompareFilters) {
        const dataIssuesTransformFilters = transformDataFilters(
          selectedFiltersIssuesCompare,
          ['subs', 'year']
        );
        getResearchIssuesCompare({
          filters: dataFilters,
          filtersCompare: dataIssuesTransformFilters
        });
      }

      if (dataZonesCompareFilters) {
        const dataZonesTransformFilters = transformDataFilters(
          selectedFiltersZonesCompare,
          ['subs', 'year']
        );
        getResearchZonesCompare({
          filters: dataFilters,
          filtersCompare: dataZonesTransformFilters
        });
      }
    }
  };

  const handleReset = () => {
    const dataIssuesTransformFilters = transformDataFilters(
      selectedFiltersIssuesCompare,
      ['subs', 'year']
    );
    const dataZonesTransformFilters = transformDataFilters(
      selectedFiltersZonesCompare,
      ['subs', 'year']
    );

    dispatch(clearSelectedFilters());
    getCountRespondent({ filters: [] });
    getResearchIssues({
      filters: []
    });
    getResearchZones({
      filters: []
    });

    getResearchIssuesCompare({
      filters: [],
      filtersCompare: dataIssuesTransformFilters
    });

    getResearchZonesCompare({
      filters: [],
      filtersCompare: dataZonesTransformFilters
    });
  };

  const onApplyIssuesCompare = async () => {
    const dataFilters = transformDataFilters(selectedFilters, [
      'group',
      'subs',
      'city',
      'category',
      'experience',
      'sex',
      'age',
      'problems',
      'strong_point'
    ]);
    const dataFiltersCompare = transformDataFilters(
      selectedFiltersIssuesCompare,
      ['subs', 'year']
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
    const dataFilters = transformDataFilters(selectedFilters, [
      'group',
      'subs',
      'city',
      'category',
      'experience',
      'sex',
      'age',
      'problems',
      'strong_point'
    ]);
    const dataFiltersCompare = transformDataFilters(
      selectedFiltersZonesCompare,
      ['subs', 'year']
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

  const isLoadingBtnApply =
    isFetchingIssues ||
    isFetchingZones ||
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
        <FilterCompass
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
      <FilterCompass
        onApply={handleApply}
        onReset={handleReset}
        isLoading={isLoadingBtnApply}
        isDisabled={isDisabledBtnApply}
        countRespondent={countRespondent}
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
