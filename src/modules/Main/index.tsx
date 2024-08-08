import Loader from 'components/Loader';
import Sections from './components/Sections';
import Navs from './components/Navs';
import Filters from './components/Filters';
import SectionEngagement from './components/Sections/components/SectionEngagement';
import SectionCompass from './components/Sections/components/SectionCompass';
import SectionQuestions from './components/Sections/components/SectionQuestions';
import { useGetDataQuery } from 'store/apiSlice';
import { initialFilters } from 'store/constants';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Tab } from 'types';
import styles from './styles.module.scss';
import { useState } from 'react';

const Main = () => {
  const [tab, setTab] = useState<Tab>('engagement');
  const { data = initialFilters, isLoading, isError } = useGetDataQuery();
  // const filteredData = useAppSelector((state) => state.filters.filteredData);
  // const dispatch = useAppDispatch();

  // console.log(data.filters);

  const handleClick = (value: Tab) => {
    if (value !== tab) {
      setTab(value);
    }
  };

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Loader />
      </main>
    );
  }

  // if (isError || data.isError) {
  //   return (
  //     <>
  //       <Header onClick={hancleClickSection} />
  //       <main className={styles.main}>
  //         <Error />
  //       </main>
  //       <Footer />
  //     </>
  //   );
  // }

  return (
    <main className={styles.main}>
      <Sections
      // data={data.filters}
      // subCode={data.defaultSubCode}
      // tab={tab}
      // onClick={handleClick}
      >
        <Navs tab={tab} onClick={handleClick} />
        <Filters data={data.filters} subCode={data.defaultSubCode} tab={tab} />
        {tab === 'engagement' && <SectionEngagement />}
        {tab === 'compass' && <SectionCompass />}
        {tab === 'questions' && <SectionQuestions />}
      </Sections>
    </main>
  );
};

export default Main;
