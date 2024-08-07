import Filters from './components/Filters';
import { useGetDataQuery } from 'store/apiSlice';
import { initialFilters } from 'store/constants';
import styles from './styles.module.scss';

const Main = () => {
  const { data = initialFilters, isLoading, isError } = useGetDataQuery();
  console.log(data.filters);
  if (isLoading) {
    return (
      <>
        <div>loading</div>
      </>
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
      <Filters data={data.filters} subCode={data.defaultSubCode} />
    </main>
  );
};

export default Main;
