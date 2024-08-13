import Card from './Card';
import Image from 'assets/images/Engagement/img_3.png';
import { CategoryChart } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: CategoryChart[];
};

const EngagementCategory = ({ data }: Props) => {
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
      <div className={styles['engagement-category__wrapper']}>
        {data.map((item) => {
          return (
            <Card title={item.name} percent={item.percent} color='black' />
          );
        })}
        {/* <Card title='Движущая сила' percent={1} color='black' />
        <Card title='Ослабленные' percent={2} color='purple' />
        <Card title='Мученики' percent={4} color='blue' />
        <Card title='Балласт' percent={5} color='red' />
        <Card title='Будущий потенциал' percent={10} color='pink' />
        <Card title='Мысленно уже не в компании' percent={50} color='orange' /> */}
      </div>
    </section>
  );
};

export default EngagementCategory;
