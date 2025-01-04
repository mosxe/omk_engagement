import Table from 'components/Table';
import { KeyResults } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResults | undefined;
  isLoading: boolean;
  isError: boolean;
};

const EngagementZones = ({ data, isLoading, isError }: Props) => {
  const isLoadingTable = isLoading || data === undefined;
  const dataTableGeneral = isError || data === undefined ? [] : data.general;
  const dataTableLocal = isError || data === undefined ? [] : data.local;

  return (
    <section className={styles['engagement-zones']}>
      <div className={styles['engagement-zones__header']}>
        <h2>Факторы положительного влияния на вовлеченность</h2>
      </div>
      <div className={styles['engagement-zones__wrapper']}>
        <div className={styles['engagement-zones__container']}>
          <div className={styles['engagement-zones__title']}>
            Влияние наличия сильных сторон
          </div>
          <div>
            <Table
              data={dataTableGeneral}
              isLoading={isLoadingTable}
              columns={['Сильная сторона', '% влияния', 'Частота выбора']}
            />
          </div>
        </div>
        <div className={styles['engagement-zones__container']}>
          <div className={styles['engagement-zones__title']}>
            Влияние отсутствия проблемных зон
          </div>
          <div>
            <Table
              data={dataTableLocal}
              isLoading={isLoadingTable}
              columns={['Проблематика', '% влияния', 'Частота не выбора']}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementZones;
