import { Tab } from 'types';
import styles from './styles.module.scss';

type Props = {
  tab: Tab;
  onClick: (value: Tab) => void;
};

const Navs = ({ tab, onClick }: Props) => {
  return (
    <div className={styles.navs}>
      <button
        className={`${styles.navs__btn} ${
          tab === 'engagement' && styles.navs__btn_active
        }`}
        type='button'
        onClick={() => onClick('engagement')}
      >
        Вовлеченность
      </button>
      <button
        className={`${styles.navs__btn} ${
          tab === 'compass' && styles.navs__btn_active
        }`}
        type='button'
        onClick={() => onClick('compass')}
      >
        Компас изменений РСС/рабочие
      </button>
      <button
        className={`${styles.navs__btn} ${
          tab === 'questions' && styles.navs__btn_active
        }`}
        type='button'
        disabled
        onClick={() => onClick('questions')}
      >
        Открытые вопросы
      </button>
    </div>
  );
};

export default Navs;
