import { useEffect } from 'react';
import SectionEngagement from './components/SectionEngagement';
import SectionCompass from './components/SectionCompass';
import SectionQuestions from './components/SectionQuestions';
import { Tab, OrgTree, Filter } from 'types';
import { useLazyGetOrgTreeQuery } from 'store/apiSlice';
import { useAppDispatch } from 'store/hooks';
import {
  setSubs,
  setDefaultSelectedSubs,
  setDefaultFilterSubs
} from 'store/filterSlice';
import { getSelectedValuesTree } from 'helpers';

type Props = {
  tab: Tab;
};

const Sections = ({ tab }: Props) => {
  const dispatch = useAppDispatch();
  const [updateOrg, { isLoading }] = useLazyGetOrgTreeQuery();

  useEffect(() => {
    updateOrg(null).then((data) => {
      if (data.data?.data && !data.data.isError) {
        const selectedValues = getSelectedValuesTree(data.data.data);
        const selectedFilterSubs: string[] = [];
        const tempValues = selectedValues.map((node: OrgTree) => {
          selectedFilterSubs.push(node.value);
          return {
            value: node.value,
            label: ''
          };
        });
        const filterValues = {
          name: 'subs' as const,
          value: tempValues as Filter[]
        };
        dispatch(setSubs(data.data.data));
        dispatch(setDefaultSelectedSubs(selectedFilterSubs));
        dispatch(setDefaultFilterSubs(filterValues));
      }
    });
  }, []);

  return (
    <>
      {tab === 'engagement' && <SectionEngagement isLoading={isLoading} />}
      {tab === 'compass' && <SectionCompass isLoading={isLoading} />}
      {tab === 'questions' && <SectionQuestions isLoading={isLoading} />}
    </>
  );
};

export default Sections;
