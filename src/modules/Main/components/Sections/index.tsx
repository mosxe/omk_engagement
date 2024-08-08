// import { useMemo, useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from 'store/hooks';
// import {
//   updateNav,
//   clearSelectedTags,
//   filteringData,
//   updateSelectedTags
// } from 'store/filterSlice';
import Navs from '../Navs';
import Filters from '../Filters';
import SectionEngagement from './components/SectionEngagement';
import SectionCompass from './components/SectionCompass';
import SectionQuestions from './components/SectionQuestions';
import { Filters as IFilters, Tab } from 'types';
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
  children: React.ReactNode;
};

const Sections = ({ children }: Props) => {
  // const Sections = ({ data, subCode, tab, onClick }: Props) => {
  // const dispatch = useAppDispatch();
  // const navRole = useAppSelector((state) => state.filters.nav);
  // const filteredData = useAppSelector((state) => state.filters.filteredData);

  // useEffect(() => {
  //   dispatch(filteringData({ data: dataManager, isActive: false }));
  // }, [dispatch, dataManager]);

  // const handleClickNav = (role: Role) => {
  //   if (role !== navRole) {
  //     const selectedData =
  //       role === 'manager'
  //         ? dataManager
  //         : role === 'hr_bp'
  //         ? dataHRBP
  //         : dataRecruiter;
  //     dispatch(updateNav(role));
  //     dispatch(filteringData({ data: selectedData, isActive: true }));
  //   }
  // };

  // const filteredTags = useMemo(() => {
  //   const dataTags =
  //     navRole === 'manager'
  //       ? dataManager.tags
  //       : navRole === 'recruiter'
  //       ? dataRecruiter.tags
  //       : navRole === 'hr_bp'
  //       ? dataHRBP.tags
  //       : [];
  //   return dataTags;
  // }, [navRole, dataManager.tags, dataRecruiter.tags, dataHRBP.tags]);

  // const onShow = () => {
  //   const selectedData =
  //     navRole === 'manager'
  //       ? dataManager
  //       : navRole === 'hr_bp'
  //       ? dataHRBP
  //       : dataRecruiter;
  //   dispatch(filteringData({ data: selectedData, isActive: true }));
  // };

  // const onClear = () => {
  //   const selectedData =
  //     navRole === 'manager'
  //       ? dataManager
  //       : navRole === 'hr_bp'
  //       ? dataHRBP
  //       : dataRecruiter;
  //   dispatch(clearSelectedTags());
  //   dispatch(filteringData({ data: selectedData, isActive: false }));
  // };

  // const handleChangeTag = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   label: string
  // ) => {
  //   dispatch(updateSelectedTags({ label, isChecked: e.target.checked }));
  //   if (!e.target.checked) {
  //     const selectedData =
  //       navRole === 'manager'
  //         ? dataManager
  //         : navRole === 'hr_bp'
  //         ? dataHRBP
  //         : dataRecruiter;
  //     dispatch(filteringData({ data: selectedData, isActive: true }));
  //   }
  // };

  return children;
  return (
    <>
      {/* <Navs tab={tab} onClick={onClick} />
      <Filters data={data} subCode={subCode} tab={tab} />
      {tab === 'engagement' && <SectionEngagement />}
      {tab === 'compass' && <SectionCompass />}
      {tab === 'questions' && <SectionQuestions />} */}
    </>
  );
};

export default Sections;
