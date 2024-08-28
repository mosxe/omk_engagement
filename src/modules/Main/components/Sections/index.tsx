import SectionEngagement from './components/SectionEngagement';
import SectionCompass from './components/SectionCompass';
import SectionQuestions from './components/SectionQuestions';
import { Tab } from 'types';

type Props = {
  tab: Tab;
};

const Sections = ({ tab }: Props) => {
  return (
    <>
      {tab === 'engagement' && <SectionEngagement />}
      {tab === 'compass' && <SectionCompass />}
      {tab === 'questions' && <SectionQuestions />}
    </>
  );
};

export default Sections;
