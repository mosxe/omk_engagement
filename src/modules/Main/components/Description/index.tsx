import Image from 'assets/images/Engagement/img_1.png';
import styles from './styles.module.scss';

const Description = () => {
  return (
    <div className={styles.description}>
      <div className={styles.description__image}>
        <img src={Image} alt='Картинка' />
      </div>
      <div className={styles.description__wrapper}>
        <h2>Вовлеченность</h2>
        <p className={styles.description__text}>
          <strong>
            Это эмоциональное, интеллектуальное и физическое состояние, которое
            мотивирует сотрудников выполнять свою работу как можно лучше
          </strong>
        </p>
        <p className={styles.description__text}>
          <strong>Вовлеченный сотрудник</strong> позитивно отзывается о
          компании, планирует работать в ней в долгосрочной перспективе и
          мотивирован на достижение целей компании, готов прикладывать
          дополнительные усилия для того, чтобы организация была успешна
        </p>
      </div>
    </div>
  );
};

export default Description;
