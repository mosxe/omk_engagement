import Sections from './components/Sections';
import Navs from './components/Navs';
import Description from './components/Description';
import Alert from 'components/Alert';
import { Tab } from 'types';
import styles from './styles.module.scss';
import { useState } from 'react';

const Main = () => {
  const [tab, setTab] = useState<Tab>('engagement');

  const handleClick = (value: Tab) => {
    if (value !== tab) {
      setTab(value);
    }
  };

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
