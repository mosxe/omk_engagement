import styles from './styles.module.scss';

const Skeleton = () => {
  return (
    <div className={styles['engagement-category__card']}>
      <div className={styles['engagement-category__card_title']}>Загрузка</div>
      <div
        className={styles['engagement-category__card_circle']}
        style={{ width: 50, height: 50 }}
      >
        Загрузка
      </div>
      <div className={styles['engagement-category__card_text']}>Загрузка</div>
    </div>
  );
};

export default Skeleton;
