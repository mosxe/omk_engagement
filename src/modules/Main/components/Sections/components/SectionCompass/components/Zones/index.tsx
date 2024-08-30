import Table from 'components/Table';
import styles from './styles.module.scss';

const DATA = [
  {
    name: 'Нет мотивации за выслугу лет 1111',
    procent: 11,
    frequency: 23.4
  },
  {
    name: 'Нет мотивации за выслугу лет 1111',
    procent: 50.1,
    frequency: 23.9
  },
  {
    name: 'Людей не достаточно, чтобы выполнять работу 1111',
    procent: 33,
    frequency: 89
  }
];

const CompassZones = () => {
  return (
    <section className={styles['compass-zones']}>
      <div className={styles['compass-zones__header']}>
        <h2>
          Сильные стороны, выявленные в результате исследования вовлеченности
        </h2>
      </div>
      <div className={styles['compass-zones__wrapper']}>
        <div className={styles['compass-zones__container']}>
          <div className={styles['compass-zones__title']}>
            Зоны развития в подразделениях
          </div>
          <div className={styles['compass-zones__filters']}>БУДУТ ФИЛЬТРЫ</div>
          <div>
            <Table data={DATA} isLoading={false} isSorting={true} />
          </div>
        </div>
        {/* <div className={styles['compass-zones__container']}>
          <div className={styles['compass-zones__title']}>
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

export default CompassZones;
