import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  title: string;
  percent: number;
  index: number;
};

const Card = ({ title, percent, index }: Props) => {
  const start = 15;
  const end = 80;
  const size = start + Math.round((percent * 100) / end);

  const classNameCard = classNames(styles['engagement-category__card'], {
    [styles['engagement-category__card_black']]: index === 0,
    [styles['engagement-category__card_purple']]: index === 1,
    [styles['engagement-category__card_blue']]: index === 2,
    [styles['engagement-category__card_red']]: index === 3,
    [styles['engagement-category__card_pink']]: index === 4,
    [styles['engagement-category__card_orange']]: index === 5
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
