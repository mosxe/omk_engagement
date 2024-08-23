import Sections from './components/Sections';
import Navs from './components/Navs';
import Description from './components/Description';
import Alert from 'components/Alert';
// import SectionEngagement from './components/Sections/components/SectionEngagement';
// import SectionCompass from './components/Sections/components/SectionCompass';
// import SectionQuestions from './components/Sections/components/SectionQuestions';
// import { useGetFilterEngagementDataQuery } from 'store/apiSlice';
// import { initialFilters } from 'store/constants';
// import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Tab } from 'types';
import styles from './styles.module.scss';
import { useState } from 'react';

const Main = () => {
  const [tab, setTab] = useState<Tab>('engagement');
  // const {
  //   data = initialFilters,
  //   refetch,
  //   isLoading,
  //   isError
  // } = useGetFilterEngagementDataQuery({ filters: [], is_starting: true });
  // const filteredData = useAppSelector((state) => state.filters.filteredData);
  // const dispatch = useAppDispatch();

  // console.log(data.filters);

  //Каждая вкладка имеет свой endpoint по получению фильтров
  //getFilterEngagementData(frontData, isStart, curUserID) - первый раз при загрузке страницы
  //getSpeedData - бублик. При БЕ сразу данные подтягиваем
  //getChartsEngagementData(frontData, isStart, curUserID) - первый раз при загрузке страницы
  //При нажатии кнопки применить фильтр отправляются 3 запроса на каждый график
  //Бублик строится, если выборано 1 подразделение, если больше, то графики

  const handleClick = (value: Tab) => {
    if (value !== tab) {
      setTab(value);
    }
  };

  // if (isLoading) {
  //   return (
  //     <main className={styles.main}>
  //       <Loader />
  //     </main>
  //   );
  // }

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
    <>
      <main className={styles.main}>
        <Navs tab={tab} onClick={handleClick} />
        {tab === 'engagement' && <Description />}
        <Sections tab={tab} />
      </main>
      <Alert />
    </>
  );
};

export default Main;
