import styles from './styles.module.scss';

const Skeleton = () => {
  return (
    <div className={styles['engagement-category__card']}>
      <div
        className={`${styles['engagement-category__skeleton_line']} ${styles['engagement-category__skeleton']}`}
      ></div>
      <div
        className={`${styles['engagement-category__skeleton_circle']} ${styles['engagement-category__skeleton']}`}
      ></div>
      <div
        className={`${styles['engagement-category__skeleton_line']} ${styles['engagement-category__skeleton']}`}
      ></div>
    </div>
  );
};

export default Skeleton;
