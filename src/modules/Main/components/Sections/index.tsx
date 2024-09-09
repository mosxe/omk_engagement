import SectionEngagement from './components/SectionEngagement';
import SectionCompass from './components/SectionCompass';
import SectionQuestions from './components/SectionQuestions';
import { Tab } from 'types';
import { useGetOrgTreeQuery } from 'store/apiSlice';

type Props = {
  tab: Tab;
};

const Sections = ({ tab }: Props) => {
  const { data, isLoading } = useGetOrgTreeQuery(null);

  console.log(data);

  return (
    <>
      {tab === 'engagement' && (
        <SectionEngagement dataOrg={data?.data} isLoading={isLoading} />
      )}
      {tab === 'compass' && (
        <SectionCompass dataOrg={data?.data} isLoading={isLoading} />
      )}
      {tab === 'questions' && (
        <SectionQuestions dataOrg={data?.data} isLoading={isLoading} />
      )}
    </>
  );
};

export default Sections;
