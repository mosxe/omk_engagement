// import { useState } from 'react';
// import styles from './styles.module.scss';

const Tab = () => {
  // const [tab, setTab] = useState<'questions' | 'issues'>('questions');

  return (
    <nav className='menu'>
      <ul>
        <li>Открытые вопросы</li>
        <li>Проблематики</li>
      </ul>
    </nav>
  );
};

export default Tab;
