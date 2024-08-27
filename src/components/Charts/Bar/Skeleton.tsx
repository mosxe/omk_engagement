import styles from './styles.module.scss';

const Skeleton = () => {
  return (
    <div className={styles['bar-skeleton__wrapper']}>
      <div className={styles['bar-skeleton__container']}>
        <div
          className={`${styles['bar-skeleton']} ${styles['bar-skeleton__bar']}`}
        ></div>
        <div
          className={`${styles['bar-skeleton']} ${styles['bar-skeleton__line']}`}
        ></div>
      </div>
      <div className={styles['bar-skeleton__container']}>
        <div
          className={`${styles['bar-skeleton']} ${styles['bar-skeleton__bar']}`}
        ></div>
        <div
          className={`${styles['bar-skeleton']} ${styles['bar-skeleton__line']}`}
        ></div>
      </div>
      <div className={styles['bar-skeleton__container']}>
        <div
          className={`${styles['bar-skeleton']} ${styles['bar-skeleton__bar']}`}
        ></div>
        <div
          className={`${styles['bar-skeleton']} ${styles['bar-skeleton__line']}`}
        ></div>
      </div>
    </div>
  );
};

export default Skeleton;
