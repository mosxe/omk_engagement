import styles from './styles.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles['question-card']}>
      <div className={styles['question-card__wrapper']}>
        <div
          className={`${styles['question-card__skeleton_img']} ${styles['question-card__skeleton']}`}
        ></div>
        <div
          className={`${styles['question-card__skeleton_line']} ${styles['question-card__skeleton']}`}
        ></div>
      </div>
      <div
        className={`${styles['question-card__skeleton_btn']} ${styles['question-card__skeleton']}`}
      ></div>
    </div>
  );
};

export default SkeletonCard;
