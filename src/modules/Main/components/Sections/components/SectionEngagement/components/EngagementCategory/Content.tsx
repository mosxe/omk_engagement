import NoData from 'modules/Main/components/NoData';
import Card from './Card';
import Skeleton from './Skeleton';
import { CategoryChart } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: CategoryChart[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const COUNT_SKELETON = 6;

const Content = ({ data, isLoading, isError }: Props) => {
  if (data === undefined || isLoading) {
    return (
      <div className={styles['engagement-category__wrapper']}>
        {[...Array(COUNT_SKELETON)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data.length || isError) {
    return (
      <div className={styles['engagement-category__row']}>
        <NoData text='Данные отсутствуют' />
      </div>
    );
  }

  return (
    <div className={styles['engagement-category__wrapper']}>
      {data.map((item, index) => {
        return (
          <Card
            title={item.name}
            percent={item.value}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Content;
