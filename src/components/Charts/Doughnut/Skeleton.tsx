import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  size?: 'small' | 'medium';
};

const Skeleton = ({ size = 'medium' }: Props) => {
  const classNameWrapper = classNames(styles['doughnut-skeleton__wrapper'], {
    [styles['doughnut-skeleton__wrapper_s']]: size === 'small'
  });

  const classNameCircle = classNames(
    [styles['doughnut-skeleton__circle'], styles['doughnut-skeleton']],
    {
      [styles['doughnut-skeleton__circle_s']]: size === 'small'
    }
  );

  const classNameLine = classNames(
    [styles['doughnut-skeleton__line'], styles['doughnut-skeleton']],
    {
      [styles['doughnut-skeleton__line_s']]: size === 'small'
    }
  );
  return (
    <div className={classNameWrapper}>
      <div className={classNameCircle}></div>
      <div className={classNameLine}></div>
    </div>
  );
};

export default Skeleton;
