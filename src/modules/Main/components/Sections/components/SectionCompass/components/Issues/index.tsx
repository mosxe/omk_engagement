import Table from 'components/Table';
import styles from './styles.module.scss';

const DATA = [
  {
    name: 'Нет мотивации за выслугу лет 22222',
    procent: 100,
    frequency: 50.5
  },
  {
    name: 'Нет мотивации за выслугу лет 22222',
    procent: 50.1,
    frequency: 50
  },
  {
    name: 'Людей не достаточно, чтобы выполнять работу 22222',
    procent: 22,
    frequency: 20
  }
];

const CompassIssues = () => {
  return (
    <section className={styles['compass-issues']}>
      <div className={styles['compass-issues__header']}>
        <h2>Проблематика, выявленная в результате исследования</h2>
      </div>
      <div className={styles['compass-issues__wrapper']}>
        <div className={styles['compass-issues__container']}>
          <div className={styles['compass-issues__title']}>
            Зоны развития в подразделениях
          </div>
          <div className={styles['compass-issues__filters']}>БУДУТ ФИЛЬТРЫ</div>
          <div>
            <Table data={DATA} isLoading={false} isSorting={true} />
          </div>
        </div>
        {/* <div className={styles['compass-issues__container']}>
          <div className={styles['compass-issues__title']}>
            Зоны развития в подразделениях
          </div>
          <div>
            <Table data={data.subdivision} isLoading={isLoading} />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CompassIssues;
