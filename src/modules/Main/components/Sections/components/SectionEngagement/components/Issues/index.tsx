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
    ? `Ключевая проблематика, выявленная в результате исследования ${year} года`
    : 'Ключевая проблематика, выявленная в результате исследования';

  return (
    <section className={styles['engagement-issues']}>
      <div className={styles['engagement-issues__header']}>
        <h2>{title}</h2>
      </div>
      <div className={styles['engagement-issues__wrapper']}>
        <div className={styles['engagement-issues__container']}>
          <div className={styles['engagement-issues__title']}>
            Общие зоны развития
          </div>
          <div>
            <Table data={dataTableGeneral} isLoading={isLoadingTable} />
          </div>
        </div>
        <div className={styles['engagement-issues__container']}>
          <div className={styles['engagement-issues__title']}>
            Зоны развития в подразделениях
          </div>
          <div>
            <Table data={dataTableLocal} isLoading={isLoadingTable} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementIssues;
