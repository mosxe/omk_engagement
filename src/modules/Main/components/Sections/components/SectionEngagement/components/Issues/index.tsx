import Table from 'components/Table';
import { KeyResults } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResults | undefined;
  year: string | undefined;
  isLoading: boolean;
  isError: boolean;
};

const EngagementIssues = ({ data, year, isLoading, isError }: Props) => {
  const isLoadingTable = isLoading || data === undefined;
  const dataTableGeneral = isError || data === undefined ? [] : data.general;
  const dataTableLocal = isError || data === undefined ? [] : data.local;

  const title = year
    ? `Факторы отрицательного влияния на вовлеченность ${year} года`
    : 'Факторы отрицательного влияния на вовлеченность';

  return (
    <section className={styles['engagement-issues']}>
      <div className={styles['engagement-issues__header']}>
        <h2>{title}</h2>
      </div>
      <div className={styles['engagement-issues__wrapper']}>
        <div className={styles['engagement-issues__container']}>
          <div className={styles['engagement-issues__title']}>
            Влияние наличия проблемных зон
          </div>
          <div>
            <Table
              data={dataTableGeneral}
              isLoading={isLoadingTable}
              columns={['Проблематика', '% влияния', 'Частота выбора']}
            />
          </div>
        </div>
        <div className={styles['engagement-issues__container']}>
          <div className={styles['engagement-issues__title']}>
            Влияние отсутствия сильных сторон
          </div>
          <div>
            <Table
              data={dataTableLocal}
              isLoading={isLoadingTable}
              columns={['Сильная сторона', '% влияния', 'Частота не выбора']}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementIssues;
