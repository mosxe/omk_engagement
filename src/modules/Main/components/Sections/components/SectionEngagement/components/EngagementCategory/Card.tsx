import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  title: string;
  percent: number;
  color: 'black' | 'purple' | 'blue' | 'red' | 'pink' | 'orange';
};

const Card = ({ title, percent, color }: Props) => {
  const start = 15;
  const end = 80;
  const size = start + Math.round((percent * 100) / end);

  const classNameCard = classNames(styles['engagement-category__card'], {
    [styles['engagement-category__card_black']]: color === 'black',
    [styles['engagement-category__card_purple']]: color === 'purple',
    [styles['engagement-category__card_blue']]: color === 'blue',
    [styles['engagement-category__card_red']]: color === 'red',
    [styles['engagement-category__card_pink']]: color === 'pink',
    [styles['engagement-category__card_orange']]: color === 'orange'
  });

  return (
    <div className={classNameCard}>
      <div className={styles['engagement-category__card_title']}>{title}</div>
      <div
        className={styles['engagement-category__card_circle']}
        style={{ width: size, height: size }}
      ></div>
      <div className={styles['engagement-category__card_text']}>{percent}%</div>
    </div>
  );
};

export default Card;
