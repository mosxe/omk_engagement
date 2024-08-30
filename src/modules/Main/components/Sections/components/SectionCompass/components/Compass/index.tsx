import Image from 'assets/images/Changes/img_1.png';
import styles from './styles.module.scss';

const Compass = () => {
  return (
    <section className={styles['compass']}>
      <div className={styles['compass__header']}>
        <div className={styles['compass__header_wrapper']}>
          <h2>Компас изменений</h2>
        </div>
        <div className={styles['compass__header_img']}>
          <img src={Image} alt='Картинка' />
        </div>
      </div>
      <div>Блок не заполнен</div>
    </section>
  );
};

export default Compass;
