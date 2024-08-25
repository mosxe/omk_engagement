import Table from '../Table';
import { KeyResults } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResults;
  isLoading: boolean;
};

const EngagementResults = ({ data, isLoading }: Props) => {
  return (
    <section className={styles['engagement-zones']}>
      <div className={styles['engagement-zones__header']}>
        <h2>
          Ключевые сильные стороны, выявленные в результате исследования
          вовлеченности
        </h2>
      </div>
      <div className={styles['engagement-zones__wrapper']}>
        <div className={styles['engagement-zones__container']}>
          <div className={styles['engagement-zones__title']}>
            Общие зоны развития
          </div>
          <div>
            {isLoading && <div>Загрузка данных</div>}
            {!isLoading && <Table data={data.common} />}
          </div>
        </div>
        <div className={styles['engagement-zones__container']}>
          <div className={styles['engagement-zones__title']}>
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
