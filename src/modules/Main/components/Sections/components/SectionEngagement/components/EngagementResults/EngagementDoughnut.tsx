import { Doughnut, DoughnutSkeleton } from 'components/Charts';
import NoData from 'modules/Main/components/NoData';
import { SpeedChart } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: SpeedChart[] | undefined;
  isLoading: boolean;
  isChecked: boolean;
};

const EngagementDoughnut = ({ data, isLoading, isChecked }: Props) => {
  if (data === undefined || isLoading) {
    return (
      <div className={styles['engagement-results__box']}>
        <div>
          <div className={styles['engagement-results__container']}>
            <div className={styles['engagement-results__chart']}>
              <DoughnutSkeleton />
            </div>
          </div>
          <div className={styles['engagement-results__row']}>
            <div
              className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
            >
              <div
                className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
              >
                <DoughnutSkeleton size='small' />
              </div>
            </div>
            <div
              className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
            >
              <div
                className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
              >
                <DoughnutSkeleton size='small' />
              </div>
            </div>
          </div>
        </div>
        {isChecked && (
          <div className={styles['engagement-results__container']}>
            <div className={styles['engagement-results__chart']}>
              <DoughnutSkeleton />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!data.length) {
    return <NoData />;
  }

  const filteredData = data.filter((card) => !card.is_be);
  const matchingData = data.find((card) => card.is_be) as SpeedChart;

  return (
    <div className={styles['engagement-results__box']}>
      <div>
        <div className={styles['engagement-results__container']}>
          <div className={styles['engagement-results__chart']}>
            <Doughnut
              percent={filteredData[0].percent}
              title={`${filteredData[0].year} год`}
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
                      percent={chart.percent}
                      title={chart.year}
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
              percent={matchingData.percent}
              title={`${matchingData.year} год`}
              id='doughnut_chart_matching'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EngagementDoughnut;
