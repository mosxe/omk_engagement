import styles from './styles.module.scss';

const COUNT_SKELETON = 3;

const Skeleton = () => {
  return (
    <>
      <div className={styles['engagement-comments__description']}>
        <div
          className={`${styles['engagement-comments__skeleton_title']} ${styles['engagement-comments__skeleton']}`}
        ></div>
        <span
          className={`${styles['engagement-comments__skeleton_subtitle']} ${styles['engagement-comments__skeleton']}`}
        ></span>
      </div>
      <div className={styles['engagement-comments__wrapper']}>
        {[...Array(COUNT_SKELETON)].map((_, index) => {
          return (
            <div className={styles['engagement-comments__card']} key={index}>
              <div
                className={`${styles['engagement-comments__skeleton_text']} ${styles['engagement-comments__skeleton']}`}
              ></div>
              <div
                className={`${styles['engagement-comments__skeleton_line']} ${styles['engagement-comments__skeleton']}`}
              ></div>
              <div
                className={`${styles['engagement-comments__skeleton_line']} ${styles['engagement-comments__skeleton']}`}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Skeleton;
