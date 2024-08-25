﻿import Table from '../Table';
import { KeyResults } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResults;
  isLoading: boolean;
};

const EngagementResults = ({ data, isLoading }: Props) => {
  return (
    <section className={styles['engagement-issues']}>
      <div className={styles['engagement-issues__header']}>
        <h2>
          Ключевая проблематика, выявленная в результате исследования 2024 года
        </h2>
      </div>
      <div className={styles['engagement-issues__wrapper']}>
        <div className={styles['engagement-issues__container']}>
          <div className={styles['engagement-issues__title']}>
            Общие зоны развития
          </div>
          <div>
            {isLoading && <div>Загрузка данных</div>}
            {!isLoading && <Table data={data.common} />}
          </div>
        </div>
        <div className={styles['engagement-issues__container']}>
          <div className={styles['engagement-issues__title']}>
            Зоны развития в подразделениях
          </div>
          <div>
            {isLoading && <div>Загрузка данных</div>}
            {!isLoading && <Table data={data.subdivision} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementResults;
