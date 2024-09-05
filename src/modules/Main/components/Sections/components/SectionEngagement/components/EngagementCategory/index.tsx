import Image from 'assets/images/Engagement/img_3.png';
import Content from './Content';
import { CategoryChart } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: CategoryChart[];
  isLoading: boolean;
};

const EngagementCategory = ({ data, isLoading }: Props) => {
  return (
    <section className={styles['engagement-category']}>
      <div className={styles['engagement-category__header']}>
        <div className={styles['engagement-category__header_wrapper']}>
          <h2>Категории работников по вовлеченности</h2>
        </div>
        <div className={styles['engagement-category__header_img']}>
          <img src={Image} alt='Картинка' />
        </div>
      </div>
      <Content data={data} isLoading={isLoading} />
    </section>
  );
};

export default EngagementCategory;
