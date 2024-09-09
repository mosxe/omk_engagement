import { QuestionsTab } from 'types';
import styles from './styles.module.scss';

type Props = {
  tab: QuestionsTab;
  onClick: (value: QuestionsTab) => void;
};
const Tab = ({ tab, onClick }: Props) => {
  return (
    <ul className={styles['questions-tab']}>
      <li
        className={`${styles['questions-tab__item']} ${
          tab === 'questions' ? styles['questions-tab__item_active'] : ''
        }`}
        onClick={() => onClick('questions')}
      >
        Открытые вопросы
      </li>
      <li
        className={`${styles['questions-tab__item']} ${
          tab === 'issues' ? styles['questions-tab__item_active'] : ''
        }`}
        onClick={() => onClick('issues')}
      >
        Комментарии к проблематике
      </li>
    </ul>
  );
};

export default Tab;
