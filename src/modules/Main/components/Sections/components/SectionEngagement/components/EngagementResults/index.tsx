import { Doughnut, Bar } from 'components/Charts';
import Checkbox from 'components/Checkbox';
import EngagementDoughnut from './EngagementDoughnut';
import EngagementBar from './EngagementBar';
import Image from 'assets/images/Engagement/img_2.png';
import { SpeedChart } from 'types';
import styles from './styles.module.scss';
import { useState } from 'react';

type Props = {
  data: SpeedChart[];
  isLoading: boolean;
  view: 'bar' | 'doughnut';
};

const EngagementResults = ({ data, isLoading, view }: Props) => {
  const [value, setValue] = useState<boolean>(false);
  console.log(view);

  return (
    <section className={styles['engagement-results']}>
      <div className={styles['engagement-results__header']}>
        <div className={styles['engagement-results__header_wrapper']}>
          <h2>Результаты исследования вовлеченности</h2>
        </div>
        <div className={styles['engagement-results__header_img']}>
          <img src={Image} alt='Картинка' />
        </div>
      </div>
      <div className={styles['engagement-results__wrapper']}>
        <h3>Результаты за 3 последних года</h3>
        <div>
          <Checkbox
            label='Сравнить с БЕ'
            checked={value}
            onChange={() => setValue(!value)}
          />
        </div>
        {view === 'doughnut' ? (
          <EngagementDoughnut data={data} isLoading={false} isChecked={value} />
        ) : (
          <EngagementBar data={data} isLoading={false} isChecked={value} />
        )}

        {/* <div className={styles['engagement-results__box']}>
          <div>
            <div className={styles['engagement-results__container']}>
              <div className={styles['engagement-results__chart']}>
                <Doughnut
                  percent={data[0]?.percent}
                  title={`${data[0]?.year} год`}
                  id='doughnut_chart_0'
                />
              </div>
            </div>
            <div className={styles['engagement-results__row']}>
              <div
                className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
              >
                <div
                  className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
                >
                  <Doughnut
                    percent={80}
                    title='2023 год'
                    id='doughnut_chart_1'
                    size='small'
                  />
                </div>
              </div>
              <div
                className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
              >
                <div
                  className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
                >
                  <Doughnut
                    percent={100}
                    title='2022 год'
                    id='doughnut_chart_2'
                    size='small'
                  />
                </div>
              </div>
            </div>
          </div>
          {value && (
            <div className={styles['engagement-results__container']}>
              <div className={styles['engagement-results__chart']}>
                <Doughnut
                  percent={data[0]?.percent}
                  title={`${data[0]?.year} год`}
                  id='doughnut_chart_22'
                />
              </div>
            </div>
          )}
        </div> */}
        {/* <div className={styles['engagement-results__box']}>
          <div>
            <div className={styles['engagement-results__container']}>
              <div
                className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_bar']}`}
              >
                <Bar id='1' title='Цепной волк' data={[]} />
              </div>
            </div>
            <div className={styles['engagement-results__row']}>
              <div
                className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
              >
                <div
                  className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
                >
                  <Doughnut
                    percent={80}
                    title='2023 год'
                    id='doughnut_chart_1'
                    size='small'
                  />
                </div>
              </div>
              <div
                className={`${styles['engagement-results__container']} ${styles['engagement-results__container_s']}`}
              >
                <div
                  className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_s']}`}
                >
                  <Doughnut
                    percent={100}
                    title='2022 год'
                    id='doughnut_chart_2'
                    size='small'
                  />
                </div>
              </div>
            </div>
          </div>
          {value && (
            <div className={styles['engagement-results__container']}>
              <div className={styles['engagement-results__chart']}>
                <Doughnut
                  percent={data[0]?.percent}
                  title={`${data[0]?.year} год`}
                  id='doughnut_chart_22'
                />
              </div>
            </div>
          )}
        </div> */}
      </div>

      {/* <div className={styles['engagement-results__container']}>
        <div
          className={`${styles['engagement-results__chart']} ${styles['engagement-results__chart_bar']}`}
        >
          <Bar id='1' title='Цепной волк' data={[]} />
        </div>
      </div> */}
    </section>
  );
};

export default EngagementResults;
