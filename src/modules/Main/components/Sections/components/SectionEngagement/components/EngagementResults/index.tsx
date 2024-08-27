import Checkbox from 'components/Checkbox';
import EngagementDoughnut from './EngagementDoughnut';
import EngagementBar from './EngagementBar';
import Image from 'assets/images/Engagement/img_2.png';
import { SpeedChart } from 'types';
import styles from './styles.module.scss';
import { useState } from 'react';

type Props = {
  data: SpeedChart[] | undefined;
  isLoading: boolean;
  view: 'bar' | 'doughnut';
};

const EngagementResults = ({ data, isLoading, view }: Props) => {
  const [value, setValue] = useState<boolean>(false);
  const isShowCheckbox = data !== undefined && data.length > 0;

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
        {isShowCheckbox && (
          <div>
            <Checkbox
              label='Сравнить с БЕ'
              checked={value}
              onChange={() => setValue(!value)}
              isDisabled={isLoading}
            />
          </div>
        )}
        {view === 'doughnut' ? (
          <EngagementDoughnut
            data={data}
            isLoading={isLoading}
            isChecked={value}
          />
        ) : (
          <EngagementBar data={data} isLoading={isLoading} isChecked={value} />
        )}
      </div>
    </section>
  );
};

export default EngagementResults;
