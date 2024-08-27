import { Bar, BarSkeleton } from 'components/Charts';
import { SpeedChart, SpeedChartItem } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: SpeedChart[] | undefined;
  isLoading: boolean;
  isChecked: boolean;
};

const EngagementBar = ({ data, isLoading, isChecked }: Props) => {
  if (data === undefined || isLoading) {
    const COUNT_SKELETON = isChecked ? 4 : 3;
    return (
      <div className={styles['engagement-results__box']}>
        <div>
          <div className={styles['engagement-results__row']}>
            {[
              [...Array(COUNT_SKELETON)].map((_, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles['engagement-results__container']} ${styles['engagement-results__container_bar']}`}
                  >
                    <div
                      className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_bar']}`}
                    >
                      <BarSkeleton />
                    </div>
                  </div>
                );
              })
            ]}
          </div>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={styles['engagement-results__empty']}>
        Данные отсутствуют
      </div>
    );
  }

  const filteredData = data.filter((card) => !card.is_matching);
  const matchingData = data.find((card) => card.is_matching) as SpeedChart;

  const getLabels = (labelsData: SpeedChartItem[]) => {
    const labels = labelsData.map((item) => item.year);
    return labels;
  };

  const getData = (chartData: SpeedChartItem[]) => {
    const data = chartData.map((item) => item.percent);
    return data;
  };

  const transformData = isChecked
    ? [...filteredData.slice(0, 1), matchingData, ...filteredData.slice(1)]
    : filteredData;

  return (
    <div className={styles['engagement-results__box']}>
      <div>
        <div className={styles['engagement-results__row']}>
          {transformData.map((chart, index) => {
            const title = chart.is_matching ? '' : chart.sub;
            return (
              <div
                key={index}
                className={`${styles['engagement-results__container']} ${styles['engagement-results__container_bar']}`}
              >
                {chart.is_matching && (
                  <div
                    className={`${styles['engagement-results__title']} ${styles['engagement-results__title_m']}`}
                  >
                    Вовлеченность по БЕ
                  </div>
                )}
                <div
                  className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_bar']}`}
                >
                  <Bar
                    labels={getLabels(chart.data)}
                    data={getData(chart.data)}
                    title={title}
                    id={`bar_chart_${index}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EngagementBar;
