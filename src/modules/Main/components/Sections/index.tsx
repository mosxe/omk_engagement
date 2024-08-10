// import { useMemo, useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from 'store/hooks';
// import {
//   updateNav,
//   clearSelectedTags,
//   filteringData,
//   updateSelectedTags
// } from 'store/filterSlice';
import SectionEngagement from './components/SectionEngagement';
import SectionCompass from './components/SectionCompass';
import SectionQuestions from './components/SectionQuestions';
import { Tab } from 'types';
// import Title from './components/Title';
// import Section from './components/Section';
// import { Tab, IResponseItem } from 'types';
// import ProcessImage from 'assets/svg/process.svg';
// import WorkingImage from 'assets/svg/working.svg';
// import InterviewImage from 'assets/svg/interview.svg';
// import styles from './styles.module.scss';

// type Props = {
//   data: IFilters[];
//   subCode: string;
//   tab: Tab;
//   onClick: (value: Tab) => void;
// };

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
