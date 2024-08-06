import Filters from './components/Filters';
import styles from './styles.module.scss';

const Main = () => {
  // if (isLoading) {
  //   return (
  //     <>
  //       <Header onClick={hancleClickSection} />
  //       <main className={styles.main}>
  //         <Loader />
  //       </main>
  //       <Footer />
  //     </>
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
    <main className={styles.main}>
      <Filters />
    </main>
  );
};

export default Main;
