import { Bar, BarSkeleton } from 'components/Charts';
import NoData from 'modules/Main/components/NoData';
import { SpeedChart } from 'types';
import { transformDataBar } from 'helpers';
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
    return <NoData />;
  }

  const tempTransformDataBar = transformDataBar(data);
  const filteredData = tempTransformDataBar.filter((card) => !card.is_be);
  const matchingData = tempTransformDataBar.find((card) => card.is_be) as never;

  const getLabels = (labelsData: { year: string; percent: number }[]) => {
    const labels = labelsData.map((item) => item.year);
    return labels;
  };

  const getData = (chartData: { year: string; percent: number }[]) => {
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
            const title = chart.is_be ? '' : chart.name;
            return (
              <div
                key={index}
                className={`${styles['engagement-results__container']} ${styles['engagement-results__container_bar']}`}
              >
                {chart.is_be && (
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
