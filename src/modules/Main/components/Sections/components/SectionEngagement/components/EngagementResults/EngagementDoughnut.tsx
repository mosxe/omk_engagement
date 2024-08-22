import { Doughnut } from 'components/Charts';
import { SpeedChart } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: SpeedChart[];
  isLoading: boolean;
  isChecked: boolean;
};

const EngagementDoughnut = ({ data, isLoading, isChecked }: Props) => {
  if (!data.length) {
    return null;
  }
  const filteredData = data.filter((card) => !card.is_matching);
  const matchingData = data.find((card) => card.is_matching) as SpeedChart;

  return (
    <div className={styles['engagement-results__box']}>
      <div>
        <div className={styles['engagement-results__container']}>
          <div className={styles['engagement-results__chart']}>
            <Doughnut
              percent={filteredData[0].data[0].percent}
              title={`${filteredData[0].data[0].year} год`}
              id='doughnut_chart_0'
            />
          </div>
        </div>
        <div className={styles['engagement-results__row']}>
          {filteredData.map((chart, index) => {
            if (index > 0) {
              return (
                <div
                  key={index}
                  className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
                >
                  <div
                    className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
                  >
                    <Doughnut
                      percent={chart.data[0].percent}
                      title={chart.data[0].year}
                      id={`doughnut_chart_${index + 1}`}
                      size='small'
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      {isChecked && (
        <div className={styles['engagement-results__container']}>
          <div className={styles['engagement-results__title']}>
            Вовлеченность по БЕ
          </div>
          <div className={styles['engagement-results__chart']}>
            <Doughnut
              percent={matchingData.data[0].percent}
              title={`${matchingData.data[0].year} год`}
              id='doughnut_chart_matching'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementDoughnut;
