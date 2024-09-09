import styles from './styles.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles['issue-card']}>
      <div className={styles['issue-card__wrapper']}>
        <div
          className={`${styles['issue-card__skeleton_line']} ${styles['issue-card__skeleton']}`}
        ></div>
        <div
          className={`${styles['issue-card__skeleton_btn']} ${styles['issue-card__skeleton']}`}
        ></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
