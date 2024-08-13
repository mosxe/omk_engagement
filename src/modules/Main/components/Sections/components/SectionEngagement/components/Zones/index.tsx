import Table from '../Table';
import styles from './styles.module.scss';

// type Props = {
//   data: SpeedChart[];
// };
// { data }: Props
const EngagementResults = () => {
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
            <Table />
          </div>
        </div>
        <div className={styles['engagement-zones__container']}>
          <div className={styles['engagement-zones__title']}>
            Зоны развития в подразделениях
          </div>
          <div>
            <Table />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementResults;
